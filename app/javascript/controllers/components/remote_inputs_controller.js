import { Controller } from 'stimulus';

export default class extends Controller {
  replaceValue({ target }) {
    const { inputTarget } = target.dataset;
    const inputValue = target.dataset.inputValue || target.value;

    document.querySelectorAll(inputTarget).forEach(el => {
      el.value = inputValue;
      el.form.submit();
    });
  }
}
