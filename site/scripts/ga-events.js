// GA4 events for highdesertdevelopment.com (G-QFZS418E9R): tap_to_call and
// form_submit_ok. Listeners only observe; they never block or change a link or
// a form, and they do nothing at all if gtag is missing.
(function () {
  function send(name, params) {
    try { if (typeof window.gtag === "function") window.gtag("event", name, params); } catch (e) {}
  }

  // Phone taps. Every tel: link on the site: the header call button, the hero,
  // each contact band, the footer and the body copy. 41 of them at last count.
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href^='tel:']") : null;
    if (!a) return;
    var num = (a.getAttribute("href") || "").replace(/^tel:/i, "").replace(/[^0-9+]/g, "");
    send("tap_to_call", { phone_number: num, page_path: location.pathname });
  }, true);

  // The contact form posts to FormSubmit, which redirects back to
  // /contact?sent=true when it accepted the submission. That redirect is the
  // only honest signal the site gets that a lead went out, so it is what fires
  // the event. sessionStorage stops a reload counting twice.
  try {
    if (location.pathname.indexOf("/contact") === 0 &&
        new URLSearchParams(location.search).get("sent") === "true") {
      var seen = false;
      try {
        seen = sessionStorage.getItem("hdd_lead_sent") === "1";
        sessionStorage.setItem("hdd_lead_sent", "1");
      } catch (err) {}
      if (!seen) send("form_submit_ok", { form_id: "project-form" });
    }
  } catch (err) {}
})();
