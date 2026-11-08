#!/usr/bin/env python3
"""In-page language dictionaries of the app pages (index, calendar, fasting, liturgy, bible) — stdlib only.

The app pages switch language in the browser: their text lives in JavaScript object literals keyed by
language code, e.g.  NAV_T = {"en": {"navHome": "Home", …}, "ru": {…}, …}  or  {en:"Deacon", ru:"Диакон", …}.
This module finds every such object (keys include "en" and at least three other site languages), reads the
English value, and turns each English string in it into a segment with id "a:" + hash (inline HTML as
<g1>…</g1>/<x1/> placeholders). Strings that are the same in (almost) every existing language — names,
numbers, codes — are copied, not translated; locale tags ("en-GB") get the new language's own tag.

A language is added to an app page only when every segment of that page is translated: the build then
inserts  "zh-hant": <translated copy of the English value>  into every dictionary, adds the language to the
page's <select id="lang"> and LANGS table, and (once all five app pages have it) adds it to the shared
?lang= handler (LANGS) of every page so that links keep the language.

Not covered (reported by `python3 tools/i18n_app.py report`): dictionary values that are code rather than
data (e.g. CH = {en: n => "Chapter " + n, …}), the per-day calendar texts in calendar-data/*.js (not part
of this extraction) and the prayer texts in index.html, which are kept to the languages they exist in.
"""
import hashlib, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP_PAGES = ["index.html", "calendar.html", "fasting.html", "liturgy.html", "bible.html"]
EXISTING = ["en", "ru", "zh", "ms", "ta", "id", "vi", "th", "ko", "ja", "tl", "es", "pt", "fr", "de", "el", "ar", "ro"]
NEW = ["zh-hant", "hi"]
OPTION = {"zh-hant": "繁體中文", "hi": "हिन्दी"}
LOCALE = {"zh-hant": "zh-TW", "hi": "hi-IN"}
AFTER = {"zh-hant": "zh", "hi": "ta"}          # position in lists and <select>
PH_RE = re.compile(r"</?g\d+>|<x\d+/>|\{[a-z]\}")
# language-keyed objects that describe content languages (prayer tabs etc.), not the interface language
NOT_UI = {"LANG_LABEL", "TABLABEL", "TABTITLE", "map", "LEAD", "TABS"}
LOCALE_RE = re.compile(r"^[a-z]{2,3}(?:-[A-Za-z]{2,4}){0,2}$")


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def write(p, s):
    with open(p, "w", encoding="utf-8", newline="") as f:
        f.write(s)


def sid(text):
    return "a:" + hashlib.sha1(text.encode("utf-8")).hexdigest()[:10]


# ---------------------------------------------------------------- a small JavaScript tokenizer
PUNCT_BEFORE_REGEX = set("(,=:[!&|?{};+-*%<>~^")
KEYWORDS_BEFORE_REGEX = {"return", "typeof", "case", "do", "else", "in", "of", "new", "delete", "void", "throw"}


class T:
    __slots__ = ("k", "v", "a", "b")

    def __init__(self, k, v, a, b):
        self.k, self.v, self.a, self.b = k, v, a, b

    def __repr__(self):
        return "%s:%r" % (self.k, self.v)


def tokenize(src):
    toks, i, n = [], 0, len(src)
    while i < n:
        c = src[i]
        if c in " \t\r\n":
            i += 1; continue
        if src.startswith("//", i):
            j = src.find("\n", i); i = n if j < 0 else j; continue
        if src.startswith("/*", i):
            j = src.find("*/", i + 2); i = n if j < 0 else j + 2; continue
        if c in "\"'`":
            j = i + 1
            while j < n and src[j] != c:
                if src[j] == "\\":
                    j += 1
                elif c == "`" and src.startswith("${", j):
                    depth, j = 1, j + 2
                    while j < n and depth:
                        if src[j] == "{": depth += 1
                        elif src[j] == "}": depth -= 1
                        j += 1
                    continue
                j += 1
            toks.append(T("tpl" if c == "`" else "str", src[i:j + 1], i, j + 1)); i = j + 1; continue
        if c == "/":
            prev = toks[-1] if toks else None
            if prev is None or (prev.k == "p" and prev.v in PUNCT_BEFORE_REGEX) or (prev.k == "id" and prev.v in KEYWORDS_BEFORE_REGEX):
                j, cls = i + 1, False
                while j < n:
                    if src[j] == "\\": j += 2; continue
                    if src[j] == "[": cls = True
                    elif src[j] == "]": cls = False
                    elif src[j] == "/" and not cls: break
                    elif src[j] == "\n": break
                    j += 1
                j += 1
                while j < n and (src[j].isalpha()):
                    j += 1
                toks.append(T("re", src[i:j], i, j)); i = j; continue
        m = re.compile(r"[A-Za-z_$][\w$]*|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?|\.\d+|=>|\.\.\.|[^\s]").match(src, i)
        v = m.group(0)
        k = "id" if (v[0].isalpha() or v[0] in "_$") else ("num" if v[0].isdigit() or (v[0] == "." and len(v) > 1) else "p")
        toks.append(T(k, v, i, m.end())); i = m.end()
    return toks


