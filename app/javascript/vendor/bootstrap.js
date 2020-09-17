import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/toast';
import 'bootstrap';

// eslint-disable-next-line no-undef
$('.toast').toast('show');

window.addEventListener('turbolinks:load', () => {
  const dropdownMenuContents = document.querySelectorAll(
    '.dropdown-menu *:not(.dropdown-link)'
  );

  // eslint-disable-next-line no-undef
  $('.toast').toast();
  // eslint-disable-next-line no-undef
  $('.toast').toast('show');

  dropdownMenuContents.forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
    });
  });
});

const styles = getComputedStyle(document.documentElement);

export default {
  primary: styles.getPropertyValue('--primary'),
  secondary: styles.getPropertyValue('--secondary'),
  success: styles.getPropertyValue('--success'),
  warning: styles.getPropertyValue('--warning'),
  danger: styles.getPropertyValue('--danger'),
  info: styles.getPropertyValue('--info'),
  light: styles.getPropertyValue('--light'),
  dark: styles.getPropertyValue('--dark'),
  white: styles.getPropertyValue('--white'),
  black: styles.getPropertyValue('--black'),
  gray: styles.getPropertyValue('--gray')
};
