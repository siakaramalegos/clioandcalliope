export default function () {
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
}
