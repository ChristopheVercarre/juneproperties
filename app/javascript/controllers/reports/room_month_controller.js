import { Controller } from 'stimulus';
import Turbolinks from 'turbolinks';

export default class extends Controller {
  visit() {
    Turbolinks.visit(this.tenantUri);
  }

  get tenantUri() {
    if (this.data.has('tenantUri')) {
      return this.data.get('tenantUri');
    }

    return '';
  }
}
