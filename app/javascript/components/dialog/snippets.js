export const confirmHTML = message => {
  return `
    <button
      class="btn--success"
    >
      ${message}
    </button>
  `;
};

export const dismissHTML = message => {
  return `
    <button
      class="btn--gray"
    >
      ${message}
    </button>
  `;
};

export const modalHTML = message => {
  return `
    <div class="modal open">
      <div
        class="modal__backdrop"
      ></div>
      <div class="modal__content--alert">
        <div class="modal__main">
          <div class="modal__body">
            <p>${message}</p>
          </div>
          <div class="modal__footer--content-c">
          </div>
        </div>
      </div>
    </div>
  `;
};
