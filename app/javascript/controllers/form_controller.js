/* eslint no-unused-vars: 0 */

import { Controller } from 'stimulus';
import Rails from 'rails-ujs';

import flash from '../services/flash.service';
import { patch } from '../services/api.service';

export default class extends Controller {
  static targets = ['input'];

  submit(event) {
    event.preventDefault();
    try {
      patch(this.url, this.payload).then(({ data }) => {
        const { form, success } = data;
        this.element.outerHTML = form;

        if (success) {
          flash('notice', this.data.get('successMessage'));
        } else {
          flash('alert', this.data.get('errorMessage'));
        }
      });
    } catch (e) {
      flash('alert', this.data.get('errorMessage'));
    }
  }

  success(event) {
    const [_data, _status, xhr] = event.detail;
    this.element.outerHTML = xhr.response;
  }

  get payload() {
    const params = {};
    this.inputs.forEach(input => {
      const { namespace, attribute } = this.extractName(input.name);
      if (namespace) {
        params[namespace] = params[namespace] || {};
        params[namespace][attribute] = input.value;
      } else {
        params[attribute] = input.value;
      }
    });
    return params;
  }

  extractName(name) {
    const regexp = /(?<namespace>.+)\[(?<attribute>.+)\]/.exec(name);
    const {
      groups: { namespace, attribute }
    } = regexp;
    return { namespace, attribute };
  }

  get url() {
    return this.element.action;
  }

  get inputs() {
    return this.inputTargets;
  }
}
