import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = [
    'form',
    'rentInput',
    'rentIds',
    'submitButton',
    'statusInput',
    'select'
  ];

  initialize() {
    this.ids = [];
  }

  selectAll(event) {
    const input = event.target;

    if (input.checked) {
      this.checkAll();
      this.ids = this.getAllIds();
    } else {
      this.uncheckAll();
      this.ids = [];
    }

    this.toggleSubmit();
  }

  select(event) {
    const input = event.target;

    if (input.checked) {
      const id = this.getId(input.id);
      this.add(id);
      this.addSelectedClass(input);
    } else {
      const id = this.getId(input.id);
      this.remove(id);
      this.removeSelectedClass(input);
    }

    this.toggleSubmit();
  }

  addSelectedClass(checkbox) {
    checkbox.parentElement.parentElement.classList.add(
      'grid-table__row--selected'
    );
  }

  removeSelectedClass(checkbox) {
    checkbox.parentElement.parentElement.classList.remove(
      'grid-table__row--selected'
    );
  }

  selectAction(event) {
    event.preventDefault();
    const { option } = event.target.dataset;
    this.statusInputTarget.value = option;
    this.submit();
  }

  submit() {
    // event.preventDefault();
    this.setIds();
    this.submitButtonTarget.click();
  }

  add(id) {
    this.ids.push(id);
  }

  remove(id) {
    this.ids = this.ids.filter(el => el !== id);
  }

  checkAll() {
    this.rentInputs.forEach(input => {
      input.checked = true;
      this.addSelectedClass(input);
    });
  }

  uncheckAll() {
    this.rentInputs.forEach(input => {
      input.checked = false;
      this.removeSelectedClass(input);
    });
  }

  getId(domId) {
    return domId.split('rent_')[1];
  }

  getAllIds() {
    return this.rentInputs.map(input => this.getId(input.id));
  }

  setIds() {
    this.rentIdsTarget.value = this.ids;
  }

  toggleSubmit() {
    if (this.ids.length !== 0) {
      this.selectTarget.hidden = false;
    } else {
      this.selectTarget.hidden = true;
    }
  }

  get rentInputs() {
    return this.rentInputTargets;
  }
}
