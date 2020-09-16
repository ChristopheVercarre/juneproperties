import Controller from './abstract_modals_controller';

export default class extends Controller {
  connect() {
    const selector = window.location.hash;
    if (selector) {
      document.addEventListener('turbolinks:load', () => {
        this.openModalIfFound(selector);
      });
    }

    if (this.hasModalTarget) {
      document.querySelector('body').appendChild(this.modal);
      this.addCloseEventListener();
    }
  }

  addCloseEventListener() {
    if (this.modalClosers.length > 0) {
      this.modalClosers.forEach(el => {
        el.addEventListener('click', () => {
          this.close();
        });
      });
    }
  }

  openModalIfFound(selector) {
    const modal = document.querySelector(selector);
    if (modal) {
      modal.classList.add('open');
      document.addEventListener('keydown', () => this.handleEscPress());
    }
  }

  close() {
    document.removeEventListener('keydown', this.handleEscPress);

    if (this.openedModal) {
      this.openedModal.classList.remove('open');
    }
  }

  get modal() {
    try {
      return this.modalTarget;
    } catch (_e) {
      return document.querySelector(this.modalSelector);
    }
  }

  get modalSelector() {
    return '[data-target*="modals.modal"]';
  }

  get modalClosers() {
    return document.querySelectorAll(this.closeSelector);
  }

  get closeSelector() {
    return '[data-action*="click->modals#close"]';
  }

  get openedModal() {
    return document.querySelector(`${this.modalSelector}.open`);
  }
}
