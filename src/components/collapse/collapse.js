import './collapse.scss';

import $ from 'jquery';

$(() => {

  $('.js-collapse').each((index, node) => {
    const $collapseHeader = $(node).find('.js-collapse-header');

    $collapseHeader.on('click', () => {
      $(node).toggleClass('collapse_expanded');
    })
  });
});