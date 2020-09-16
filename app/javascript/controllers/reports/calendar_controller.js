import { Controller } from 'stimulus';
import { colors } from '../../components/colors';

export default class extends Controller {
  static targets = ['monthBar', 'tooltip'];

  connect() {
    this.assignBorderColorsToMonths();
  }

  assignBorderColorsToMonths() {
    this.colorIndex = 0;

    this.monthBars.forEach((bar, index) => {
      this.tenant = bar.dataset.tenantName;

      if (this.roomIsNotVacant) {
        this.switchColorIfTenantSwitched();
        this.changeElementBorderColor(bar);
        this.reassignPrevTenant();
      } else {
        this.hideTooltipAndDisableCursor(bar, index);
      }
    });
  }

  switchColorIfTenantSwitched() {
    if (this.tenantSwitched) {
      this.switchColor();
    }
  }

  switchColor() {
    this.colorIndex += 1;
  }

  changeElementBorderColor(target) {
    target.style.borderBottomColor = this.color;
  }

  reassignPrevTenant() {
    this.prevTenant = this.tenant;
  }

  hideTooltipAndDisableCursor(bar, index) {
    this.tooltips[index].style.visibility = 'hidden';
    bar.style.cursor = 'not-allowed';
  }

  get tenantSwitched() {
    return this.tenant !== this.prevTenant;
  }

  get roomIsNotVacant() {
    return this.tenant !== 'Vacant';
  }

  get color() {
    if (this.colorIndex >= colors.length) {
      this.colorIndex = 0;
    }
    return colors[this.colorIndex];
  }

  get index() {
    return this.data.get('index');
  }

  set index(value) {
    this.data.set('index', value);
  }

  get monthBars() {
    return this.monthBarTargets;
  }

  get tooltips() {
    return this.tooltipTargets;
  }
}
