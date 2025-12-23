import { Fancybox } from '@fancyapps/ui';

// import { lenis } from '../components/smoothScroll';
const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

function fancybox() {
  const header = document.querySelector('header');
  Fancybox.bind('[data-fancybox]', {
    animated: true,
    autoStart: false,
    placeFocusBack: false,
    idle: false,

    Images: {
      zoom: false // отключает zoom-анимацию при открытии
    },
    clickContent: false, // отключает zoom при клике
    wheel: false, // отключает zoom при скролле
    Carousel: {
      Panzoom: {
        // zoom: false,
        // pinchToZoom: false,
        // wheel: false,
        // touch: false
      }
    },
    Thumbs: false,
    Toolbar: {
      display: {
        middle: [],
        left: [],
        right: ['close']
      },
      items: {
        close: {
          tpl: `
          <button class="f-button f-button-close" data-fancybox-close>
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
           
              <g clip-path="url(#clip0_273_8395)">
              <path d="M43.5882 22.4116L22.4111 43.5887" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22.4111 22.4116L43.5882 43.5887" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            <defs>
              <rect width="24" height="24" fill="white" transform="translate(21 21)"/>
            </defs>
          </svg>   
          </button>
          `
        }
      }
    },
    on: {
      done: (fancybox) => {
        const fancyboxEl = fancybox.container,
          prevBtn = fancyboxEl.querySelector('.f-button.is-prev'),
          nextBtn = fancyboxEl.querySelector('.f-button.is-next');

        prevBtn &&
          (prevBtn.innerHTML = `
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2015_8119)">
            
              <path d="M44.3117 34.0002L45.3117 34.0002V32.0002L44.3117 32.0002V33.0002V34.0002ZM23.0985 32.0002C22.5462 32.0002 22.0985 32.4479 22.0985 33.0002C22.0985 33.5524 22.5462 34.0002 23.0985 34.0002V33.0002V32.0002ZM44.3117 33.0002V32.0002H23.0985V33.0002V34.0002H44.3117V33.0002Z" fill="white"/>
              <path d="M30.877 42.1924L21.6846 33L30.877 23.8076" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_2015_8119">
                <rect width="65" height="65" fill="white"/>
              </clipPath>
              </defs>
          </svg>

         `);

        nextBtn &&
          (nextBtn.innerHTML = `
            <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2015_8118)">
              
                <path d="M21.6844 32.0013H20.6844V34.0013H21.6844V33.0013V32.0013ZM42.8976 34.0013C43.4499 34.0013 43.8976 33.5536 43.8976 33.0013C43.8976 32.449 43.4499 32.0013 42.8976 32.0013V33.0013V34.0013ZM21.6844 33.0013V34.0013H42.8976V33.0013V32.0013H21.6844V33.0013Z" fill="white"/>
                <path d="M35.1191 23.8091L44.3115 33.0015L35.1191 42.1938" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_2015_8118">
                  <rect width="65" height="65" fill="white"/>
                </clipPath>
              </defs>
            </svg>

          `);
      },

      init: function () {
        $('.fancybox-bg').fadeIn();
        // if (lenis && typeof lenis.stop === 'function') {
        //   let scrollWith = getScrollbarWidth();
        //   // setTimeout(() => {
        //   // if (document.body.querySelector('.fancybox__container')) {
        //   //   document.body.querySelector('.fancybox__container').style.paddingRight = `${scrollWith}px`;
        //   //   document.body.querySelector('.fancybox__toolbar').style.paddingRight = `${scrollWith}px`;
        //   // }
        //   if (header) {
        //     header.style.paddingRight = `${scrollWith}px`;
        //   }
        //   lenis.stop();
        //   // }, 300);
        // }
      },
      close: function () {
        $('.fancybox-bg').fadeOut();
        // if (lenis && typeof lenis.start === 'function') {
        //   // document.body.style.paddingRight = ``;
        //   lenis.start();
        //   // document.body.querySelector('.fancybox__container').style.paddingRight = ``;
        //   // document.body.querySelector('.fancybox__toolbar').style.paddingRight = ``;
        //   setTimeout(() => {
        //     if (header) {
        //       header.style.paddingRight = ``;
        //     }
        //   }, 500);
        // }
      }
    }
  });

  $('.fancybox-bg').on('click', function () {
    Fancybox.close();
  });
}

export default fancybox;
