import { Controller } from 'stimulus';
import Turbolinks from 'turbolinks';
import 'turbolinks-animate';
import LazyLoad from 'vanilla-lazyload';
import 'intersection-observer';

export default class extends Controller {
  connect() {
    this.animatePages();
    this.scrollToFormErrors();
    this.initLazyload();
  }

  animatePages() {
    document.addEventListener('turbolinks:load', () => {
      // eslint-disable-next-line no-undef
      TurbolinksAnimate.init({ animation: 'fadein' });
    });

    document.addEventListener('turbolinks:before-visit', () => {
      // eslint-disable-next-line no-undef
      TurbolinksAnimate.init({ animation: 'fadeout' });
    });

    window.addEventListener('DOMContentLoaded', () => {
      Turbolinks.controller.adapter.progressBar.setValue(0);
      Turbolinks.controller.adapter.progressBar.show();
    });

    window.addEventListener('load', () => {
      Turbolinks.controller.adapter.progressBar.setValue(100);
      Turbolinks.controller.adapter.progressBar.hide();
    });
  }

  scrollToFormErrors() {
    const errors = document.querySelector('.is-invalid');
    if (errors) {
      errors.scrollIntoView({ behavior: 'smooth' });
    }
  }

  initLazyload() {
    this.preventCaching();

    IntersectionObserver.prototype.POLL_INTERVAL = 100;
    // eslint-disable-next-line no-new
    const scrollingPanel = document.getElementById('scrollingPanel');
    if (scrollingPanel) {
      // eslint-disable-next-line no-new
      this.lazyload = new LazyLoad({
        container: scrollingPanel
      });
    } else {
      // eslint-disable-next-line no-new
      this.lazyload = new LazyLoad();
    }
  }

  preventCaching() {
    document.addEventListener('turbolinks:before-cache', () => {
      this.lazyload.destroy();
    });
  }
}
