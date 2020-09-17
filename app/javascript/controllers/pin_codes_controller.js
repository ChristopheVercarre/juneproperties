import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['pinCodeInput', 'pinCodeWrapper'];

  changed(event) {
    const inputs = this.pinCodeInputs;
    const input = event.target;

    if (input.value === '') {
      return false;
    }

    const index = inputs.indexOf(input);
    if (index === inputs.length - 1) {
      return input.form.submit();
    }

    return inputs[index + 1].focus();
  }

  get pinCodeInputs() {
    return this.pinCodeInputTargets;
  }

  get pinCodeWrapper() {
    return this.pinCodeWrapperTarget;
  }
}
