import { Controller } from 'stimulus';

export default class extends Controller {
  connect() {
    this.setTabFromUrlHash();
  }

  setTabFromUrlHash() {
    const contentSelector = this.getLocationHash();
    if (!contentSelector) {
      return;
    }
    const tab = this.selectTabWithDataAttribute(contentSelector);
    const content = document.querySelector(contentSelector);
    if (!tab || !content) {
      return;
    }
    this.setActiveTab(tab);
    this.setShownContent(content);
  }

  selectTabWithDataAttribute(contentSelector) {
    return document.querySelector(`[data-content='${contentSelector}']`);
  }

  getLocationHash() {
    return window.location.hash;
  }

  showContent(e) {
    e.preventDefault();
    const contentSelector = e.target.dataset.content;
    const content = document.querySelector(contentSelector);
    this.setActiveTab(e.target);
    this.setShownContent(content);
  }

  setActiveTab(currentTab) {
    this.nodeAndSiblings(currentTab).forEach(this.removeActiveClass);
    this.addActiveClass(currentTab);
  }

  setShownContent(currentContent) {
    this.nodeAndSiblings(currentContent).forEach(this.removeShowClass);
    this.addShowClass(currentContent);
  }

  nodeAndSiblings(node) {
    return Array.from(node.parentNode.children);
  }

  addActiveClass(node) {
    node.classList.add('active');
  }

  addShowClass(node) {
    node.classList.add('show');
  }

  removeActiveClass(node) {
    node.classList.remove('active');
  }

  removeShowClass(node) {
    node.classList.remove('show');
  }
}
