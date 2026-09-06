/* GoatCounter view counts via the counter JSON API.
   The counter endpoint wants the path with literal slashes (not %2F),
   so we encode each path segment but keep the "/" separators.
   Note: counts are unique visitors and cached up to ~4 hours. */
(function () {
  var BASE = "https://gpsec.goatcounter.com/counter";

  function endpoint(path) {
    if (path.charAt(0) !== "/") path = "/" + path;
    // encode each segment, keep slashes literal
    var enc = path.split("/").map(encodeURIComponent).join("/");
    return BASE + enc + ".json";
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
