/* gp_sec views + likes — talks to the Cloudflare Worker. */
(function () {
  var WORKER = "https://gpsec-views.bgowriprasad.workers.dev";
  if (WORKER.indexOf("REPLACE") !== -1) return;

  function api(path, kind, method, cb) {
    var url = WORKER + "?path=" + encodeURIComponent(path);
    if (kind === "likes") url += "&kind=likes";
    var r = new XMLHttpRequest();
    r.open(method, url, true);
    r.addEventListener("load", function () {
      if (r.status < 200 || r.status >= 300) return;
      try { var c = JSON.parse(r.responseText).count; if (c != null && cb) cb(c); } catch (e) {}
    });
    r.send();
  }

  // ---- VIEWS ----
  // current page: increment once per browser session
  var here = document.querySelector("[data-views-here]");
  if (here) {
    var p = location.pathname, seen = false;
    try { seen = sessionStorage.getItem("v:" + p) === "1"; } catch (e) {}
    if (seen) {
      api(p, "views", "GET", function (c) { here.textContent = c; });
    } else {
      try { sessionStorage.setItem("v:" + p, "1"); } catch (e) {}
      api(p, "views", "POST", function (c) { here.textContent = c; });
    }
  }
  // cards: read-only view counts
  document.querySelectorAll("[data-views-path]").forEach(function (el) {
    api(el.getAttribute("data-views-path"), "views", "GET", function (c) { el.textContent = c; });
  });

  // ---- LIKES ----
  var likeBtn = document.querySelector("[data-like]");
  if (likeBtn) {
    var lp = location.pathname;
    var countEl = likeBtn.querySelector(".like-count");
    var liked = false;
    try { liked = localStorage.getItem("liked:" + lp) === "1"; } catch (e) {}
    if (liked) likeBtn.classList.add("liked");

    // show current like count
    api(lp, "likes", "GET", function (c) { if (countEl) countEl.textContent = c; });

    likeBtn.addEventListener("click", function () {
      if (likeBtn.classList.contains("liked")) return;  // one like per person
      likeBtn.classList.add("liked");
      try { localStorage.setItem("liked:" + lp, "1"); } catch (e) {}
      api(lp, "likes", "POST", function (c) { if (countEl) countEl.textContent = c; });
    });
  }
})();
