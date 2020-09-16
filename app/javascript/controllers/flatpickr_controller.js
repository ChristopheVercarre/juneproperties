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

  initialize() {
    // define locale and global flatpickr settings for all datepickers
    this.config = {
      locale: this.locale,
      altInput: true,
      altFormat: 'd-m-Y',
      showMonths: 1,
      disableMobile: 'true'
    };
  }

  change(
    [selectedDate],
    _,
    {
      element: { id }
    }
  ) {
    if (id === 'contract_move_in') {
      this.setMoveOut(selectedDate);
    }
  }

  setMoveOut(moveIn) {
    const {
      _flatpickr: {
        selectedDates: [moveOut],
        setDate,
        set
      }
    } = document.getElementById('contract_move_out');
    const newMoveOut = new Date(moveIn.setMonth(moveIn.getMonth() + 2));
    set('minDate', newMoveOut);
    if (moveOut < newMoveOut) {
      setDate(newMoveOut);
    }
  }

  get locale() {
    if (this.locales && this.data.has('locale')) {
      return this.locales[this.data.get('locale')];
    }
    return '';
  }
}
