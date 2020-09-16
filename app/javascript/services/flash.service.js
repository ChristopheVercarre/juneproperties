import I18n from 'i18n-js';
import { createElement } from './dom.service';

// TODO: Add Notice
const notice = message => `
  <div class="toast toast-primary show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
    <div class="toast-body">
      ${message}
      <br>
      <small class="text-muted">
        ${I18n.t('alerts.just_now')}
      </small>
    </div>
  </div>
`;

const alert = message => `
  <div class="toast toast-danger show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
    <div class="toast-body">
      ${message}
      <br>
      <small class="text-muted">
        ${I18n.t('alerts.just_now')}
      </small>
    </div>
  </div>
`;

export default (type, message) => {
  let messageHTML;

  if (type === 'alert') {
    messageHTML = alert(message);
  } else if (type === 'notice') {
    messageHTML = notice(message);
  }

  const flashMessage = createElement('div', messageHTML);
  document.body.appendChild(flashMessage);

  setTimeout(() => {
    document.body.removeChild(flashMessage);
  }, 5000);
};
