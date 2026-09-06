/* GoatCounter view counts via the counter JSON API.
   Endpoint: /counter/[PATH].json where [PATH] keeps its leading slash,
   producing a double slash: /counter//writing/oscp.html.json
   Counts are unique visitors, cached up to ~4 hours. */
(function () {
  var BASE = "https://gpsec.goatcounter.com/counter/";  // trailing slash kept

  function endpoint(path) {
    if (path.charAt(0) !== "/") path = "/" + path;       // ensure leading slash
    return BASE + path + ".json";                         // -> /counter//writing/...
  }

  function load(el, path) {
    var r = new XMLHttpRequest();
    r.open("GET", endpoint(path), true);
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
