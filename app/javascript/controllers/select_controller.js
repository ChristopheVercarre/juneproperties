import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['input', 'label'];

  selectOption(e) {
    e.stopPropagation();
    this.setValue(e);
    this.setLabel(e);
    this.closeDropdown();
    this.emmitEvent();

    if (e.target.dataset.submitOnChange === 'true') {
      e.target.closest('form').submit();
    }
  }

  emmitEvent() {
    if ('createEvent' in document) {
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      this.input.dispatchEvent(evt);
    } else this.input.fireEvent('onchange');
  }

  setLabel({ target }) {
    this.label.innerText = target.dataset.label || '';
  }

  setValue({ target }) {
    this.input.value = target.dataset.value || '';
  }

  closeDropdown() {
    const dropdown = this.input.closest(this.dropdownSelector);
    dropdown.classList.remove('dropdown--open');
    dropdown.classList.add('dropdown');
  }

  get input() {
    return this.inputTarget;
  }

  get label() {
    return this.labelTarget;
  }

  get dropdownSelector() {
    return '[data-target="dropdown.container"]';
  }
}
