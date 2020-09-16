/* eslint no-unused-vars: 0 */

import { Controller } from 'stimulus';
// import Siema from 'flickity';
import Flickity from 'flickity';

export default class extends Controller {
  static targets = ['track'];

  connect() {
    this.init();
  }

  init() {
    // eslint-disable-next-line no-new
    this.slider = new Flickity(this.track, {
      ...this.options
    });

    this.preventCaching();
  }

  next(e) {
    e.preventDefault();
    this.slider.next();
  }

  prev(e) {
    e.preventDefault();
    this.slider.previous();
  }

  goTo(e) {
    e.preventDefault();
    // eslint-disable-next-line radix
    const index = parseInt(e.target.dataset.slideTarget);
    this.slider.select(index);
  }

  preventCaching() {
    document.addEventListener('turbolinks:before-cache', () => {
      this.slider.destroy();
    });
  }

  get options() {
    return {
      lazyload: true,
      imagesLoaded: false,
      pageDots: false,
      draggable: true,
      prevNextButtons: false,
      wrapAround: true,
      cellAlign: 'left'
    };
  }

  get track() {
    return this.trackTarget;
  }
}
