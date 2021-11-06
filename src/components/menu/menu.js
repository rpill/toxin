import './menu.scss';

import $ from 'jquery';

$(() => {
  let $body = $('body');
  let $menu = $('.js-menu');

  $('.js-menu-close').on('click', () => {
    $body.removeClass('menu-opened');
    $menu.removeClass('menu_opened');
  });
});