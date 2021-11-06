import './header.scss';

import $ from 'jquery';

$(() => {
  let $body = $('body');
  let $menu = $('.js-menu');

  $('.js-menu-open').on('click', () => {
    $body.addClass('menu-opened');
    $menu.addClass('menu_opened');
  });
});