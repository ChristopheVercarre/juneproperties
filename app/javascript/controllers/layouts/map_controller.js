import { Controller } from 'stimulus';
import elementResizeEvent from 'element-resize-event';

export default class extends Controller {
  static targets = ['map', 'content'];

  connect() {
    this.addResizeListener();
    this.openMapIfLargeScreen();
  }

  openMapIfLargeScreen() {
    // bootstrap lg breakpoint
    if (window.innerWidth > 992) {
      this.map.classList.add('show');
    }
  }

  addResizeListener() {
    elementResizeEvent(this.content, () => {
      this.reinitializeSliders();
    });
    elementResizeEvent(this.map, () => {
      this.resizeMap();
    });
  }

  reinitializeSliders() {
    this.stimulustSliders.forEach(el => {
      const controller = this.application.getControllerForElementAndIdentifier(
        el,
        'slider'
      );
      controller.init();
    });
  }

  resizeMap() {
    const controller = this.application.getControllerForElementAndIdentifier(
      this.stimulusMap,
      'components--map'
    );
    controller.connect();
    this.stimulusMapTarget.style.width = '100%';
    this.stimulusMapTarget.style.height = '100%';
  }

  toggleMap(e) {
    e.preventDefault();
    this.map.classList.toggle('show');
  }

  showMap() {
    this.map.classList.add('show');
  }

  hideMap() {
    this.map.classList.remove('show');
  }

  get content() {
    return this.contentTarget;
  }

  get map() {
    return this.mapTarget;
  }

  get stimulustSliders() {
    return this.content.querySelectorAll('[data-controller*="slider"]');
  }

  get stimulusMapTarget() {
    return document.querySelector('[data-target*="components--map.map"]');
  }

  get stimulusMap() {
    return document.querySelector('[data-controller*="components--map"]');
  }
}
