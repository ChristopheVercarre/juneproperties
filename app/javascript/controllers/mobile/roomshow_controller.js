import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['room'];

  initialize() {
    this.showCurrentSlide();
  }

  next() {
    this.hideCurrentSlide();
    this.index += 1;
  }

  previous() {
    this.hideCurrentSlide();
    this.index -= 1;
  }

  showCurrentSlide() {
    this.roomTargets.forEach((el, i) => {
      if (this.index === i) {
        el.style.left = '0';
      }
    });
  }

  hideCurrentSlide() {
    this.roomTargets[this.index].style.left = '-999px';
  }

  get currentRoom() {
    return this.roomTarget;
  }

  get index() {
    return parseInt(this.data.get('index'), 10);
  }

  set index(value) {
    if (value >= this.roomTargets.length) {
      value = 0;
    } else if (value < 0) {
      value = this.roomTargets.length - 1;
    }
    this.data.set('index', value);
    this.showCurrentSlide();
  }
}
