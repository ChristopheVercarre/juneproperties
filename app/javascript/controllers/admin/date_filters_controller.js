import BaseFlatpickr from '../flatpickr_controller';

export default class extends BaseFlatpickr {
  change(selectedDates, dateStr) {
    // Prevent submitting form when date is empty
    if (dateStr === '') {
      return;
    }

    // Prevent range date picker from submitting form on first click
    if (this.isRangeMode && this.isFirstClick(selectedDates)) {
      return;
    }

    const form = this.element.closest('form');
    form.submit();
  }

  isFirstClick(selectedDates) {
    return selectedDates.length !== 2;
  }

  get isRangeMode() {
    return this.config.mode === 'range';
  }
}
