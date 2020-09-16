import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['popup', 'details'];

  open() {
    this.popup.style.opacity = '1';
    this.popup.style.zIndex = '99999';
    this.details.style.marginTop = '0';
  }

  close() {
    this.popup.style.opacity = '0';
    this.popup.style.zIndex = '-1000';
    this.details.style.marginTop = '-400px';
  }

  get popup() {
    return this.popupTarget;
  }

  get details() {
    return this.detailsTarget;
  }
}
