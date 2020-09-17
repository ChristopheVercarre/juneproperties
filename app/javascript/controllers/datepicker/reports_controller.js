import Rails from 'rails-ujs';
import BaseFlatpickr from '../flatpickr_controller';

export default class extends BaseFlatpickr {
  static targets = ['fromInput', 'toInput'];

  change(selectedDates, dateStr) {
    if (dateStr === '') {
      return;
    }

    let element;
    let date;

    if (this.inputTarget === this.from) {
      element = document.getElementById('to-input');
      date = this.addMonths(this.parseDate(dateStr), 11);
    } else {
      element = document.getElementById('from-input');
      date = this.addMonths(this.parseDate(dateStr), -11);
    }
    const controller = this.secondController(element);
    controller.fp.setDate(date);

    const form = this.element.closest('form');
    Rails.fire(form, 'submit');
  }

  secondController(element) {
    return this.application.getControllerForElementAndIdentifier(
      element,
      'datepicker--reports'
    );
  }

  addMonths(date, value) {
    return date.setMonth(date.getMonth() + value);
  }

  parseDate(string) {
    const pattern = /(\d{2})-(\d{2})-(\d{4})/;
    return new Date(string.replace(pattern, '$3-$2-$1'));
  }

  get from() {
    if (this.hasFromInputTarget) {
      return this.fromInputTarget;
    }

    return '';
  }

  get to() {
    if (this.hasToInputTarget) {
      return this.toInputTarget;
    }

    return '';
  }
}
