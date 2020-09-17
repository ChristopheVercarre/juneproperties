/* eslint-disable no-underscore-dangle */
/* eslint no-unused-vars: 0 */
import I18n from 'i18n-js';

import Controller from '../abstract_modals_controller';
import flash from '../../services/legacy/flash.service';
import { updateParentElement } from '../../services/dom.service';
import Hint from '../../components/hint';

export default class extends Controller {
  static targets = [
    'deleteLink',
    'measurementInput',
    'percentAmountInput',
    'absoluteAmountInput',
    'periodInput',
    'formError',
    'netRent',
    'modal'
  ];

  connect() {
    this.displayAbsolute();
    this.toggleDeleteDiscountButton(this.hasThisMonthDiscount);
  }

  onTogglePeriod(_e) {
    this.fillInAmountIfExists();
    this.toggleDeleteDiscount();
  }

  onToggleMeasurement(_e) {
    this.fillInAmountIfExists();
  }

  fillInAmountIfExists() {
    return this.isThisMonthPeriod
      ? this.fillInAmount(this.thisMonthDiscount)
      : this.fillInAmount(this.nextMonthDiscount);
  }

  fillInAmount(amount) {
    if (this.isAbsoluteMeasurement) {
      this.absoluteAmountInputTarget.value = amount;
    } else {
      const asPercentage = ((amount / this.netRent) * 100).toFixed(2);
      this.percentAmountInputTarget.value = asPercentage;
      this.displayAbsolute();
    }
  }

  toggleDeleteDiscount() {
    const url = new URL(this.deleteLinkTarget.href);
    url.searchParams.set('period', this.period);
    this.deleteLinkTarget.href = url.href;

    this.toggleDeleteDiscountButton(
      this.period === 'this_month'
        ? this.hasThisMonthDiscount
        : this.hasNextMonthDiscount
    );
  }

  toggleDeleteDiscountButton(hasDiscount) {
    const display = JSON.parse(hasDiscount || 'false') ? 'block' : 'none';
    this.deleteLinkTarget.style.display = display;
  }

  displayAbsolute() {
    if (this.hint) {
      this.hint.remove();
    }

    if (this.isPercentMeasurement && this.percentAmountNotZero) {
      this.hint = new Hint(
        this.percentAmountInputTarget.parentElement,
        this.hintMessage
      );
    }
  }

  success(event) {
    this.formErrorTarget.innerHTML = '&nbsp;';
    const [data, _status, _xhr] = event.detail;
    const {
      error_message: errorMessage,
      success_message: successMessage,
      html,
      success
    } = data;

    if (success) {
      flash('notice', successMessage);
      updateParentElement(this.element, html);
      this.element.remove();
    } else {
      this.formErrorTarget.innerHTML = errorMessage;
    }
  }

  get thisMonthDiscount() {
    return JSON.parse(this.data.get('thisMonthDiscount')).toFixed(2);
  }

  get nextMonthDiscount() {
    return JSON.parse(this.data.get('nextMonthDiscount')).toFixed(2);
  }

  get hasThisMonthDiscount() {
    return this.thisMonthDiscount > 0;
  }

  get hasNextMonthDiscount() {
    return this.nextMonthDiscount > 0;
  }

  get hintMessage() {
    return `Equivalent to €${this.absoluteAmount}`;
  }

  get percentAmountNotZero() {
    return this.percentAmount > 0;
  }

  get isPercentMeasurement() {
    return this.measurement === 'percent';
  }

  get isAbsoluteMeasurement() {
    return this.measurement === 'absolute';
  }

  get isThisMonthPeriod() {
    return this.period === 'this_month';
  }

  get period() {
    return this.periodInputTarget.value;
  }

  get measurement() {
    return this.measurementInputTarget.value;
  }

  get percentAmount() {
    return parseFloat(this.percentAmountInputTarget.value) || 0;
  }

  get absoluteAmount() {
    return Math.ceil((this.percentAmount * this.netRent) / 100);
  }

  get netRent() {
    if (this.data.has('netRent')) {
      return this.data.get('netRent');
    }

    return null;
  }
}
