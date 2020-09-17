import { Controller } from 'stimulus';
import Popper from 'popper.js';
import 'rails-ujs';

export default class extends Controller {
  connect() {
    if (this.target) {
      document.querySelector('body').appendChild(this.target);
      this.addCloseEventListener();
      this.removeClickPropagationFromChildren();
    }
  }

  toggle() {
    if (this.target && !this.isOpen) {
      this.target.classList.add('show');
      this.element.setAttribute('aria-expanded', true);
      this.popper = new Popper(this.element, this.target);
    } else if (this.target) {
      this.target.classList.remove('show');
      this.element.setAttribute('aria-expanded', false);
    }
  }

  addCloseEventListener() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.target.classList.remove('show');
        this.element.setAttribute('aria-expanded', false);
      });
    }
  }

  clickOutside(e) {
    if (this.target && this.isOpen && this.isClickOutside(e)) {
      this.target.classList.remove('show');
      this.element.setAttribute('aria-expanded', false);
    }
  }

  isClickOutside(e) {
    // safeguard for a mobile bug with flatpickr
    if (e.target.tagName.toUpperCase() === 'BODY') {
      return;
    }

    // eslint-disable-next-line consistent-return
    return (
      !e.target.closest(this.selector) &&
      !this.element.contains(e.target) &&
      !e.target.closest('.flatpickr-calendar')
    );
  }

  removeClickPropagationFromChildren() {
    this.target.childNodes.forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
      });
    });
  }

  get isOpen() {
    return this.target.classList.contains('show');
  }

  get elements() {
    return document.querySelectorAll('[data-controller*="popper"');
  }

  get closeBtn() {
    return this.target.querySelector('.close');
  }

  get selector() {
    return this.element.dataset.popper;
  }

  get target() {
    return document.querySelector(this.selector);
  }
}
