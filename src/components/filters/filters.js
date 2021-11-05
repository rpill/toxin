import './filters.scss';

import $ from 'jquery';

$(() => {

  $('.js-filters').each((index, node) => {
    const $filtersHeader = $(node).find('.js-filters__header');

    $filtersHeader.on('click', () => {
      $(node).toggleClass('filters_expanded');
    })
  });
});