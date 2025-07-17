document.addEventListener("DOMContentLoaded", function () {
    // After 10 seconds, remove the "hidden" class so the popup appears
    setTimeout(function () {
      var popup = document.getElementById("errorForm");
      if (popup) {
        popup.classList.remove("hidden");
      }
    }, 10000);
  });

  // Example redirection function for the "ok" button
  function redirect() {
    window.location.href = "index.html";
  }