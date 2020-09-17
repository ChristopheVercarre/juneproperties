// import pdfjsLib from 'pdfjs-dist/webpack';

import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['counter', 'input'];

  connect() {
    this.updateCounter();
  }

  updateCounter() {
    this.charCount = this.input.value.length;
    this.maxCharCount = this.input.dataset.maxCharCount;
    this.minCharCount = this.input.dataset.minCharCount;
    const { charCount, minCharCount, maxCharCount } = this;

    if (minCharCount) {
      this.counter.innerHTML = `
        <span class="${this.minTextClass}">
          ${charCount}/${minCharCount} (min)
        </span>
      `;
    } else if (maxCharCount) {
      this.counter.innerHTML = `
        <span class="${this.maxTextClass}">
          ${charCount}/${minCharCount} (max)
        </span>`;
    }
  }

  get minTextClass() {
    if (this.charCount < this.minCharCount) {
      return 'text-black';
    }

    return 'text-success';
  }

  get maxTextClass() {
    if (this.charCount > this.minCharCount) {
      return 'text-black';
    }

    return 'text-danger';
  }

  get counter() {
    return this.counterTarget;
  }

  get input() {
    return this.inputTarget;
  }
}
