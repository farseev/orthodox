#!/usr/bin/env python3
"""orthodox.sg multilingual build for the Readings (blog) — standard library only.

The 18 hand-made language versions of every article (blog/<lang>/<slug>.html) are kept exactly as they
are. This tool adds further languages (Traditional Chinese `zh-hant`, Hindi `hi`, and any later one listed
in GENERATED) by rendering them from the English pages, and keeps every page's hreflang cluster, language
<select>, the sitemap and llms.txt in step.

English pages (blog/<slug>.html, blog/index.html) are the template and the source text. Every translatable
piece of text (visible text runs, aria/alt/title attributes, meta description, OG/Twitter text, JSON-LD
text) is a *segment*, keyed by a hash of its English text. Translations live in i18n/<code>.json
({id: text}); i18n/source.json holds the English, i18n/pages.json the segment ids of every page.

Commands
  python3 tools/i18n.py extract                 refresh i18n/source.json + i18n/pages.json (+ app.json)
  python3 tools/i18n.py todo <code> [slug ...]  print untranslated segments as  id<TAB>English
  python3 tools/i18n.py merge <code> <file>     merge  id<TAB>translation  lines (placeholders checked)
  python3 tools/i18n.py build                   render every page that is 100% translated in a generated
                                                language; refresh hreflang/select in all pages, sitemap,
                                                llms.txt; inject finished app-page dictionaries
  python3 tools/i18n.py status                  coverage per language
  python3 tools/i18n.py reference <code> <lang>  existing <code> wording (aligned from its pages) of every
                                                segment untranslated in <lang>, as id<TAB>text (a crib)
  python3 tools/i18n.py selftest <code>         render an existing hand-made language from the English page
                                                plus a memory aligned from its own pages, and diff (QA)

Inline markup inside a segment appears as <g1>…</g1> (paired tags) and <x1/> (void tags); {d} and {n}
are a date and a number filled in by the build. Keep them all.
The in-page dictionaries of the app pages (index, calendar, fasting, liturgy, bible) are handled by
tools/i18n_app.py (segments are prefixed "a:" in the same memory files).
"""
import hashlib, html, json, os, re, sys, glob
sys.dont_write_bytecode = True
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://orthodox.sg"
BLOG = os.path.join(ROOT, "blog")
I18N = os.path.join(ROOT, "i18n")

# code (url dir + ?lang= value), html lang / hreflang / inLanguage, og:locale, <option> label, "Language"
LANGS = [
    ("en", "en", "en", "English", "Language"),
    ("ru", "ru", "ru", "Русский", "Язык"),
    ("zh", "zh-Hans", "zh_Hans", "中文", "语言"),
    ("zh-hant", "zh-Hant", "zh_Hant", "繁體中文", "語言"),
    ("ms", "ms", "ms", "Bahasa Melayu", "Bahasa"),
    ("ta", "ta", "ta", "தமிழ்", "மொழி"),
    ("hi", "hi", "hi", "हिन्दी", "भाषा"),
    ("id", "id", "id", "Bahasa Indonesia", "Bahasa"),
    ("vi", "vi", "vi", "Tiếng Việt", "Ngôn ngữ"),
    ("th", "th", "th", "ไทย", "ภาษา"),
    ("ko", "ko", "ko", "한국어", "언어"),
    ("ja", "ja", "ja", "日本語", "言語"),
    ("tl", "fil", "fil", "Filipino", "Wika"),
    ("es", "es", "es", "Español", "Idioma"),
    ("pt", "pt", "pt", "Português", "Idioma"),
    ("fr", "fr", "fr", "Français", "Langue"),
    ("de", "de", "de", "Deutsch", "Sprache"),
    ("el", "el", "el", "Ελληνικά", "Γλώσσα"),
    ("ar", "ar", "ar", "العربية", "اللغة"),
    ("ro", "ro", "ro", "Română", "Limba"),
]
L = {l[0]: dict(code=l[0], tag=l[1], og=l[2], label=l[3], word=l[4]) for l in LANGS}
ORDER = [l[0] for l in LANGS]
GENERATED = ["zh-hant", "hi"]          # rendered by this tool; every other language is hand-made
ENGLISH_NAME = {"zh-hant": "Traditional Chinese", "hi": "Hindi"}

INLINE = {"a", "abbr", "b", "br", "cite", "code", "em", "i", "mark", "q", "s", "small", "span", "strong", "sub",
          "sup", "time", "u", "wbr", "img"}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr", "param"}
SKIP = {"script", "style", "svg", "noscript", "template", "select"}
ATTRS = ("alt", "title", "aria-label", "placeholder")
META_NAMES = {"description", "twitter:title", "twitter:description", "twitter:image:alt"}
META_PROPS = {"og:title", "og:description", "og:image:alt"}
LD_TEXT_KEYS = {"name", "headline", "description", "abstract", "text", "keywords", "articleSection", "caption",
                "alternativeHeadline"}
