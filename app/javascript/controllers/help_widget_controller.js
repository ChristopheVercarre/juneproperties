/* eslint no-multi-assign: 0 */

import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['question'];

  initialize() {
    this.loadScript();
  }

  connect() {
    this.runHelpCrunchMethods();
  }

  loadScript() {
    this.HelpCrunch = window.HelpCrunch = (...args) => {
      window.HelpCrunch.q.push(args);
    };
    window.HelpCrunch.q = [];

    const s = document.createElement('script');
    s.id = 'helpcrunch-widget-script';
    s.async = 1;
    s.type = 'text/javascript';
    s.src = 'https://widget.helpcrunch.com/';
    (document.body || document.head).appendChild(s);
  }

  runHelpCrunchMethods() {
    this.HelpCrunch('init', 'colochousing', {
      applicationId: 1,
      applicationSecret: process.env.HELPCRUNCH_APPLICATION_SECRET
    });
    this.HelpCrunch('showChatWidget');
  }
}
