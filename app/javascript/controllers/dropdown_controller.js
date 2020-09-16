/* eslint no-new: 0 */

import Popper from 'popper.js';
import { Controller } from 'stimulus';
import Rails from 'rails-ujs';

export default class extends Controller {
  static targets = ['alert', 'container', 'menu', 'body'];

  connect() {
    this.initPoppers();
  }

  initPoppers() {
    const dropdownMenus = document.querySelectorAll(this.menuSelector);
    dropdownMenus.forEach(dropdownMenu => {
      const container = dropdownMenu.closest(this.containerSelector);
      if (container) {
        const toggle = container.querySelector(this.toggleSelector);
        new Popper(toggle, dropdownMenu);
      }
    });
  }

  toggle(e) {
    e.stopPropagation();
    this.removeAlert();
    const reference = e.target;
    const popper = this.menuTarget;
    if (this.dropdownIsOpen) {
      this.closeDropdown();
    } else {
      this.closeAllDropdowns();
      this.openDropdown();
    }
    new Popper(reference, popper);
  }

  removeAlert() {
    if (
      this.hasAlertTarget &&
      this.alert.classList.contains('new-notification')
    ) {
      this.alert.classList.remove('new-notification');
      fetch('/notifications/alert', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Rails.csrfToken()
        },
        credentials: 'same-origin'
      });
    }
  }

  clickOutside(e) {
    if (!this.container.contains(e.target)) {
      this.closeAllDropdowns();
    } else {
      e.stopPropagation();
    }
  }

  openDropdown() {
    this.container.classList.remove('dropdown');
    this.container.classList.add('dropdown--open');
    this.container.setAttribute('data-open', 'true');
    this.setHeight();
  }

  closeDropdown() {
    this.container.classList.add('dropdown');
    this.container.classList.remove('dropdown--open');
    this.container.removeAttribute('data-open');
  }

  closeAllDropdowns() {
    document.querySelectorAll(this.openDropdownSelector).forEach(el => {
      el.classList.add('dropdown');
      el.classList.remove('dropdown--open');
      el.removeAttribute('data-open');
    });
  }

  distanceToBottom() {
    const bounds = this.container.getBoundingClientRect();
    const distanceToBottom =
      window.innerHeight - bounds.y - bounds.height - window.innerHeight;
    return `${distanceToBottom}px`;
  }

  setHeight() {
    const { height } = this.body.getBoundingClientRect();

    if (height > window.innerHeight) {
      this.menu.style.height = `${window.innerHeight}px`;
    }
  }

  get alert() {
    return this.alertTarget;
  }

  get container() {
    return this.containerTarget;
  }

  get body() {
    return this.bodyTarget;
  }

  get menu() {
    return this.menuTarget;
  }

  get toggleSelector() {
    return '[data-action^="click->dropdown#toggle"';
  }

  get containerSelector() {
    return '[data-target="dropdown.container"]';
  }

  get openDropdownSelector() {
    return '[data-target="dropdown.container"][data-open="true"]';
  }

  get menuSelector() {
    return '[data-target="dropdown.menu"]';
  }

  get dropdownIsOpen() {
    return this.container.dataset.open === 'true';
  }
}
