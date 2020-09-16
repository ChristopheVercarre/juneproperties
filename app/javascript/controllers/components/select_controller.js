import $ from 'jquery';
import 'bootstrap-select';
import { Controller } from 'stimulus';

export default class extends Controller {
  connect() {
    if (this.element.nextSibling) {
      return;
    }
    $(this.element).selectpicker();
  }
}
