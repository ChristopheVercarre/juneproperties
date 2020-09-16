import Flatpickr from 'stimulus-flatpickr';

// import the translation files and create a translation mapping
import { english } from 'flatpickr/dist/l10n/default';
import { French } from 'flatpickr/dist/l10n/fr';
import { Dutch } from 'flatpickr/dist/l10n/nl';

// create a new Stimulus controller by extending stimulus-flatpickr wrapper controller
export default class extends Flatpickr {
  locales = {
    en: english,
    fr: French,
    nl: Dutch
  };

  connect() {
    // define locale and global flatpickr settings for all datepickers
    this.config = {
      locale: this.locale,
      altInput: true,
      altFormat: 'd-m-Y',
      showMonths: 1
    };

    super.connect();
  }

  get locale() {
    if (this.locales && this.data.has('locale')) {
      return this.locales[this.data.get('locale')];
    }
    return '';
  }
}
