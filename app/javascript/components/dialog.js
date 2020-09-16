import { createElement } from '../services/dom.service';
import { confirmHTML, dismissHTML, modalHTML } from './dialog/snippets';

export default class {
  constructor({ bodyMessage, confirmMessage, dismissMessage }) {
    this.bodyMessage = bodyMessage;
    this.confirmMessage = confirmMessage;
    this.dismissMessage = dismissMessage;
    this.open = false;

    return new Promise((resolve, reject) => {
      this.promise = { resolve, reject };

      this.init();
    });
  }

  init() {
    this.element = this.render();
  }

  confirm() {
    this.element.remove();
    this.promise.resolve(true);
  }

  dismiss() {
    this.element.remove();
    this.promise.resolve(null);
  }

  render() {
    // create dialog element
    const html = modalHTML(this.bodyMessage);
    const dialog = createElement('div', html);

    // setup dialog modal events
    const backdrop = dialog.querySelector('.modal__backdrop');
    backdrop.addEventListener('click', () => this.dismiss());
    const footer = dialog.querySelector('.modal__footer--content-c');

    // create button elements
    footer.appendChild(this.dismissButton);
    footer.appendChild(this.confirmButton);

    // append to document
    document.body.appendChild(dialog);
    return dialog;
  }

  get confirmButton() {
    const html = confirmHTML(this.confirmMessage);
    return createElement('div', html, {
      eventName: 'click',
      callback: this.confirm.bind(this)
    });
  }

  get dismissButton() {
    const html = dismissHTML(this.dismissMessage);
    return createElement('div', html, {
      eventName: 'click',
      callback: this.dismiss.bind(this)
    });
  }
}
