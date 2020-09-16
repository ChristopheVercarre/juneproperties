import { Controller } from 'stimulus';

export default class extends Controller {
  connect() {
    this.scroll = window.pageYOffset;
    this.initScrollSpies();
  }

  initScrollSpies() {
    document.addEventListener('scroll', () => {
      this.updatedScroll = window.pageYOffset;

      if (!this.scrolledMoreThanTenPixels) {
        return;
      }

      clearTimeout(this.prevTimeout);
      this.element.classList.add(this.className);

      this.prevTimeout = setTimeout(() => {
        this.element.classList.remove(this.className);
        // eslint-disable-next-line radix
      }, parseInt(this.intervalTimer));
    });

    this.scroll = this.updatedScroll;
  }

  get scrollingTop() {
    return this.scroll < this.updatedScroll;
  }

  get scrollingBottom() {
    return this.scroll > this.updatedScroll;
  }

  get scrolledMoreThanTenPixels() {
    return !(
      this.scroll - this.updatedScroll > 50 &&
      this.scroll - this.updatedScroll < 50
    );
  }

  get listenToBottomOnly() {
    return this.direction === 'bottom';
  }

  get listenToTopOnly() {
    return this.direction === 'top';
  }

  get listenToAnyDirection() {
    return !this.direction || this.direction === 'all';
  }

  get direction() {
    return this.element.dataset.scrollDirection;
  }

  get className() {
    return this.element.dataset.scrollClass;
  }

  get intervalTimer() {
    return this.element.dataset.timeout;
  }
}
