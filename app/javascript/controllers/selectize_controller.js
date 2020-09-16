import $ from 'jquery';
import 'select2';

import { Controller } from 'stimulus';

export default class extends Controller {
  connect() {
    const { dataset, id } = this.element;
    this.select = $(`#${id}`).select2({ theme: 'bootstrap4' });

    if (dataset.val) {
      this.select.select2('val', JSON.parse(dataset.val));
    }

    this.addSearchPlaceholder();
  }

  addSearchPlaceholder() {
    const { searchPlaceholder } = this.element.dataset;

    if (searchPlaceholder) {
      this.select.one('select2:open', () => {
        $('input.select2-search__field').prop('placeholder', searchPlaceholder);
      });
      this.select.one('select2:close', () => {
        $('input.select2-search__field').prop('placeholder', '');
      });
    }
  }
}
