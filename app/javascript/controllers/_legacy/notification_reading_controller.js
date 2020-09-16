/* eslint no-new: 0 */

import Tooltip from 'tooltip.js';
import Rails from 'rails-ujs';
import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['tooltip'];

  connect() {
    this.initTooltip();
  }

  onClick() {
    fetch(this.tooltip.dataset.url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': Rails.csrfToken()
      },
      credentials: 'same-origin'
    })
      .then(response => response.text())
      .then(html => {
        const id = this.data.get('id');
        const elements = document.querySelectorAll(
          `[data-notification-reading-id="${id}"]`
        );
        elements.forEach(element => {
          element.outerHTML = html;
        });
      });
  }

  initTooltip() {
    new Tooltip(this.tooltip, {
      title: this.tooltip.dataset.tooltip,
      trigger: this.tooltip.dataset.trigger || 'hover'
    });
  }

  get tooltip() {
    return this.tooltipTarget;
  }
}