LD_SKIP_TYPES = {"Church", "Organization", "PostalAddress", "ImageObject", "Person"}
PH_RE = re.compile(r"</?g\d+>|<x\d+/>|\{[a-z]\}")
# chrome strings with values that differ per page: (regex on English, template with {d}/{n})
TEMPLATES = [
    (re.compile(r"^Updated (\d{4}-\d{2}-\d{2}) · (\d+) min read$"), "Updated {d} · {n} min read", ("d", "n")),
    (re.compile(r"^(\d+) min read$"), "{n} min read", ("n",)),
]
NOTE_EN = ("This article was written in English and translated. If any passage is unclear, "
           "the English original is authoritative.")
NOTE_HTML = '<p class="meta">%s</p>'


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def write(p, s):
    os.makedirs(os.path.dirname(p) or ".", exist_ok=True)
    with open(p, "w", encoding="utf-8", newline="") as f:
        f.write(s)


def sid(text):
    return hashlib.sha1(text.encode("utf-8")).hexdigest()[:10]


def norm(s):
    return re.sub(r"[ \t\n\r\f\v]+", " ", s).strip(" \t\n\r\f\v")


def translatable(t):
    return bool(t) and bool(re.search(r"[^\W\d_]", t))


# ---------------------------------------------------------------- parsing
class Tok:
    __slots__ = ("kind", "tag", "attrs", "start", "end", "raw", "el")

    def __init__(self, kind, tag, attrs, start):
        self.kind, self.tag, self.attrs, self.start, self.end, self.raw, self.el = kind, tag, attrs, start, None, None, None


class El:
    __slots__ = ("tag", "attrs", "open", "close", "children", "parent")

    def __init__(self, tag, attrs, open_i, parent):
        self.tag, self.attrs, self.open, self.close, self.children, self.parent = tag, dict(attrs), open_i, None, [], parent


class Parser(HTMLParser):
    def __init__(self, doc):
        super().__init__(convert_charrefs=False)
        self.lines = [0]
        for m in re.finditer("\n", doc):
            self.lines.append(m.end())
        self.toks = []

    def off(self):
        ln, col = self.getpos()
        return self.lines[ln - 1] + col

    def add(self, kind, tag=None, attrs=()):
        self.toks.append(Tok(kind, tag, attrs, self.off()))

    def handle_starttag(self, tag, attrs): self.add("start", tag, attrs)
    def handle_startendtag(self, tag, attrs): self.add("startend", tag, attrs)
    def handle_endtag(self, tag): self.add("end", tag)
    def handle_data(self, d): self.add("data")
    def handle_entityref(self, n): self.add("data")
    def handle_charref(self, n): self.add("data")
    def handle_comment(self, d): self.add("other")
    def handle_decl(self, d): self.add("other")
    def handle_pi(self, d): self.add("other")
    def unknown_decl(self, d): self.add("other")


def parse(doc):
    p = Parser(doc)
    p.feed(doc)
    p.close()
    toks = p.toks
    for i, t in enumerate(toks):
        t.end = toks[i + 1].start if i + 1 < len(toks) else len(doc)
        t.raw = doc[t.start:t.end]
    root = El("#root", (), -1, None)
    cur = root
    for i, t in enumerate(toks):
        if t.kind in ("start", "startend"):
            el = El(t.tag, t.attrs, i, cur)
            t.el = el
            cur.children.append(("el", el))
            if t.kind == "start" and t.tag not in VOID:
                cur = el
            else:
                el.close = i
        elif t.kind == "end":
            x = cur
            while x is not root and x.tag != t.tag:
                x = x.parent
            if x is not root:
                x.close = i
                cur = x.parent
        elif t.kind == "data":
            cur.children.append(("tok", i))
    return toks, root


# ---------------------------------------------------------------- segmentation
class Seg:
    __slots__ = ("kind", "text", "id", "a", "b", "tags", "lead", "trail", "tok", "attr", "vals", "path")


def apply_template(t):
    for rx, tpl, names in TEMPLATES:
        m = rx.match(t)
        if m:
            return tpl, dict(zip(names, m.groups()))
    return t, {}


def fill(t, vals):
    for k, v in vals.items():
        t = t.replace("{%s}" % k, v)
    return t


def text_of_children(toks, children, tagmap):
    out = []

    def ser(kind, x):
        if kind == "tok":
            out.append(html.unescape(toks[x].raw))
        else:
            n = len(tagmap) + 1
            if x.close is None or x.close == x.open or x.tag in VOID:
                tagmap.append(("x", x.open, None))
                out.append("<x%d/>" % n)
            else:
                tagmap.append(("g", x.open, x.close))
                out.append("<g%d>" % n)
                for c in x.children:
                    ser(*c)
                out.append("</g%d>" % n)
    for c in children:
        ser(*c)
    return "".join(out)


