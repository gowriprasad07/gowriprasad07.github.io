/* Card view counts via GoatCounter JSON API (documented pattern).
   Note: responses are cached up to 4 hours, so counts update slowly. */
(function () {
  var BASE = "https://gpsec.goatcounter.com/counter/";
  document.querySelectorAll("[data-views-path]").forEach(function (el) {
    var path = el.getAttribute("data-views-path");
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
  });
})();
