/* eslint no-unused-vars: 0 */
import { Controller } from 'stimulus';
import {
  showElement,
  enableElement,
  hideElement,
  disableElement
} from '../services/dom.service';

export default class extends Controller {
  connect() {
    this.toggleContent();
  }

  toggleContent() {
    this.hideAndDisableContent();
    this.showAndEnableSelectedContent();
  }

  hideAndDisableContent() {
    this.contents.forEach(this.hideAndDisable);
  }

  showAndEnableSelectedContent() {
    this.showAndEnable(this.selectedContent);
  }

  hideAndDisable(element) {
    hideElement(element);
    if (element.querySelector('input')) {
      disableElement(element.querySelector('input'));
    }
  }

  showAndEnable(element) {
    showElement(element, 'initial');
    if (element.querySelector('input')) {
      enableElement(element.querySelector('input'));
    }
  }

  get selectedContent() {
    return document.querySelector(this.selectedContentSelector);
  }

  get contents() {
    return document.querySelectorAll(this.controlCssSelector);
  }

  get selectedContentSelector() {
    return `${this.controlCssSelector}[data-content="${this.element.value}"]`;
  }

  get controlCssSelector() {
    return `[data-control="${this.element.id}"]`;
  }

  get select() {
    return this.selectTarget;
  }
}
