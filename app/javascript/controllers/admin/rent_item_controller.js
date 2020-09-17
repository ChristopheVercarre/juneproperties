import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['modal'];

  toggleCollapsible(event) {
    event.target.classList.toggle('btn--circle--outline-gray');
    event.target.classList.toggle('btn--circle--close');
    this.element.classList.toggle('grid-table__row--body');
    this.element.classList.toggle('grid-table__row--body--open');
  }

  close() {
    this.modal.classList.remove('open');
    document.removeEventListener('keydown', this.handleEscClick);
  }

  open() {
    this.modal.classList.add('open');
    document.addEventListener('keydown', e => this.handleEscClick(e));
  }

  handleEscClick(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }

  get modal() {
    return this.modalTarget;
  }
}
