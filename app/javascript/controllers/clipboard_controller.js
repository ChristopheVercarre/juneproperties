import ClipboardJS from 'clipboard';
import { Controller } from 'stimulus';
import I18n from 'i18n-js';

import flash from '../services/flash.service';

export default class extends Controller {
  connect() {
    // eslint-disable-next-line no-new
    this.clipboard = new ClipboardJS(this.element);

    this.element.addEventListener('click', e => {
      e.preventDefault();
    });

    this.clipboard.on('success', () => {
      flash('notice', I18n.t('alerts.copied_to_clipboard'));
    });
  }
}
