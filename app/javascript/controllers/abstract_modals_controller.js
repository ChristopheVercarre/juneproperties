import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['modal'];

  close() {
    this.modal.classList.remove('open');
    document.removeEventListener('keydown', this.handleEscPress);
  }

  open(e) {
    e.preventDefault();
    this.modal.classList.add('open');
    document.addEventListener('keydown', event => this.handleEscPress(event));
  }

  handleEscPress(e) {
    if (e && e.keyCode === 27) {
      this.close();
    }
  }

  get modal() {
    return this.modalTarget;
  }
}