def segments(doc):
    toks, root = parse(doc)
    segs = []

    def is_inline(c):
        return c[0] == "tok" or (c[1].tag in INLINE)

    def visit(el):
        if el.tag in SKIP or el.attrs.get("translate") == "no":
            return
        runs, run = [], []
        for c in el.children:
            if is_inline(c):
                run.append(c)
            else:
                if run:
                    runs.append(("run", run)); run = []
                runs.append(("blk", c))
        if run:
            runs.append(("run", run))
        for kind, r in runs:
            if kind == "blk":
                if r[0] == "el":
                    visit(r[1])
                continue
            if any(k == "tok" and toks[x].raw.strip() for k, x in r):
                make_run_seg(r)
            else:
                for k, x in r:
                    if k == "el":
                        visit(x)

    def first_tok(c):
        return c[1] if c[0] == "tok" else c[1].open

    def last_tok(c):
        return c[1] if c[0] == "tok" else (c[1].close if c[1].close is not None else c[1].open)

    def make_run_seg(r):
        while r and r[0][0] == "tok" and not toks[r[0][1]].raw.strip():
            r = r[1:]
        while r and r[-1][0] == "tok" and not toks[r[-1][1]].raw.strip():
            r = r[:-1]
        if not r:
            return
        tagmap = []
        raw_text = text_of_children(toks, r, tagmap)
        a, b = toks[first_tok(r[0])].start, toks[last_tok(r[-1])].end
        s = Seg()
        s.kind, s.a, s.b, s.tags, s.tok, s.attr, s.path = "run", a, b, tagmap, None, None, None
        s.lead = re.match(r"\s*", doc[a:b]).group(0)
        s.trail = re.search(r"\s*$", doc[a:b]).group(0)
        s.text, s.vals = apply_template(norm(raw_text))
        s.id = sid(s.text) if translatable(PH_RE.sub("", s.text)) else None
        segs.append(s)

    visit(root)
    for i, t in enumerate(toks):
        if t.kind not in ("start", "startend") or t.tag in SKIP:
            continue
        at = dict(t.attrs)
        names = [a for a in ATTRS if at.get(a)]
        if t.tag == "meta" and at.get("content") and (at.get("name") in META_NAMES or at.get("property") in META_PROPS):
            names.append("content")
        for a in names:
            s = Seg()
            s.kind, s.tok, s.attr, s.tags, s.lead, s.trail, s.a, s.b, s.path = "attr", i, a, [], "", "", None, None, None
            s.text, s.vals = apply_template(norm(at[a]))
            s.id = sid(s.text) if translatable(s.text) else None
            segs.append(s)
    for i, t in enumerate(toks):
        if t.kind == "start" and t.tag == "script" and dict(t.attrs).get("type") == "application/ld+json":
            d = json.loads(html.unescape(toks[i + 1].raw) if False else toks[i + 1].raw)
            for path, val in ld_texts(d):
                s = Seg()
                s.kind, s.tok, s.attr, s.tags, s.lead, s.trail, s.a, s.b = "ld", i + 1, None, [], "", "", None, None
                s.path = path
                s.text, s.vals = norm(val), {}
                s.id = sid(s.text) if translatable(s.text) else None
                segs.append(s)
    return toks, segs


def ld_texts(d, path=(), skip=False):
    out = []
    if isinstance(d, dict):
        skip = skip or d.get("@type") in LD_SKIP_TYPES
        for k, v in d.items():
            if isinstance(v, str):
                if not skip and k in LD_TEXT_KEYS:
                    out.append((path + (k,), v))
            else:
                out += ld_texts(v, path + (k,), skip)
    elif isinstance(d, list):
        for i, v in enumerate(d):
            out += ld_texts(v, path + (i,), skip)
    return out


# ---------------------------------------------------------------- pages and memory
def en_files():
    """English Readings pages, as file names inside blog/ (index.html first)."""
    arts = sorted(os.path.basename(p) for p in glob.glob(os.path.join(BLOG, "*.html")) if not p.endswith("/index.html"))
    return ["index.html"] + arts


def lang_file(code, f):
    return os.path.join(BLOG, f) if code == "en" else os.path.join(BLOG, code, f)


def lang_url(code, f):
    return SITE + "/blog/" + ("" if code == "en" else code + "/") + f


def exists(code, f):
    return os.path.exists(lang_file(code, f))


def load_tm(code):
    p = os.path.join(I18N, code + ".json")
    return json.loads(read(p)) if os.path.exists(p) else {}


def save_tm(code, tm):
    write(os.path.join(I18N, code + ".json"), json.dumps(dict(sorted(tm.items())), ensure_ascii=False, indent=0) + "\n")


