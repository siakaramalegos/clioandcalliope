require('../scss/style.scss')
require('../index.html');
require('../about.html');
require('../contact.html');
require('../favicon.ico');
require('../static/share_image.jpg');
const gumshoe = require('../lib/gumshoe.min.js')
const SmoothScroll = require('../lib/smooth-scroll.polyfills.min.js')

window.onload = function () {
  // set up gumshoe and smoothscroll
  gumshoe.init()
  const scroll = new SmoothScroll('[data-scroll]', { offset: 100 })



  // NAVBAR APPEAR ON SCROLL (INDEX ONLY)
  // Get the navbar
  var navbar = document.getElementById("nav");

  // The offset position of the navbar
  var appearAt = 430;

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
  var closeIcons = document.getElementsByClassName("close-icon");
  var openIcons = document.getElementsByClassName("open-icon");
  var samePageLinks = document.getElementsByClassName("same-page-link");

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
  for (var i = 0; i < samePageLinks.length; i++) {
    var link = samePageLinks[i];
    link.addEventListener('click', closeHamburger);
  }
}
