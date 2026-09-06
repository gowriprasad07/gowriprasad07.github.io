/* gp_sec view counter — GoatCounter JSON endpoint
   Reads per-page view counts and fills them into the page.
   Requires "Allow adding visitor counts on your website" enabled in GoatCounter settings. */
(function () {
  var GC_CODE = "gpsec"; // your GoatCounter code
  var base = "https://" + GC_CODE + ".goatcounter.com/counter/";

  function fill(el, path) {
    fetch(base + encodeURIComponent(path) + ".json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.count != null) {
          el.textContent = d.count;
          if (el.parentElement) el.parentElement.classList.add("has-views");
        }
      })
      .catch(function () {});
  }

  // elements keyed to a specific path (the cards)
  document.querySelectorAll("[data-views-path]").forEach(function (el) {
    fill(el, el.getAttribute("data-views-path"));
  });
  // elements that use the current page path (the article datelines)
  document.querySelectorAll("[data-views-here]").forEach(function (el) {
    fill(el, location.pathname);
  });
})();