def page_ids(doc, is_article):
    _, segs = segments(doc)
    ids = list(dict.fromkeys(s.id for s in segs if s.id))
    if is_article:
        ids.append(sid(NOTE_EN))
    return segs, ids


def cmd_extract(quiet=False):
    src, pages = {}, {}
    for f in en_files():
        doc = read(os.path.join(BLOG, f))
        segs, ids = page_ids(doc, f != "index.html")
        for s in segs:
            if s.id:
                src[s.id] = s.text
        if f != "index.html":
            src[sid(NOTE_EN)] = NOTE_EN
        pages[f] = ids
    try:
        import i18n_app
        app_src, app_pages = i18n_app.extract()
        src.update(app_src)
        pages.update(app_pages)
    except ImportError:
        pass
    write(os.path.join(I18N, "source.json"), json.dumps(dict(sorted(src.items())), ensure_ascii=False, indent=0) + "\n")
    write(os.path.join(I18N, "pages.json"), json.dumps(pages, ensure_ascii=False, indent=0) + "\n")
    if not quiet:
        words = sum(len(v.split()) for v in src.values())
        print("%d pages, %d unique segments, %d words" % (len(pages), len(src), words))
    return src, pages


def availability(code, pages, tm):
    """Readings files that can be published in a generated language."""
    if code not in GENERATED:
        return {f for f in en_files() if exists(code, f)}
    arts = {f for f in en_files() if f != "index.html" and all(i in tm for i in pages[f])}
    if arts and len(arts) == len(en_files()) - 1 and all(i in tm for i in pages["index.html"]):
        arts.add("index.html")
    return arts


