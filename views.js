/* gp_sec view counter — talks to the Cloudflare Worker.
   After deploying the Worker, set WORKER below to its URL
   (e.g. https://gpsec-views.YOURNAME.workers.dev). */
(function () {
  var WORKER = "https://gpsec-views.bgowriprasad.workers.dev";   // <-- set after deploy
  if (WORKER.indexOf("REPLACE") !== -1) return;     // not configured yet: stay silent

  function api(path, method, cb) {
    var r = new XMLHttpRequest();
    r.open(method, WORKER + "?path=" + encodeURIComponent(path), true);
    r.addEventListener("load", function () {
      if (r.status < 200 || r.status >= 300) return;
      try { var c = JSON.parse(r.responseText).count; if (c != null && cb) cb(c); } catch (e) {}
    });
    r.send();
  }

  // 1) Current page: increment once per browser session, then show the count.
  var here = document.querySelector("[data-views-here]");
  if (here) {
    var p = location.pathname;
    var seen = false;
    try { seen = sessionStorage.getItem("v:" + p) === "1"; } catch (e) {}
    if (seen) {
      api(p, "GET", function (c) { here.textContent = c; });
    } else {
      try { sessionStorage.setItem("v:" + p, "1"); } catch (e) {}
      api(p, "POST", function (c) { here.textContent = c; });
    }
  }

  // 2) Cards: read-only counts for each linked page.
  document.querySelectorAll("[data-views-path]").forEach(function (el) {
    api(el.getAttribute("data-views-path"), "GET", function (c) { el.textContent = c; });
  });
})();
