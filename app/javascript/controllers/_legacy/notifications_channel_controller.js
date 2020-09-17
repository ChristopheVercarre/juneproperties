import { Controller } from 'stimulus';
import createChannel from '../../vendor/cable';

export default class extends Controller {
  static targets = ['emptyNotification', 'notification'];

  connect() {
    this.initChannel();
  }

  initChannel() {
    const container = this.element;
    const { emptyNotification } = this;
    this.channel = createChannel('NotificationsChannel', {
      received({ notification }) {
        const alertIcons = document.querySelectorAll('.icon-notifications');
        if (emptyNotification) {
          emptyNotification.remove();
        }
        container.insertAdjacentHTML('afterbegin', notification);
        alertIcons.forEach(icon => icon.classList.add('new-notification'));

        // For the Notifications#index
        const indexContainer = document.getElementById(
          'notifications-container'
        );
        const indexEmptyNotification = document.getElementById(
          'no-notifications'
        );
        if (indexEmptyNotification) {
          indexEmptyNotification.remove();
        }
        if (indexContainer) {
          indexContainer.insertAdjacentHTML('afterbegin', notification);
        }
      }
    });
  }

  get emptyNotification() {
    if (this.hasEmptyNotificationTarget) {
      return this.emptyNotificationTarget;
    }
    return null;
  }
}
