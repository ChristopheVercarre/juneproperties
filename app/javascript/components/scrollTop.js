import $ from 'jquery';

export default () => {
  // declare variable
  const scrollTop = $('.scrollTop');

  $(window).scroll(() => {
    // declare variable
    const topPos = $(this).scrollTop();

    // if user scrolls down - show scroll to top button
    if (topPos > 100) {
      $(scrollTop).css('opacity', '.5');
    } else {
      $(scrollTop).css('opacity', '0');
    }
  }); // scroll END

  // Click event to scroll to top
  $(scrollTop).click(() => {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      1000
    );
    return false;
  });
};