# ---------------------------------------------------------------- rendering
def esc_text(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\xa0", "&nbsp;")


def rebuild_tag(tok, new_attrs):
    raw = tok.raw
    for name, val in new_attrs.items():
        pat = re.compile(r'(\s%s=")([^"]*)(")' % re.escape(name))
        raw, n = pat.subn(lambda m: m.group(1) + val + m.group(3), raw, count=1)
    return raw


ROOT_PAGES = {"index.html", "calendar.html", "fasting.html", "liturgy.html"}


def map_href(v, code, avail):
    """English blog/ href -> href inside blog/<code>/."""
    if re.match(r"^(?:[a-z]+:|//|#)", v):
        return v
    body, frag = (v.split("#", 1) + [None])[:2] if "#" in v else (v, None)
    path, _, qs = body.partition("?")
    hashpart = ("#" + frag) if frag is not None else ""
    if path.startswith("../"):
        target = path[3:]
        if target in ROOT_PAGES:
            q = [p for p in qs.split("&") if p and not p.startswith("lang=")] + ["lang=" + code]
            return "../../" + target + "?" + "&".join(q) + hashpart
        return "../" + v                                   # bible.html?lang=en, site-enhance.js, favicons …
    if "/" not in path and path.endswith(".html"):
        if path in avail:
            q = [p for p in qs.split("&") if p and not p.startswith("lang=")] + ["lang=" + code]
            return path + "?" + "&".join(q) + hashpart
        return "../" + v                                   # not (yet) in this language: English page
    return "../" + v                                       # img/…


def map_ld_url(v, code, avail):
    pre = SITE + "/blog/"
    if not v.startswith(pre):
        return v
    rest = v[len(pre):]
    f, _, frag = rest.partition("#")
    if "/" in f or not f.endswith(".html") or f not in avail:
        return v
    return lang_url(code, f) + (("#" + frag) if frag else "")


def ld_dump(d, raw):
    compact = raw.lstrip().startswith('{"@context":"')
    return json.dumps(d, ensure_ascii=False, separators=(",", ":") if compact else (", ", ": "))


def ld_set(d, path, val):
    for k in path[:-1]:
        d = d[k]
    d[path[-1]] = val


def ld_urls(d, code, tag, avail):
    if isinstance(d, dict):
        for k, v in list(d.items()):
            if isinstance(v, str):
                if k == "inLanguage":
                    d[k] = tag
                elif k in ("@id", "url", "mainEntityOfPage", "item"):
                    d[k] = map_ld_url(v, code, avail)
            else:
                ld_urls(v, code, tag, avail)
    elif isinstance(d, list):
        for v in d:
            ld_urls(v, code, tag, avail)


def word_count(doc):
    """Words in the article's paragraphs (Bible-recording links left out), whitespace-separated."""
    m = re.search(r'<article class="body">(.*?)</article>', doc, re.S)
    if not m:
        return None
    a = re.sub(r'<a class="bib".*?</a>', "", m.group(1), flags=re.S)
    return sum(len(html.unescape(re.sub(r"<[^>]+>", " ", x)).split()) for x in re.findall(r"<p[^>]*>(.*?)</p>", a, re.S))


def langpick(code, f, cluster):
    opts = []
    for c in ORDER:
        if c not in cluster:
            continue
        if c == code:
            u = f + "?lang=" + c
        elif code == "en":
            u = c + "/" + f + "?lang=" + c
        elif c == "en":
            u = "../" + f + "?lang=en"
        else:
            u = "../" + c + "/" + f + "?lang=" + c
        opts.append('<option value="%s" data-u="%s"%s>%s</option>' % (c, u, " selected" if c == code else "", L[c]["label"]))
    return ('<select class="langpick" aria-label="%s" onchange="location.href=this.options[this.selectedIndex].dataset.u">'
            % L[code]["word"]) + "".join(opts) + "</select>"


def hreflang_block(f, cluster, sep="\n"):
    lines = ['<link rel="alternate" hreflang="%s" href="%s">' % (L[c]["tag"], lang_url(c, f)) for c in ORDER if c in cluster]
    lines.append('<link rel="alternate" hreflang="x-default" href="%s">' % lang_url("en", f))
    return sep.join(lines)


HREF_BLOCK_RE = re.compile(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*">(?:\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">)*')
SELECT_RE = re.compile(r'<select class="langpick".*?</select>', re.S)


def set_cluster(doc, code, f, cluster, fresh=False):
    m = HREF_BLOCK_RE.search(doc)
    if m:
        sep = "\n" if "\n" in m.group(0) else ""
        doc = doc[:m.start()] + hreflang_block(f, cluster, sep) + doc[m.end():]
    m = SELECT_RE.search(doc)
    if m:
        old = m.group(0)
        new = langpick(code, f, cluster)
        if not fresh:
            # keep the hand-made page's own aria-label and option markup; only add/remove options
            head = re.match(r"<select[^>]*>", old).group(0)
            have = dict((v, o) for o, v in re.findall(r'(<option value="([^"]*)".*?</option>)', old))
            fresh = dict((v, o) for o, v in re.findall(r'(<option value="([^"]*)".*?</option>)', new))
            opts = [have.get(c) or fresh[c] for c in ORDER if c in cluster]
            new = head + "".join(opts) + "</select>"
        doc = doc[:m.start()] + new + doc[m.end():]
    return doc


def render(doc, f, code, tm, avail, cluster, app_live=()):
    """English page blog/<f> -> (html for blog/<code>/<f>, missing ids)."""
    toks, segs = segments(doc)
    missing = set()

    def tr(s):
        if s.id is None:
            return fill(s.text, s.vals)
        v = tm.get(s.id)
        if v is None or not check_ph(s.text, v):
            missing.add(s.id)
            v = s.text
        return fill(v, s.vals)

    newtag, attr_tr = {}, {}
    for s in segs:
        if s.kind == "attr":
            attr_tr.setdefault(s.tok, {})[s.attr] = tr(s)
    for i, t in enumerate(toks):
        if t.kind not in ("start", "startend"):
            continue
        at = dict(t.attrs)
        repl = {a: html.escape(v, quote=True) for a, v in attr_tr.get(i, {}).items()}
        for a in ("href", "src", "srcset"):
            v = at.get(a)
            if v is None or t.tag == "link" and a == "href" and at.get("rel") in ("canonical", "alternate"):
                continue
            if a == "srcset":
                nv = ", ".join(" ".join([map_href(p.split()[0], code, avail)] + p.split()[1:]) for p in v.split(","))
            else:
                nv = map_href(v, code, avail)
            if nv != v:
                repl[a] = html.escape(nv, quote=True)
        newtag[i] = rebuild_tag(t, repl) if repl else t.raw

    edits, covered = [], []
    for s in segs:
        if s.kind != "run":
            continue
        txt = tr(s)
        pieces, pos = [], 0
        for m in re.finditer(r"</?g\d+>|<x\d+/>", txt):
            pieces.append(esc_text(txt[pos:m.start()]))
            ph = m.group(0)
            n = int(re.search(r"\d+", ph).group(0)) - 1
            kind, o, c = s.tags[n]
            pieces.append(toks[c].raw if ph.startswith("</") else newtag.get(o, toks[o].raw))
            pos = m.end()
        pieces.append(esc_text(txt[pos:]))
        edits.append((s.a, s.b, s.lead + "".join(pieces) + s.trail))
        covered.append((s.a, s.b))
    for i, t in enumerate(toks):
        if t.kind in ("start", "startend") and newtag[i] != t.raw:
            if not any(a <= t.start < b for a, b in covered):
                edits.append((t.start, t.end, newtag[i]))
    ld_by_tok = {}
    for s in segs:
        if s.kind == "ld":
            ld_by_tok.setdefault(s.tok, []).append(s)
    for i, t in enumerate(toks):
        if t.kind == "start" and t.tag == "script" and dict(t.attrs).get("type") == "application/ld+json":
            raw = toks[i + 1].raw
            d = json.loads(raw)
            for s in ld_by_tok.get(i + 1, []):
                ld_set(d, s.path, tr(s))
            ld_urls(d, code, L[code]["tag"], avail)
            edits.append((toks[i + 1].start, toks[i + 1].end, ld_dump(d, raw)))
    edits.sort(key=lambda e: e[0])
    res, pos = [], 0
    for a, b, txt in edits:
        if a < pos:
            raise RuntimeError("overlapping edits in %s" % f)
        res.append(doc[pos:a]); res.append(txt); pos = b
    res.append(doc[pos:])
    out = "".join(res)
    # head
    lg = L[code]
    url = lang_url(code, f)
    out = re.sub(r'<html lang="[^"]*"(?: dir="rtl")?>', '<html lang="%s"%s>' % (lg["tag"], ' dir="rtl"' if code == "ar" else ""), out, count=1)
    out = re.sub(r'<link rel="canonical" href="[^"]*">', '<link rel="canonical" href="%s">' % url, out, count=1)
    out = re.sub(r'<meta property="og:url" content="[^"]*">', '<meta property="og:url" content="%s">' % url, out, count=1)
    out = re.sub(r'<meta property="og:locale" content="[^"]*">', '<meta property="og:locale" content="%s">' % lg["og"], out, count=1)
    out = set_cluster(out, code, f, cluster, fresh=True)
    if code in GENERATED:
        import i18n_app
        out = i18n_app.add_to_langparam(out, list(dict.fromkeys([c for c in ORDER if c in app_live] + [code])))
    # "written in English and translated" note after the date line of an article
    if f != "index.html":
        note = tm.get(sid(NOTE_EN))
        if note is None:
            missing.add(sid(NOTE_EN)); note = NOTE_EN
        out = re.sub(r'(<p class="meta">[^<]*</p>)', lambda m: m.group(1) + NOTE_HTML % esc_text(note), out, count=1)
        wc = word_count(out)
        if wc is not None:
            out = re.sub(r'("wordCount": ?)\d+', lambda m: m.group(1) + str(wc), out, count=1)
    return out, missing


# ---------------------------------------------------------------- clusters, sitemap, llms.txt
def clusters_now():
    """file -> list of languages in which it exists on disk."""
    return {f: [c for c in ORDER if exists(c, f)] for f in en_files()}


SM_URL_RE = re.compile(r"[ \t]*<url>\s*<loc>([^<]*)</loc>.*?</url>\n?", re.S)


def update_sitemap(clusters, today_new):
    p = os.path.join(ROOT, "sitemap.xml")
    sm = read(p)
    blocks = list(SM_URL_RE.finditer(sm))
    by_loc = {m.group(1): m for m in blocks}
    out, pos = [], 0
    done_new = set()
    pre = SITE + "/blog/"
    for m in blocks:
        out.append(sm[pos:m.start()]); pos = m.end()
        blk = m.group(0)
        loc = m.group(1)
        if not loc.startswith(pre):
            out.append(blk); continue
        rest = loc[len(pre):]
        parts = rest.split("/")
        code, f = ("en", parts[0]) if len(parts) == 1 else (parts[0], parts[1])
        if f not in clusters or code not in L:
            out.append(blk); continue
        if code in GENERATED and code not in clusters[f]:
            continue                                       # page withdrawn
        cl = clusters[f]
        out.append(sm_alternates(blk, f, cl))
        # after the last existing language block of this file, add missing generated-language blocks
        last = [c for c in cl if lang_url(c, f) in by_loc]
        if last and code == last[-1]:
            for c in cl:
                if c in GENERATED and lang_url(c, f) not in by_loc and (c, f) not in done_new:
                    en_blk = by_loc.get(lang_url("en", f))
                    base = en_blk.group(0) if en_blk else blk
                    nb = base.replace("<loc>%s</loc>" % lang_url("en", f), "<loc>%s</loc>" % lang_url(c, f), 1)
                    out.append(sm_alternates(nb, f, cl))
                    done_new.add((c, f))
    out.append(sm[pos:])
    new = "".join(out)
    if new != sm:
        write(p, new)
    return new != sm


def sm_alternates(blk, f, cl):
    m = re.search(r'([ \t]*)<xhtml:link rel="alternate"[^>]*/>\n(?:[ \t]*<xhtml:link rel="alternate"[^>]*/>\n)*', blk)
    if not m:
        return blk
    ind = m.group(1)
    lines = "".join('%s<xhtml:link rel="alternate" hreflang="%s" href="%s"/>\n' % (ind, L[c]["tag"], lang_url(c, f)) for c in cl)
    lines += '%s<xhtml:link rel="alternate" hreflang="x-default" href="%s"/>\n' % (ind, lang_url("en", f))
    return blk[:m.start()] + lines + blk[m.end():]


LLMS_MARK_RE = re.compile(r"\nArticles are also published in [^\n]*(?:\n[^\n#][^\n]*)*?\(/blog/[a-z-]+/\)\.\n")


def update_llms(live):
    p = os.path.join(ROOT, "llms.txt")
    s = read(p)
    s2 = LLMS_MARK_RE.sub("\n", s)
    if live:
        names = ["%s (/blog/%s/)" % (ENGLISH_NAME[c], c) for c in live]
        line = "Articles are also published in " + (" and ".join(names) if len(names) < 3 else
                                                     ", ".join(names[:-1]) + " and " + names[-1]) + ".\n"
        s2 = re.sub(r"(and other languages at /blog/<lang>/<slug>\.html, cross-linked with hreflang\.\n)",
                    lambda m: m.group(1) + line, s2, count=1)
    if s2 != s:
        write(p, s2)


# ---------------------------------------------------------------- commands
def cmd_build():
    src, pages = cmd_extract(quiet=True)
    tms = {c: load_tm(c) for c in GENERATED}
    avail = {c: availability(c, pages, tms.get(c, {})) for c in ORDER}
    files = en_files()
    clusters = {f: [c for c in ORDER if f in avail[c]] for f in files}
    try:
        import i18n_app
        app_live = i18n_app.build(tms)                     # app pages first: may extend LANGS in every page
    except ImportError:
        app_live = []
    written = 0
    for c in GENERATED:
        d = os.path.join(BLOG, c)
        # withdraw pages that are no longer complete
        if os.path.isdir(d):
            for p in glob.glob(os.path.join(d, "*.html")):
                if os.path.basename(p) not in avail[c]:
                    os.remove(p)
        for f in sorted(avail[c]):
            doc = read(os.path.join(BLOG, f))
            out, missing = render(doc, f, c, tms[c], avail[c], clusters[f], app_live)
            if missing:
                raise RuntimeError("%s/%s missing %s" % (c, f, sorted(missing)[:5]))
            p = lang_file(c, f)
            if not os.path.exists(p) or read(p) != out:
                write(p, out); written += 1
    # hreflang + select of every existing page
    touched = 0
    for f in files:
        for c in clusters[f]:
            if c in GENERATED:
                continue
            p = lang_file(c, f)
            doc = read(p)
            new = set_cluster(doc, c, f, clusters[f])
            if new != doc:
                write(p, new); touched += 1
    update_sitemap(clusters, None)
    live = [c for c in GENERATED if "index.html" in avail[c]]
    update_llms(live)
    print("rendered %d page(s); refreshed %d existing page(s); Readings live: %s; app pages live: %s" % (
        written, touched, ", ".join("%s=%d" % (c, len(avail[c])) for c in GENERATED), ", ".join(app_live) or "none"))


def cmd_todo(code, which):
    src, pages = cmd_extract(quiet=True)
    tm = load_tm(code)
    seen = set()
    sel = which or list(pages)
    for f in sel:
        if f not in pages and f + ".html" in pages:
            f = f + ".html"
        for i in pages[f]:
            if i not in tm and i not in seen:
                seen.add(i)
                print("%s\t%s" % (i, src[i].replace("\t", " ").replace("\n", " ")))


def check_ph(en, tr):
    return sorted(PH_RE.findall(en)) == sorted(PH_RE.findall(tr))


def cmd_merge(code, f):
    src = json.loads(read(os.path.join(I18N, "source.json")))
    tm = load_tm(code)
    bad, n = 0, 0
    for ln in read(f).splitlines():
        if not ln.strip() or "\t" not in ln:
            continue
        i, t = ln.split("\t", 1)
        i, t = i.strip(), t.strip()
        if i not in src:
            print("unknown id", i); bad += 1; continue
        if not t:
            print("empty", i); bad += 1; continue
        if not check_ph(src[i], t):
            print("placeholder mismatch", i, src[i][:60], "||", t[:60]); bad += 1; continue
        tm[i] = t; n += 1
    save_tm(code, tm)
    print("merged %d, rejected %d -> i18n/%s.json (%d entries)" % (n, bad, code, len(tm)))
    return bad


def cmd_status():
    src, pages = cmd_extract(quiet=True)
    for code in GENERATED:
        tm = load_tm(code)
        av = availability(code, pages, tm)
        blog_ids = set(i for f, ids in pages.items() if not f.startswith("app:") for i in ids)
        app_ids = set(i for f, ids in pages.items() if f.startswith("app:") for i in ids)
        print("%-8s readings %5d/%5d segments, %2d/%2d pages live | app pages %5d/%5d segments" % (
            code, len(blog_ids & set(tm)), len(blog_ids), len(av), len(en_files()),
            len(app_ids & set(tm)), len(app_ids)))


# ---------------------------------------------------------------- selftest: align an existing language
def align(code, quiet=False):
    """Build a memory for a hand-made language by pairing its segments with the English ones."""
    tm, bad = {}, []
    for f in en_files():
        if not exists(code, f):
            continue
        en = read(os.path.join(BLOG, f))
        tr = read(lang_file(code, f))
        if f != "index.html":
            ms = list(re.finditer(r'<p class="meta">([^<]*)</p>', tr))
            if len(ms) >= 2:
                tm[sid(NOTE_EN)] = html.unescape(ms[1].group(1))
                tr = tr[:ms[1].start()] + tr[ms[1].end():]
        _, se = segments(en)
        _, st = segments(tr)
        for kind in ("run", "attr", "ld"):
            a = [s for s in se if s.kind == kind]
            b = [s for s in st if s.kind == kind]
            if kind == "ld":
                bm = {tuple(s.path): s for s in b}
                pairs = [(s, bm.get(tuple(s.path))) for s in a]
            else:
                if len(a) != len(b):
                    bad.append("%s %s: %d vs %d" % (f, kind, len(a), len(b)))
                    continue
                pairs = list(zip(a, b))
            for x, y in pairs:
                if x.id is None or y is None:
                    continue
                t = y.text
                for k, v in x.vals.items():
                    t = t.replace(v, "{%s}" % k, 1)
                if not check_ph(x.text, t):
                    bad.append("%s placeholder %s" % (f, x.id))
                    continue
                if x.id in tm and tm[x.id] != t and not quiet:
                    pass
                tm.setdefault(x.id, t)
    return tm, bad


def skeleton(doc):
    """Markup without the translated text: tags, link targets and JSON-LD structure only."""
    def ld(m):
        d = json.loads(m.group(2))

        def blank(x, skip=False):
            if isinstance(x, dict):
                skip = skip or x.get("@type") in LD_SKIP_TYPES
                return {k: ("~" if (k in LD_TEXT_KEYS and not skip) or k == "wordCount" else blank(v, skip)) for k, v in x.items()}
            if isinstance(x, list):
                return [blank(v, skip) for v in x]
            return x
        return m.group(1) + json.dumps(blank(d), ensure_ascii=False, sort_keys=True) + "</script>"
    doc = re.sub(r'(<script type="application/ld\+json">)(.*?)</script>', ld, doc, flags=re.S)
    doc = re.sub(r'(<script\b[^>]*>.*?</script>)|>[^<]*<', lambda m: m.group(1) or "><", doc, flags=re.S)
    doc = re.sub(r'\s(aria-label|alt|title|content)="[^"]*"', r' \1=""', doc)
    doc = re.sub(r'(<p class="meta"></p>)<p class="meta"></p>', r'\1', doc)
    return html.unescape(doc)


def cmd_reference(code, todo_lang):
    """Write the existing <code> wording of every segment still untranslated in todo_lang (id<TAB>text)."""
    src, pages = cmd_extract(quiet=True)
    ref, _ = align(code)
    import i18n_app
    ref.update(i18n_app.reference(code))
    tm = load_tm(todo_lang)
    n = 0
    for i in src:
        if i not in tm and i in ref:
            print("%s\t%s" % (i, ref[i].replace("\t", " ").replace("\n", " "))); n += 1
    sys.stderr.write("%d of %d segments have a %s reference\n" % (n, len(src), code))


def cmd_selftest(code):
    tm, bad = align(code)
    for b in bad:
        print("ALIGN", b)
    src, pages = cmd_extract(quiet=True)
    avail = availability(code, pages, tm)
    cl = clusters_now()
    diffs = 0
    for f in en_files():
        if not exists(code, f):
            continue
        out, missing = render(read(os.path.join(BLOG, f)), f, code, tm, avail, cl[f])
        want = read(lang_file(code, f))
        a, b = skeleton(out), skeleton(want)
        if a != b:
            diffs += 1
            if diffs <= 99:
                import difflib
                al = re.sub(r">", ">\n", a).splitlines()
                bl = re.sub(r">", ">\n", b).splitlines()
                for ln in list(difflib.unified_diff(bl, al, "existing", "rendered", n=0, lineterm=""))[:24]:
                    print("   ", ln[:220])
    print("%s: %d pages, %d differ, %d alignment problems" % (code, len(avail), diffs, len(bad)))


if __name__ == "__main__":
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    a = sys.argv[1:]
    if not a:
        print(__doc__); sys.exit(1)
    if a[0] == "extract":
        cmd_extract()
    elif a[0] == "todo":
        cmd_todo(a[1], a[2:])
    elif a[0] == "merge":
        sys.exit(1 if cmd_merge(a[1], a[2]) else 0)
    elif a[0] == "build":
        cmd_build()
    elif a[0] == "status":
        cmd_status()
    elif a[0] == "reference":
        cmd_reference(a[1], a[2])
    elif a[0] == "selftest":
        cmd_selftest(a[1])
    else:
        print(__doc__); sys.exit(1)
