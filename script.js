// Mobile menu
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }
})();

// Countdown to Friday, October 9, 2026 (00:00 local time)
(function () {
  var target = new Date(2026, 9, 9, 0, 0, 0).getTime();
  var boxes = document.querySelectorAll(".countdown");
  if (!boxes.length) return;

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    var diff = target - Date.now();

    boxes.forEach(function (box) {
      if (diff <= 0) {
        box.innerHTML = '<span class="out-now">Out Now</span>';
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var vals = { days: d, hours: pad(h), mins: pad(m), secs: pad(s) };
      Object.keys(vals).forEach(function (k) {
        var el = box.querySelector('[data-unit="' + k + '"]');
        if (el) el.textContent = vals[k];
      });
    });
  }

  tick();
  setInterval(tick, 1000);
})();

// Contact form -> opens the visitor's email app (no backend needed)
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var subject = encodeURIComponent("[" + data.get("topic") + "] " + data.get("name"));
    var body = encodeURIComponent(data.get("message") + "\n\nFrom: " + data.get("name") + " <" + data.get("email") + ">");
    window.location.href = "mailto:info@disconights.com?subject=" + subject + "&body=" + body;
    document.getElementById("form-note").textContent = "Opening your email app...";
  });
})();
