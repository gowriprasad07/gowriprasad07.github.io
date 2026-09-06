/* gp_sec view counter — GoatCounter JSON endpoint
   Requires "Allow adding visitor counts on your website" enabled in GoatCounter settings. */
(function () {
  var GC_CODE = "gpsec";
  var base = "https://" + GC_CODE + ".goatcounter.com/counter";

  // GoatCounter expects the path with its leading slash intact, e.g.
  //   /counter//writing/oscp.html.json
  // so we must NOT encode the slashes. Encode only spaces / odd chars per segment.
  function endpoint(path) {
    if (path.charAt(0) !== "/") path = "/" + path;
    var enc = path.split("/").map(encodeURIComponent).join("/");
    return base + enc + ".json";
  }

  function fill(el, path) {
    fetch(endpoint(path))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.count != null) {
          el.textContent = d.count;
          if (el.parentElement) el.parentElement.classList.add("has-views");
        }
      })
      .catch(function () {});
  }

  document.querySelectorAll("[data-views-path]").forEach(function (el) {
    fill(el, el.getAttribute("data-views-path"));
  });
  document.querySelectorAll("[data-views-here]").forEach(function (el) {
    fill(el, location.pathname);
  });
})();
