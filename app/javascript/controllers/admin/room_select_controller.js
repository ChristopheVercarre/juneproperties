import { Controller } from 'stimulus';
import { get } from '../../services/api.service';
import { enableElement, disableElement } from '../../services/dom.service';

export default class extends Controller {
  static targets = ['colocationSelect', 'accessCodeInput'];

  connect() {
    this.loadRooms();
  }

  loadRooms() {
    const id = this.colocationSelect.value;

    if (id && id > 0) {
      get(`/admin/colocations/${id}/rooms`).then(({ data }) => {
        const rooms = JSON.parse(data.rooms);
        const accessCode = data.access_code;
        const options = [];

        rooms.forEach(room => {
          options.push(this.renderOption(room[1], room[0]));
        });

        const roomSelect = document.getElementById(
          'contract_wizard_form[room_id]_custom_select'
        );

        roomSelect.removeAttribute('disabled');
        roomSelect.classList.remove('disabled');

        roomSelect
          .querySelector('[data-target="select.label"]')
          .removeAttribute('disabled');
        roomSelect
          .querySelector('[data-target="select.input"]')
          .removeAttribute('disabled');

        roomSelect.querySelector(
          '.dropdown__menu-body'
        ).innerHTML = options.join('');

        if (accessCode) {
          enableElement(this.accessCodeInput);
          this.accessCodeInput
            .closest('.input-group')
            .classList.remove('disabled');
        } else {
          disableElement(this.accessCodeInput);
          this.accessCodeInput
            .closest('.input-group')
            .classList.add('disabled');
        }
      });
    }
  }

  renderOption(value, label) {
    return `<a class="dropdown__menu-link"
          data-action="click->select#selectOption"
          data-value="${value}" data-label="${label}"
          data-submit-on-change="">${label}</a>`;
  }

  get colocationSelect() {
    return this.colocationSelectTarget;
  }

  get accessCodeInput() {
    return this.accessCodeInputTarget;
  }
}
