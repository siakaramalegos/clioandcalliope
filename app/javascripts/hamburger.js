window.onload = function () {
  // HAMBURGER FOR MOBILE
  var navLinkContainers = document.getElementsByClassName("nav-links");
  var closeIcons = document.getElementsByClassName("close-icon");
  var openIcons = document.getElementsByClassName("open-icon");

  function openHamburger() {
    // Show the navlinks
    for (var i = 0; i < navLinkContainers.length; i++) {
      var element = navLinkContainers[i]
      element.classList.add("show-links");
      element.classList.remove("hide-links");
    }
    // Hide the hamburger
    for (var i = 0; i < openIcons.length; i++) {
      var icon = openIcons[i];
      icon.classList.add('hide');
    }
  }

  function closeHamburger() {
    // Hide the navlinks
    for (var i = 0; i < navLinkContainers.length; i++) {
      var element = navLinkContainers[i]
      element.classList.add("hide-links");
      element.classList.remove("show-links");
    }
    // Show the hamburger
    for (var i = 0; i < openIcons.length; i++) {
      var icon = openIcons[i];
      icon.classList.remove('hide');
    }
  }

  for (var i = 0; i < closeIcons.length; i++) {
    var icon = closeIcons[i];
    icon.addEventListener('click', closeHamburger);
  }
  for (var i = 0; i < openIcons.length; i++) {
    var icon = openIcons[i];
    icon.addEventListener('click', openHamburger);
  }
}
