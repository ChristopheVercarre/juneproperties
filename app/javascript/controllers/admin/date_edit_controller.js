import { Controller } from 'stimulus';

import flash from '../../services/legacy/flash.service';
// import { patch } from '../../services/api.service';
import { createElement } from '../../services/dom.service';

export default class extends Controller {
  success(event) {
    const [data] = event.detail;
    const { dialog, error_message: errorMessage, success } = data;

    if (success) {
      const node = createElement('div');
      node.innerHTML = dialog;
      document.querySelector('body').appendChild(node);
      flash('notice', 'date changed successfully!');
    } else {
      flash('alert', errorMessage);
    }
  }
}
