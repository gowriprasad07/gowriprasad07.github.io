/* GoatCounter view counts via JSON API (documented pattern).
   Cards: [data-views-path] = specific page. Article dateline: [data-views-here] = current page.
   Note: GoatCounter caches counts up to 4 hours and counts unique visitors,
   so numbers update slowly and your own repeat views won't increment. */
(function () {
  var BASE = "https://gpsec.goatcounter.com/counter/";

  function load(el, path) {
    var r = new XMLHttpRequest();
    r.open("GET", BASE + encodeURIComponent(path) + ".json", true);
    r.addEventListener("load", function () {
      if (r.status < 200 || r.status >= 300) return;
      try {
        var c = JSON.parse(r.responseText).count;
        if (c != null) el.textContent = c;
      } catch (e) {}
    });
    r.send();
  }

  document.querySelectorAll("[data-views-path]").forEach(function (el) {
    load(el, el.getAttribute("data-views-path"));
  });
  document.querySelectorAll("[data-views-here]").forEach(function (el) {
    load(el, location.pathname);
  });
})();
