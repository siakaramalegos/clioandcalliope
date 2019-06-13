require('../scss/style.scss')
require('../index.html');
require('../about.html');
require('../contact.html');
require('../favicon.ico');
require('../static/share_image.jpg');
require('../static/share_image@2x.jpg');
require('../static/share_image@3x.jpg');
import hamburger from './hamburger'
import navbarAppear from './navbarAppear'
const gumshoe = require('../lib/gumshoe.min.js')
const SmoothScroll = require('../lib/smooth-scroll.polyfills.min.js')

window.onload = function () {
  // set up gumshoe and smoothscroll
  gumshoe.init()
  const scroll = new SmoothScroll('[data-scroll]', { offset: 100 })

  navbarAppear()
  hamburger()
}
