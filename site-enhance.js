/* orthodox.sg — small enhancements, loaded on a few pages.
   1) GA4 events for the actions that matter (donate, WhatsApp, schedule, language).
      Mark donate_click, donate_tier_select, whatsapp_click and schedule_view as "key events" in GA4 (Admin > Events).
   2) A dismissible "read in your language" bar for visitors whose browser language is not English.
   Nothing here sets cookies. The dismissal is kept for the browser session only. */
(function () {
  'use strict';
  function ev(n, p) { try { if (window.gtag) { gtag('event', n, p || {}); } } catch (e) {} }

  /* ---------- 1. key events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var a = t.closest('a,button'); if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/#donate/.test(h) || a.classList.contains('navgive')) {
      ev('donate_click', { link_location: a.classList.contains('navgive') ? 'menu' : 'page' }); return;
    }
    if (a.classList.contains('tier')) {
      ev('donate_tier_select', { amount: a.getAttribute('data-amt') || 'other', purpose: a.getAttribute('data-ref') || 'other' }); return;
    }
    if (a.id === 'qrSave') {
      ev('donate_qr_save', { amount: String(a.getAttribute('download') || '').replace(/\D+/g, '') }); return;
    }
    if (a.closest('#donate')) {
      ev('donate_interact', { element: String(a.id || a.className || a.tagName).slice(0, 40) }); return;
    }
    if (/wa\.me|whatsapp\.com/.test(h)) { ev('whatsapp_click'); return; }
    if (/facebook\.com|instagram\.com|t\.me\/|youtube/.test(h)) {
      ev('social_click', { destination: h.replace(/^https?:\/\//, '').split('/')[0] }); return;
    }
    if (/google\.com\/maps/.test(h)) { ev('map_click'); return; }
    if (/calendar\.google\.com/.test(h)) { ev('calendar_subscribe_click'); return; }
  }, true);

  function whenReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn();
  }

  whenReady(function () {
    var s = document.getElementById('schedule');
    if (s && 'IntersectionObserver' in window) {
      var o = new IntersectionObserver(function (es) {
        es.forEach(function (x) { if (x.isIntersecting) { ev('schedule_view'); o.disconnect(); } });
      }, { threshold: 0.4 });
      o.observe(s);
    }
    var l = document.getElementById('lang');
    if (l) l.addEventListener('change', function () { ev('language_change', { language: l.value }); });

    /* ---------- 2. read-in-your-language bar ---------- */
    try { if (sessionStorage.getItem('langBarOff')) return; } catch (e) {}
    if (/[?&]lang=/.test(location.search)) return;
    var pref = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    var code = pref.toLowerCase().split('-')[0];
    if (code === 'fil') code = 'tl';
    if (code === 'nb' || code === 'nn') return;
    var MSG = {
      ru: ['Читать на русском?', 'Русский'], zh: ['阅读中文版本？', '中文'], ms: ['Baca dalam Bahasa Melayu?', 'Bahasa Melayu'],
      ta: ['தமிழில் படிக்கவும்?', 'தமிழ்'], id: ['Baca dalam Bahasa Indonesia?', 'Bahasa Indonesia'],
      vi: ['Đọc bằng tiếng Việt?', 'Tiếng Việt'], th: ['อ่านเป็นภาษาไทย?', 'ไทย'], ko: ['한국어로 읽기?', '한국어'],
      ja: ['日本語で読む？', '日本語'], tl: ['Basahin sa Filipino?', 'Filipino'], es: ['¿Leer en español?', 'Español'],
      pt: ['Ler em português?', 'Português'], fr: ['Lire en français ?', 'Français'], de: ['Auf Deutsch lesen?', 'Deutsch'],
      el: ['Διαβάστε στα ελληνικά;', 'Ελληνικά'], ar: ['القراءة بالعربية؟', 'العربية'], ro: ['Citiți în română?', 'Română']
    };
    if (!MSG[code]) return;

    var go = null;
    var sel = document.getElementById('lang');
    var pick = document.querySelector('select.langpick');
    if (sel && sel.value === 'en') {                       /* app-style pages: home, calendar, fasting, liturgy */
      var has = false; for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === code) has = true;
      if (!has) return;
      go = function () { sel.value = code; sel.dispatchEvent(new Event('change', { bubbles: true })); };
    } else if (pick && !sel && /\/blog\/(?!ru\/|[a-z]{2}\/)[^\/]*$/.test(location.pathname)) {  /* English article pages */
      var url = null;
      for (var j = 0; j < pick.options.length; j++) if (pick.options[j].value === code) url = pick.options[j].getAttribute('data-u');
      if (!url) return;
      go = function () { location.href = url; };
    }
    if (!go) return;

    var bar = document.createElement('div');
    bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Language');
    bar.setAttribute('lang', code); if (code === 'ar') bar.setAttribute('dir', 'rtl');
    bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#1B1917;color:#F7F3EC;' +
      'border-top:1px solid #BFA279;padding:10px 14px;display:flex;gap:12px;align-items:center;justify-content:center;' +
      'font:15px/1.3 Inter,system-ui,sans-serif;flex-wrap:wrap';
    var txt = document.createElement('span'); txt.textContent = MSG[code][0];
    var yes = document.createElement('button'); yes.type = 'button'; yes.textContent = MSG[code][1] + ' →';
    yes.style.cssText = 'background:#BFA279;color:#1B1917;border:0;padding:8px 14px;font:600 14px Inter,system-ui,sans-serif;cursor:pointer;border-radius:0';
    var no = document.createElement('button'); no.type = 'button'; no.setAttribute('aria-label', 'Close'); no.textContent = '✕';
    no.style.cssText = 'background:none;color:#F7F3EC;border:0;font-size:18px;cursor:pointer;padding:6px 8px';
    function close() { try { sessionStorage.setItem('langBarOff', '1'); } catch (e) {} if (bar.parentNode) bar.parentNode.removeChild(bar); }
    yes.addEventListener('click', function () { ev('lang_suggest_accept', { language: code }); close(); go(); });
    no.addEventListener('click', function () { ev('lang_suggest_dismiss', { language: code }); close(); });
    bar.appendChild(txt); bar.appendChild(yes); bar.appendChild(no);
    document.body.appendChild(bar);
    ev('lang_suggest_shown', { language: code });
  });
})();
