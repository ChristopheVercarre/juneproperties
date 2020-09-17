/* eslint no-unused-vars: 0 */

import { Controller } from 'stimulus';
import Rails from 'rails-ujs';

export default class extends Controller {
  static targets = ['form'];

  submit() {
    Rails.fire(this.formTarget, 'submit');
  }

  success(event) {
    const [_data, _status, xhr] = event.detail;
    this.element.outerHTML = xhr.response;
  }

  // get fileInput() {
  //   return this.fileInputTarget;
  // }
}
