import { Controller } from 'stimulus';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

export default class extends Controller {
  connect() {
    if (this.slider) {
      // Turbolinks bug duplication fix
      this.slider.destroy();
    }

    this.slider = noUiSlider.create(this.element, {
      start: [this.min, this.max],
      connect: true,
      tooltips: [this.moneyFormat, this.moneyFormat],
      range: {
        // eslint-disable-next-line prettier/prettier
        min: this.minStart,
        // eslint-disable-next-line prettier/prettier
        max: this.maxStart
      },
      pips: {
        mode: 'range',
        density: 10
      },
      step: this.step
    });
    this.slider.on('change', values => {
      const [min, max] = values;
      this.assignMinValue(min);
      this.assignMaxValue(max);
    });
  }

  assignMinValue(value) {
    this.minTargets.forEach(el => {
      if (el.tagName === 'INPUT') {
        el.value = value;
      } else {
        el.innerText = value;
      }
    });
  }

  assignMaxValue(value) {
    this.maxTargets.forEach(el => {
      if (el.tagName === 'INPUT') {
        el.value = value;
      } else {
        el.innerText = value;
      }
    });
  }

  get minStart() {
    // eslint-disable-next-line radix
    return parseInt(this.element.dataset.minStart);
  }

  get maxStart() {
    // eslint-disable-next-line radix
    return parseInt(this.element.dataset.maxStart);
  }

  get min() {
    // eslint-disable-next-line radix
    return parseInt(this.element.dataset.minCurrent);
  }

  get max() {
    // eslint-disable-next-line radix
    return parseInt(this.element.dataset.maxCurrent);
  }

  get step() {
    // eslint-disable-next-line radix
    return parseInt(this.element.dataset.step);
  }

  get minTargets() {
    return document.querySelectorAll(this.element.dataset.minTarget);
  }

  get maxTargets() {
    return document.querySelectorAll(this.element.dataset.maxTarget);
  }

  get moneyFormat() {
    return wNumb({
      decimals: 0,
      mark: '.',
      thousand: ',',
      prefix: '',
      suffix: '€'
    });
  }
}