def match_brackets(toks):
    pair, stack = {}, []
    for i, t in enumerate(toks):
        if t.k == "p" and t.v in "{[(":
            stack.append(i)
        elif t.k == "p" and t.v in "}])":
            if stack:
                pair[stack.pop()] = i
    return pair


JS_ESC = {"n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}


def str_value(tok):
    """JS string token -> Python string (None for template literals with ${})."""
    raw = tok.v
    if tok.k == "tpl" and "${" in raw:
        return None
    body, out, i = raw[1:-1], [], 0
    while i < len(body):
        c = body[i]
        if c != "\\":
            out.append(c); i += 1; continue
        n = body[i + 1] if i + 1 < len(body) else ""
        if n == "u" and body[i + 2:i + 3] == "{":
            j = body.index("}", i); out.append(chr(int(body[i + 3:j], 16))); i = j + 1
        elif n == "u":
            out.append(chr(int(body[i + 2:i + 6], 16))); i += 6
        elif n == "x":
            out.append(chr(int(body[i + 2:i + 4], 16))); i += 4
        elif n == "\n":
            i += 2
        else:
            out.append(JS_ESC.get(n, n)); i += 2
    return "".join(out)


def js_string(s):
    out = json.dumps(s, ensure_ascii=False)
    return out.replace("</", "<\\/").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")


# ---------------------------------------------------------------- literal reading
class Lit:
    """A parsed literal: kind obj/arr/str/num/kw; for obj: items [(key, Lit, key_tok_index)]."""
    __slots__ = ("kind", "a", "b", "items", "val")

    def __init__(self, kind, a, b):
        self.kind, self.a, self.b, self.items, self.val = kind, a, b, None, None


def parse_literal(toks, pair, i, end):
    """Parse toks[i:end) as one literal; return Lit or None."""
    if i >= end:
        return None
    t = toks[i]
    if t.k in ("str", "tpl"):
        if end != i + 1:
            return None
        v = str_value(t)
        if v is None:
            return None
        L = Lit("str", i, i + 1); L.val = v; return L
    if t.k == "num" or (t.k == "p" and t.v == "-" and end == i + 2 and toks[i + 1].k == "num"):
        if end != i + (1 if t.k == "num" else 2):
            return None
        return Lit("num", i, end)
    if t.k == "id" and end - i >= 3 and toks[i + 1].v == "=>":
        # n => "Chapter " + n   (a label with a number)
        parts, ok = toks[i + 2:end], True
        tpl = []
        for n, x in enumerate(parts):
            if n % 2 == 1:
                ok = ok and x.v == "+"
            elif x.k == "str":
                tpl.append(str_value(x))
            elif x.k == "id" and x.v == t.v:
                tpl.append("{n}")
            else:
                ok = False
        if ok and len(parts) % 2 == 1 and "{n}" in tpl:
            L = Lit("fn", i, end); L.val = "".join(tpl); L.items = t.v; return L
        return None
    if t.k == "id" and t.v in ("true", "false", "null") and end == i + 1:
        return Lit("kw", i, end)
    if t.k == "p" and t.v in "{[" and pair.get(i) == end - 1:
        close = end - 1
        items, j = [], i + 1
        while j < close:
            if t.v == "{":
                kt = toks[j]
                if kt.k in ("id", "num"):
                    key = kt.v
                elif kt.k == "str":
                    key = str_value(kt)
                else:
                    return None
                if j + 1 >= close or toks[j + 1].v != ":":
                    return None
                vs = j + 2
            else:
                key, vs = None, j
            ve = value_end(toks, pair, vs, close)
            v = parse_literal(toks, pair, vs, ve)
            if v is None:
                return None
            items.append((key, v, j))
            j = ve + 1 if ve < close and toks[ve].v == "," else ve
        L = Lit("obj" if t.v == "{" else "arr", i, end); L.items = items; return L
    return None


def value_end(toks, pair, i, close):
    j = i
    while j < close:
        t = toks[j]
        if t.k == "p" and t.v in "{[(":
            j = pair.get(j, close) + 1; continue
        if t.k == "p" and t.v == ",":
            return j
        j += 1
    return close


def top_keys(toks, pair, oi):
    """Keys at the top level of the object opening at toks[oi]: [(key, key_index, value_start, value_end)]."""
    close = pair[oi]
    out, j = [], oi + 1
    while j < close:
        kt = toks[j]
        if j + 1 < close and toks[j + 1].v == ":" and kt.k in ("id", "str", "num"):
            key = str_value(kt) if kt.k == "str" else kt.v
            ve = value_end(toks, pair, j + 2, close)
            out.append((key, j, j + 2, ve))
            j = ve + 1
        else:
            return None                                     # not a plain object literal (block, spread, …)
    return out


# ---------------------------------------------------------------- HTML inside strings
TAG_RE = re.compile(r"<(/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(/?)>")


def to_ph(s):
    """'Read <a href=x>this</a><br>' -> ('Read <g1>this</g1><x2/>', [raw tags by number])."""
    tags, out, pos, stack = [], [], 0, []
    ms = list(TAG_RE.finditer(s))
    closers = {}
    # pair opening/closing tags
    for idx, m in enumerate(ms):
        if m.group(1):
            for k in range(len(stack) - 1, -1, -1):
                if ms[stack[k]].group(2).lower() == m.group(2).lower():
                    closers[stack[k]] = idx
                    del stack[k:]
                    break
        elif not m.group(3) and m.group(2).lower() not in ("br", "img", "hr", "wbr", "input"):
            stack.append(idx)
    num = {}
    for idx, m in enumerate(ms):
        out.append(s[pos:m.start()]); pos = m.end()
        if m.group(1):
            opener = [o for o, c in closers.items() if c == idx]
            if opener:
                out.append("</g%d>" % num[opener[0]])
            else:
                tags.append(m.group(0)); out.append("<x%d/>" % len(tags))
        elif idx in closers:
            tags.append((m.group(0), ms[closers[idx]].group(0))); num[idx] = len(tags); out.append("<g%d>" % len(tags))
        else:
            tags.append(m.group(0)); out.append("<x%d/>" % len(tags))
    out.append(s[pos:])
    return "".join(out), tags


def from_ph(t, tags):
    def rep(m):
        n = int(re.search(r"\d+", m.group(0)).group(0)) - 1
        tg = tags[n]
        if m.group(0).startswith("</"):
            return tg[1]
        return tg[0] if isinstance(tg, tuple) else tg
    return re.sub(r"</?g\d+>|<x\d+/>", rep, t)


def translatable(s):
    return bool(re.search(r"[^\W\d_]", re.sub(r"<[^>]+>|&[a-z]+;|https?://\S+", "", s)))


# ---------------------------------------------------------------- dictionaries of one page
class Dict:
    __slots__ = ("oi", "close", "keys", "en", "others", "has")


def scripts(doc):
    for m in re.finditer(r"<script\b([^>]*)>(.*?)</script>", doc, re.S):
        if "src=" in m.group(1) or "ld+json" in m.group(1) or 'id="langparam"' in m.group(1):
            continue
        yield m.start(2), m.group(2)


def find_dicts(doc):
    """[(script_offset, toks, Dict)] for every language-keyed object literal."""
    found, problems = [], []
    for off, src in scripts(doc):
        toks = tokenize(src)
        pair = match_brackets(toks)
        for oi, t in enumerate(toks):
            if not (t.k == "p" and t.v == "{" and oi in pair):
                continue
            keys = top_keys(toks, pair, oi)
            if not keys:
                continue
            names = [k[0] for k in keys]
            if "en" not in names or sum(1 for k in names if k in EXISTING and k != "en") < 3:
                continue
            if oi >= 2 and toks[oi - 1].v == "=" and toks[oi - 2].v in NOT_UI:
                continue
            d = Dict()
            d.oi, d.close, d.keys = oi, pair[oi], keys
            d.has = set(names)
            en = [k for k in keys if k[0] == "en"][0]
            d.en = parse_literal(toks, pair, en[2], en[3])
            d.others = {}
            for k in keys:
                if k[0] in EXISTING and k[0] != "en":
                    d.others[k[0]] = parse_literal(toks, pair, k[2], k[3])
            if d.en is None:
                problems.append((off + toks[en[2]].a, src[toks[en[2]].a:toks[en[2]].a + 80]))
            found.append((off, src, toks, d))
    return found, problems


def leaves(lit, path=()):
    if lit is None:
        return
    if lit.kind in ("str", "fn"):
        yield path, lit
    elif lit.kind in ("obj", "arr"):
        for n, (k, v, _) in enumerate(lit.items):
            yield from leaves(v, path + ((k if lit.kind == "obj" else n),))


def at(lit, path):
    for p in path:
        if lit is None or lit.kind not in ("obj", "arr"):
            return None
        if lit.kind == "obj":
            lit = next((v for k, v, _ in lit.items if k == p), None)
        else:
            lit = lit.items[p][1] if p < len(lit.items) else None
    return lit


def classify(d, path, s):
    """'locale' | 'fixed' | 'text' for an English leaf string."""
    if LOCALE_RE.match(s) and s.split("-")[0] == "en":
        return "locale"
    if path and path[-1] == "_name":                        # the language's own name
        return "langname"
    if not translatable(s):
        return "fixed"
    same = tot = 0
    for c, lit in d.others.items():
        o = at(lit, path)
        if o is not None and o.kind in ("str", "fn"):
            tot += 1
            same += (o.val == s)
    if tot >= 4 and same >= tot - 1:
        return "fixed"
    return "text"


def page_segments(doc):
    """[(id, english_text)] for one app page, plus problems."""
    found, problems = find_dicts(doc)
    segs = []
    for off, src, toks, d in found:
        for path, lit in leaves(d.en):
            kind = classify(d, path, lit.val)
            if kind == "text":
                t, _ = to_ph(lit.val)
                segs.append((sid(t), t))
    return segs, problems, found


def extract():
    src, pages = {}, {}
    for p in APP_PAGES:
        doc = read(os.path.join(ROOT, p))
        segs, _, _ = page_segments(doc)
        for i, t in segs:
            src[i] = t
        pages["app:" + p] = list(dict.fromkeys(i for i, _ in segs))
    return src, pages


# ---------------------------------------------------------------- rendering a language into a page
def render_value(src, toks, d, code, tm, missing):
    """Source text of the English value with every text string translated."""
    lit = d.en
    a, b = toks[lit.a].a, toks[lit.b - 1].b
    reps = []
    for path, leaf in leaves(lit):
        kind = classify(d, path, leaf.val)
        if kind == "fixed":
            continue
        if kind == "locale":
            new = LOCALE[code]
        elif kind == "langname":
            new = OPTION[code]
        else:
            t, tags = to_ph(leaf.val)
            tr = tm.get(sid(t))
            if tr is None:
                missing.add(sid(t)); tr = t
            new = from_ph(tr, tags)
        if leaf.kind == "fn":
            pieces = new.split("{n}")
            js = " + ".join([js_string(x) if k % 2 == 0 else leaf.items for k, x in
                             enumerate(sum([[pc, None] for pc in pieces], [])[:-1]) if x != ""])
            new_src = leaf.items + " => " + js
        else:
            new_src = js_string(new)
        reps.append((toks[leaf.a].a, toks[leaf.b - 1].b, new_src))
    out, pos = [], a
    for x, y, s in sorted(reps):
        out.append(src[pos:x]); out.append(s); pos = y
    out.append(src[pos:b])
    return "".join(out)


def key_text(code):
    return '"%s"' % code


def render_page(doc, code, tm):
    """Insert language `code` into every dictionary of the page; return (doc, missing ids)."""
    found, _ = find_dicts(doc)
    missing = set()
    edits = []
    for off, src, toks, d in found:
        if d.en is None:
            continue
        val = render_value(src, toks, d, code, tm, missing)
        if code in d.has:                                   # already there (an earlier build): refresh it
            k = [k for k in d.keys if k[0] == code][0]
            edits.append((off + toks[k[2]].a, off + toks[k[3] - 1].b, val))
            continue
        # insert after the entry of the language it follows (or after "en"), keeping the source's style
        after = AFTER.get(code)
        ent = [k for k in d.keys if k[0] == after] or [k for k in d.keys if k[0] == "en"]
        key, ki, vs, ve = ent[0]
        pos = toks[ve - 1].b
        quoted = toks[ki].k == "str"
        k = key_text(code) if quoted or "-" in code else code
        sep = ", " if src[toks[ve - 1].b:toks[ve].a if ve < len(toks) else toks[ve - 1].b].startswith(", ") else ","
        edits.append((off + pos, off + pos, sep.rstrip() + (" " if sep == ", " else "") + "%s%s%s" % (k, ": " if quoted and '": ' in src[toks[ki].a:toks[ki].b + 2] else ":", val)))
    for a, b, s in sorted(edits, reverse=True):
        doc = doc[:a] + s + doc[b:]
    return doc, missing


def add_to_select_and_langs(doc, code):
    # <select class="langsel" id="lang"> option
    m = re.search(r'(<select class="[^"]*" id="lang"[^>]*>)(.*?)(</select>)', doc, re.S)
    if m and 'value="%s"' % code not in m.group(2):
        body = m.group(2)
        prev = re.search(r'([ \t]*)<option value="%s">[^<]*</option>\n?' % AFTER[code], body)
        opt = '<option value="%s">%s</option>' % (code, OPTION[code])
        if prev:
            ins = prev.end()
            body = body[:ins] + prev.group(1) + opt + ("\n" if prev.group(0).endswith("\n") else "") + body[ins:]
        else:
            body = body + opt
        doc = doc[:m.start(2)] + body + doc[m.end(2):]
    return doc


def add_to_langparam(doc, codes):
    def fix(m):
        s = m.group(0)
        for c in codes:
            if ('"%s":1' % c) not in s and ("%s:1" % c) not in s.replace('"', ''):
                s = s.replace("};", ',"%s":1};' % c, 1)
        return s
    doc = re.sub(r"var LANGS=\{[^}]*\};", fix, doc)
    return doc.replace(r"var bm=path.match(/\/blog\/([a-z]{2})(?:\/|$)/);",
                       r"var bm=path.match(/\/blog\/([a-z]{2}(?:-[a-z]{4})?)(?:\/|$)/);")


def build(tms):
    """Called by tools/i18n.py build. Adds every fully translated language to the app pages."""
    live = []
    for code in NEW:
        tm = tms.get(code) or {}
        docs, ok = {}, True
        for p in APP_PAGES:
            doc = read(os.path.join(ROOT, p))
            new, missing = render_page(doc, code, tm)
            if missing:
                ok = False
                break
            new = add_to_select_and_langs(new, code)
            docs[p] = new if new != doc else None
        if not ok:
            continue
        for p, doc in docs.items():
            if doc is not None:
                write(os.path.join(ROOT, p), doc)
        live.append(code)
    if live:
        import glob
        files = [os.path.join(ROOT, p) for p in APP_PAGES] + glob.glob(os.path.join(ROOT, "blog", "**", "*.html"), recursive=True)
        for f in files:
            s = read(f)
            n = add_to_langparam(s, live)
            if n != s:
                write(f, n)
    return live


def reference(code):
    """{id: existing translation} from the dictionaries of an existing language (for translators' reference)."""
    out = {}
    for p in APP_PAGES:
        found, _ = find_dicts(read(os.path.join(ROOT, p)))
        for off, src, toks, d in found:
            other = d.others.get(code)
            for path, lit in leaves(d.en):
                if classify(d, path, lit.val) != "text":
                    continue
                o = at(other, path)
                if o is None or o.kind != lit.kind:
                    continue
                t, _ = to_ph(lit.val)
                ot, _ = to_ph(o.val)
                if sorted(PH_RE.findall(t)) == sorted(PH_RE.findall(ot)):
                    out.setdefault(sid(t), ot)
    return out


def report():
    tot = 0
    for p in APP_PAGES:
        doc = read(os.path.join(ROOT, p))
        segs, problems, found = page_segments(doc)
        fixed = sum(1 for _, _, _, d in found for path, lit in leaves(d.en) if classify(d, path, lit.val) != "text")
        u = len(set(i for i, _ in segs))
        w = sum(len(t.split()) for i, t in dict(segs).items())
        tot += u
        print("%-14s %3d dictionaries, %5d text strings (%5d unique, %6d words), %4d copied; %d value(s) not data:" % (
            p, len(found), len(segs), u, w, fixed, len(problems)))
        for off, txt in problems:
            print("     ", txt.replace("\n", " ")[:90])


if __name__ == "__main__":
    if sys.argv[1:2] == ["report"]:
        report()
    else:
        print(__doc__)
