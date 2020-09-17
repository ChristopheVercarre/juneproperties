/* eslint no-multi-assign: 0 */

import { Controller } from 'stimulus';

export default class extends Controller {
  connect() {
    this.loadScript();
  }

  loadScript() {
    let js;
    let q;
    const d = document;
    const gi = d.getElementById;
    const ce = d.createElement;
    const gt = d.getElementsByTagName;
    const id = 'typef_orm';
    const b = 'https://embed.typeform.com/';
    if (!gi.call(d, id)) {
      js = ce.call(d, 'script');
      js.id = id;
      js.src = `${b}embed.js`;
      // eslint-disable-next-line prefer-destructuring
      q = gt.call(d, 'script')[0];
      q.parentNode.insertBefore(js, q);
    }
  }
}
