import { Controller } from 'stimulus';
import Rails from 'rails-ujs';
import Turbolinks from 'turbolinks';
import Dialog from '../components/dialog';

/*
  This class handles the generation of dialog modals that show on click of an element.

  #showDialog
    - displays a Dialog modal
    - handles confirmation event for links and forms

  Creating a confirmable with data attributes:
    - data-controller="dialog"
    - data-action="click->dialog#show"
    - data-dialog-body-message="the html/text rendered in the alert"
    - data-dialog-confirm-message="the html/text on the confirm button"
    - data-dialog-dismiss-message="the html/text on the dismiss button"

  Example:
    <%= button_to name, path,class: 'btn--small--success',
                  data: {
                    controller: 'dialog',
                    action: 'click->dialog#show',
                    dialog_body_message: 'Are you sure?',
                    dialog_confirm_message: 'confirm',
                    dialog_dismiss_message: 'cancel',
                  } %>
*/

export default class extends Controller {
  show(e) {
    e.preventDefault();

    new Dialog({
      bodyMessage: this.bodyMessage,
      confirmMessage: this.confirmMessage,
      dismissMessage: this.dismissMessage
    }).then(value => this.onClose(value));
  }

  onClose(value) {
    if (value) {
      // handle submit button
      if (this.isSubmitInput) {
        const form = this.element.closest('form');
        if (this.remote) {
          Rails.fire(form, 'submit');
        } else {
          form.submit();
        }

        // handle link
      } else if (this.isLink) {
        Turbolinks.visit(this.element.href);
      }
    }
  }

  get remote() {
    return this.data.has('remote');
  }

  get isSubmitInput() {
    return this.element.type === 'submit';
  }

  get isLink() {
    return this.element.tagName.toLowerCase() === 'a';
  }

  get bodyMessage() {
    if (this.data.has('bodyMessage')) {
      return this.data.get('bodyMessage');
    }
    return null;
  }

  get confirmMessage() {
    if (this.data.has('confirmMessage')) {
      return this.data.get('confirmMessage');
    }
    return null;
  }

  get dismissMessage() {
    if (this.data.has('dismissMessage')) {
      return this.data.get('dismissMessage');
    }
    return null;
  }
}
