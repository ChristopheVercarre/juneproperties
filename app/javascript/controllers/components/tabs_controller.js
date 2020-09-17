import { Controller } from 'stimulus';

export default class extends Controller {
  connect() {
    this.setTabBehavior();
  }

  extractScrollSpyData() {
    this.scrollspy = this.element.dataset.scrollspy;
  }

  setTabBehavior() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        this.setTabToggleBehavior(e);
      });
    });
  }

  setTabToggleBehavior(e) {
    this.removeActiveFromAllLinks();
    this.addActiveToSelectLink(e);
    this.scrollToTabSection(e);
  }

  removeActiveFromAllLinks() {
    this.tabs.forEach(tab => {
      tab.classList.remove('active');
    });
  }

  addActiveToSelectLink(e) {
    e.target.closest('.nav-link').classList.add('active');
  }

  scrollToTabSection(e) {
    const selector = e.target.closest('.nav-link').getAttribute('href');
    const section = document.querySelector(selector);
    const sectionOffset = section.getBoundingClientRect().top;
    const navHeight = this.element.getBoundingClientRect().height;
    const offset =
      sectionOffset - navHeight < 0 ? sectionOffset : sectionOffset - navHeight;

    window.scrollBy({ top: offset, left: 0, behavior: 'smooth' });
  }

  get tabs() {
    return this.element.querySelectorAll('.nav-link');
  }
}
