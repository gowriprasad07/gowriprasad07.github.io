/* gp_sec view counter — GoatCounter JSON endpoint
   Uses GoatCounter's documented counter API. Requires
   "Allow adding visitor counts on your website" enabled in settings. */
(function () {
  var GC = "https://gpsec.goatcounter.com/counter/";

  function fill(el, path) {
    // GoatCounter's documented format: /counter/ + encodeURIComponent(path) + .json
    var url = GC + encodeURIComponent(path) + ".json";
    var r = new XMLHttpRequest();
    r.open("GET", url, true);
    r.addEventListener("load", function () {
      if (r.status < 200 || r.status >= 300) return;
      try {
        var count = JSON.parse(r.responseText).count;
        if (count != null) {
          el.textContent = count;
          if (el.parentElement) el.parentElement.classList.add("has-views");
        }
      } catch (e) {}
    });
    r.send();
  }

  function run() {
    document.querySelectorAll("[data-views-path]").forEach(function (el) {
      fill(el, el.getAttribute("data-views-path"));
    });
    document.querySelectorAll("[data-views-here]").forEach(function (el) {
      fill(el, location.pathname);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
