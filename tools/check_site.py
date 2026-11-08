#!/usr/bin/env python3
"""orthodox.sg site checker (stdlib only):  python3 tools/check_site.py
Checks every *.html page at the root and under blog/:
  - exactly one <h1>
  - every JSON-LD block parses
  - Readings pages: canonical is absolute and self-referencing; every hreflang target exists; the cluster
    includes self and x-default and is identical on every page it lists; <html lang> matches the page's own
    hreflang entry (dir="rtl" on Arabic); the language <select> offers exactly the cluster's languages
  - every internal href/src resolves to a file (files that are tracked in git but not checked out in a sparse
    clone count as present) and #anchors to an id on the target page
  - sitemap.xml parses and every <loc> / xhtml:link exists
Exit code 1 on any error.
"""
import html, json, os, re, subprocess, sys, glob
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit, unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://orthodox.sg"
errors = []
try:
    TRACKED = set(subprocess.run(["git", "-c", "gc.auto=0", "ls-files"], cwd=ROOT, capture_output=True, text=True).stdout.split("\n"))
except OSError:
    TRACKED = set()


def err(page, msg):
    errors.append("%s: %s" % (os.path.relpath(page, ROOT), msg))


def present(f):
    return os.path.exists(f) or os.path.relpath(f, ROOT).replace(os.sep, "/") in TRACKED


def url_to_file(url):
    p = urlsplit(url)
    if p.netloc and p.netloc != "orthodox.sg":
        return None
    path = unquote(p.path)
    f = os.path.join(ROOT, path.lstrip("/"))
    if path.endswith("/") or path == "":
        f = os.path.join(f, "index.html")
    return f


def file_to_url(f):
    return SITE + "/" + os.path.relpath(f, ROOT).replace(os.sep, "/")


ids_cache = {}


def ids_of(f):
    if f not in ids_cache:
        try:
            ids_cache[f] = set(re.findall(r'\sid="([^"]+)"', open(f, encoding="utf-8").read()))
        except OSError:
            ids_cache[f] = None
    return ids_cache[f]


def main():
    pages = sorted(glob.glob(os.path.join(ROOT, "*.html")) + glob.glob(os.path.join(ROOT, "blog", "**", "*.html"), recursive=True))
    clusters = {}
    for f in pages:
        h = open(f, encoding="utf-8").read()
        blog = "/blog/" in f.replace(os.sep, "/")
        n = len(re.findall(r"<h1[\s>]", h))
        if n != 1 and (blog or n > 1):          # calendar/fasting/liturgy build their heading in script
            err(f, "%d <h1> elements" % n)
        for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
            try:
                json.loads(m.group(1))
            except ValueError as e:
                err(f, "JSON-LD does not parse: %s" % e)
        if 'src="../site-enhance.js"' not in h and 'src="../../site-enhance.js"' not in h and 'src="site-enhance.js"' not in h:
            err(f, "site-enhance.js missing")
        if "G-VC6N5GMJK4" not in h:
            err(f, "GA4 tag missing")
        if blog:
            lang = re.search(r'<html lang="([^"]+)"', h)
            lang = lang.group(1) if lang else None
            if lang == "ar" and 'dir="rtl"' not in h[:300]:
                err(f, 'Arabic page without dir="rtl"')
            c = re.search(r'<link rel="canonical" href="([^"]+)"', h)
            if not c:
                err(f, "no canonical")
            elif c.group(1) != file_to_url(f):
                err(f, "canonical %s is not self" % c.group(1))
            alts = re.findall(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">', h)
            codes = dict(alts)
            if "x-default" not in codes:
                err(f, "no x-default hreflang")
            if file_to_url(f) not in codes.values():
                err(f, "hreflang cluster does not include self")
            elif lang and codes.get(lang) != file_to_url(f):
                err(f, "html lang %s does not match own hreflang entry" % lang)
            for code, u in alts:
                t = url_to_file(u)
                if not t or not os.path.exists(t):
                    err(f, "hreflang %s -> missing %s" % (code, u))
            clusters[file_to_url(f)] = tuple(sorted(alts))
            sel = re.search(r'<select class="langpick".*?</select>', h, re.S)
            if sel:
                opts = re.findall(r'<option value="([^"]*)" data-u="([^"]*)"', sel.group(0))
                if len(opts) != len(alts) - 1:
                    err(f, "language select has %d options, hreflang cluster %d languages" % (len(opts), len(alts) - 1))
                for v, u in opts:
                    t = os.path.normpath(os.path.join(os.path.dirname(f), u.split("?")[0]))
                    if not os.path.exists(t):
                        err(f, "language option %s -> missing %s" % (v, u))
        for attr, u in re.findall(r'\s(href|src)="([^"]+)"', re.sub(r"<script\b.*?</script>", "", h, flags=re.S)):
            u = html.unescape(u)
            if re.match(r"^(https?:|mailto:|tel:|data:|//|javascript:|sms:)", u):
                continue
            path, _, frag = u.partition("#")
            path = path.split("?")[0]
            if path == "":
                tgt = f
            elif path.startswith("/"):
                tgt = os.path.join(ROOT, unquote(path).lstrip("/"))
            else:
                tgt = os.path.normpath(os.path.join(os.path.dirname(f), unquote(path)))
                if path.endswith("/") or os.path.isdir(tgt):
                    tgt = os.path.join(tgt, "index.html")
            if not present(tgt):
                err(f, "broken link %s" % u)
            elif frag and tgt.endswith(".html") and tgt != f and ids_of(tgt) is not None and frag not in ids_of(tgt) \
                    and not re.match(r"^(?:nt|ot)\d\d/", frag):
                err(f, "missing anchor #%s in %s" % (frag, os.path.relpath(tgt, ROOT)))
    for url, cl in clusters.items():
        for code, u in cl:
            if code == "x-default":
                continue
            other = clusters.get(u)
            if other is not None and other != cl:
                err(url_to_file(url), "hreflang cluster differs from %s" % u)
                break
    sm = os.path.join(ROOT, "sitemap.xml")
    try:
        t = ET.parse(sm)
        for loc in t.getroot().iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
            tf = url_to_file(loc.text)
            if not tf or not present(tf):
                err(sm, "loc missing on disk: %s" % loc.text)
        for ln in t.getroot().iter("{http://www.w3.org/1999/xhtml}link"):
            tf = url_to_file(ln.get("href"))
            if not tf or not present(tf):
                err(sm, "alternate missing on disk: %s" % ln.get("href"))
    except ET.ParseError as e:
        err(sm, "XML does not parse: %s" % e)
    for e in errors:
        print("ERROR", e)
    print("%d pages checked, %d errors" % (len(pages), len(errors)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
