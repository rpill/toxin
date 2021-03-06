import './input.scss';

import $ from 'jquery';
import Inputmask from 'inputmask';

$(() => {
  $('.js-input [data-mask]').each((index, node) => {
    const mask = $(node).data('mask');
    Inputmask({ 
      mask, 
      showMaskOnHover: false, 
      showMaskOnFocus: false 
    }).mask(node);
  });
});