window.onload = function () {
  // NAVBAR APPEAR ON SCROLL (INDEX ONLY)
  // Get the navbar
  var navbar = document.getElementById("nav");

  // The offset position of the navbar
  var appearAt = 550;

  // Add the sticky class to the navbar when you reach appearAt. Remove "sticky" when you leave the scroll position
  function stickyNavAppear() {
    if (window.pageYOffset >= appearAt) {
      navbar.classList.add("is-open")
      navbar.classList.remove("is-closed");
    } else {
      navbar.classList.remove("is-open");
      navbar.classList.add("is-closed");
    }
  }

  window.addEventListener('scroll', stickyNavAppear);



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
