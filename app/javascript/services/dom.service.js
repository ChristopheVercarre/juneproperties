/* eslint no-use-before-define: ["error", { "functions": false }] */

export const getElement = id => document.getElementById(id);

export const showElement = (element, display) => {
  element.style.display = display;
};

export const hideElement = element => {
  element.style.display = 'none';
};

export const clearElement = element => {
  element.innerHTML = '';
};

export const updateElement = (element, content) => {
  element.innerHTML = content;
};

export const updateParentElement = (
  element,
  content,
  position = 'beforeend'
) => {
  element.parentElement.insertAdjacentHTML(position, content);
};

export const enableElement = element => {
  element.disabled = false;
  const newClasses = [];
  element.classList.forEach(klass => {
    if (klass !== 'disabled') newClasses.push(klass);
  });
  element.className = newClasses.join(' ');
};

export const disableElement = element => {
  element.disabled = true;
  element.classList.add('disabled');
};

export const createElement = (tagName, content, callbacks) => {
  if (!tagName && !isString(tagName)) {
    throw new Error('tagName string not provided!');
  }

  const el = document.createElement('div');

  if (content && isString(content)) {
    el.innerHTML = content;
  }

  if (callbacks) {
    if (isArray(callbacks)) {
      callbacks.forEach(({ eventName, callback }) => {
        el.addEventListener(eventName, () => callback());
      });
    } else {
      const { eventName, callback } = callbacks;
      el.addEventListener(eventName, () => callback());
    }
  }

  return el;
};

function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

const styles = getComputedStyle(document.documentElement);

export const breakpoints = {
  xs: styles.getPropertyValue('--breakpoint-xs'),
  sm: styles.getPropertyValue('--breakpoint-sm'),
  md: styles.getPropertyValue('--breakpoint-md'),
  lg: styles.getPropertyValue('--breakpoint-lg'),
  xl: styles.getPropertyValue('--breakpoint-xl')
};

export const getActiveBreakpoints = () => {
  return Object.keys(breakpoints).filter(
    // eslint-disable-next-line radix
    key => window.innerWidth > parseInt(breakpoints[key])
  );
};
