import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll() {
  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');

    if (!scrollEl) {
      console.warn('Locomotive Scroll: data-scroll-container not found.');
      return;
    }

    let locoScroll = null;
    let lsUpdate = null;

    // dynamic import to avoid ESM/CommonJS bundler issues
    let isActive = true;
    (async () => {
      const LocomotiveModule = await import('locomotive-scroll');
      const LocomotiveScroll = LocomotiveModule.default || LocomotiveModule;

      locoScroll = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        multiplier: 1,
        class: 'is-ready',
      });

      locoScroll.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollEl, {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollEl.style.transform ? 'transform' : 'fixed',
      });

      lsUpdate = () => locoScroll && locoScroll.update();

      ScrollTrigger.addEventListener('refresh', lsUpdate);
      ScrollTrigger.refresh();

      // store cleanup handler on element to access in return if needed (no type assertion)
      scrollEl._locoCleanup = () => {
        ScrollTrigger.removeEventListener('refresh', lsUpdate);
        if (locoScroll) {
          locoScroll.destroy();
          locoScroll = null;
        }
      };
    })();

    // cleanup
    return () => {
      try {
        if (scrollEl && scrollEl._locoCleanup) {
          scrollEl._locoCleanup();
        }
      } catch (e) {
        // silent
      }
    };
  }, []);
}