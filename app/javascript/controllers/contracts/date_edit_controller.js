import { Controller } from 'stimulus';

import flash from '../../services/flash.service';

export default class extends Controller {
  success(event) {
    const [data] = event.detail;
    const { dialog, error_message: errorMessage, success } = data;

    if (success) {
      document.body.insertAdjacentHTML('afterbegin', dialog);
    } else {
      flash('alert', errorMessage);
    }
  }
}
