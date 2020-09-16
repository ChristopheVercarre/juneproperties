import { getElement, updateElement, clearElement } from '../dom.service';

// TODO: Add Notice
const notice = message =>
  `<div class="alert alert-success alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    ${message}
  </div>`;

const alert = message =>
  `<div class="alert alert-error alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    ${message}
  </div>`;

export default (type, message) => {
  let messageHTML;

  const element = getElement('flash-messages');
  if (type === 'alert') {
    messageHTML = alert(message);
  } else if (type === 'notice') {
    messageHTML = notice(message);
  }

  updateElement(element, messageHTML);
  setTimeout(() => {
    clearElement(element);
  }, 7500);
};
