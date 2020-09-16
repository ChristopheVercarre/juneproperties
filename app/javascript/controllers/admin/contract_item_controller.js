import { Controller } from 'stimulus';
import Turbolinks from 'turbolinks';

export default class extends Controller {
  static targets = ['wrapper', 'subtable', 'modal'];

  toggleCollapsible(event) {
    event.target.classList.toggle('btn--circle--outline-gray');
    event.target.classList.toggle('btn--circle--close');
    this.element.classList.toggle('grid-table__row--body');
    this.element.classList.toggle('grid-table__row--body--open');
  }

  showPage(event) {
    if (
      this.eventIsWrapperClick(event) &&
      !this.eventTargetIsClickable(event) &&
      !this.eventTargetIsModal(event)
    ) {
      Turbolinks.visit(this.contractPage);
    }
  }

  eventIsWrapperClick(event) {
    const { action } = event.target.dataset;
    return !action && action !== 'click->admin--contract-item#showPage';
  }

  eventTargetIsClickable(event) {
    const { href, onclick, tagName, classList } = event.target;

    return (
      href ||
      onclick ||
      ['A', 'BUTTON', 'SELECT', 'INPUT'].includes(tagName) ||
      classList.contains('dropdown__menu')
    );
  }

  eventTargetIsModal(event) {
    const modal = event.target.closest('.modal');

    if (modal) {
      return modal.contains(event.target);
    }

    return false;
  }

  get wrapper() {
    return this.wrapperTarget;
  }

  get contractPage() {
    return this.data.get('url');
  }

  get modal() {
    return this.modalTarget;
  }
}
