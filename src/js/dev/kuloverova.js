import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
window.$ = window.jQuery = require('jquery');

import { rem } from '../utils/constants';

// import popup from '../utils/popup';
// import form from '../utils/form';
import scroll from '../utils/scroll';
import fancybox from '../utils/fancybox';

import '../libs/dynamic_adapt';

export const modules = {};

import headerBurger from '../components/headerBurger';
import faqAccordion from '../components/faqAccordion';
import recom from '../components/recom';
import articles from '../components/articles';
import hero from '../components/hero';
import showMoreMob from '../utils/showMoreMob';
import articleDet from '../components/articleDet';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  scroll();
  fancybox();
  headerBurger();
  faqAccordion();
  recom();
  articles();
  articleDet();
  hero();
  try {
    showMoreMob('.article-bibliography__list', 461, '220rem', '.article-bibliography__more');
  } catch {}
});
