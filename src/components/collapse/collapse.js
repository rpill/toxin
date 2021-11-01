import './collapse.scss';

$(() => {

  $('.js-collapse').each((index, node) => {
    const $collapseHeader = $(node).find('.js-collapse-header');

    $collapseHeader.on('click', (e) => {
      $(node).toggleClass('collapse_expanded');
    })
  });
});