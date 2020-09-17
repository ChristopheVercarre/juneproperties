import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['container', 'details'];

  toggle(event) {
    const id = event.target.dataset.colocation;
    this.detailsTargets.forEach(el => {
      if (el.dataset.colocation === id) {
        el.classList.toggle('is-open');
      }
    });
    this.findContainer(id).classList.toggle('height');
  }

  findContainer(id) {
    return this.containerTargets.find(el => el.dataset.colocation === id);
  }
}
