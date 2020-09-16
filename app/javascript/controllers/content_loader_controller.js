import { Controller } from 'stimulus';
import flash from '../services/flash.service';

export default class extends Controller {
  connect() {
    this.load();
  }

  load() {
    fetch(this.data.get('url'))
      .then(response => {
        if (response.status >= 400) {
          throw response.statusText;
        }

        return response.text();
      })
      .then(html => {
        this.element.innerHTML = html;
      })
      .catch(errorMessage => {
        flash('alert', errorMessage);
      });
  }
}
