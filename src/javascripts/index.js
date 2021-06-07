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
import Gumshoe from 'gumshoejs'
import SmoothScroll from 'smooth-scroll'

// set up gumshoe and smoothscroll
new Gumshoe('.same-page-link')
new SmoothScroll('[data-scroll]', { offset: 100 })

navbarAppear()
hamburger()
