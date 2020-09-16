import { createElement } from '../services/dom.service';
import hintHTML from './hint/snippets';

export default class {
  constructor(target, message) {
    this.message = message;
    this.target = target;

    this.init();
    return this.element;
  }

  init() {
    this.element = this.render();
  }

  render() {
    const html = hintHTML(this.message);
    const hint = createElement('div', html);

    this.target.appendChild(hint);

    return hint;
  }
}
