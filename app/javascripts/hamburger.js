window.onload = function () {
  // HAMBURGER FOR MOBILE
  var navLinkContainers = document.getElementsByClassName("nav-links");
  var icons = document.getElementsByClassName("close-icon");

  function mobileNav() {
    for (var i = 0; i < navLinkContainers.length; i++) {
      var element = navLinkContainers[i];
      if (element.className === "nav-links") {
        element.className += " show-links";
      } else {
        element.className = "nav-links";
      }
    }
  }

  for (var i = 0; i < icons.length; i++) {
    var icon = icons[i];
    icon.addEventListener('click', mobileNav);
  }
}
