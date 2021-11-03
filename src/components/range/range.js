import './range.scss';
import 'nouislider/dist/nouislider.css';

import $ from 'jquery';
import * as noUiSlider from 'nouislider';

$(() => {
  const numberFormatOptions = {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  };

  const numberFormat = new Intl.NumberFormat('ru-RU', numberFormatOptions);

  const defaultOptions = {
    connect: true,
    format: {
      to: (value) => {
        return numberFormat.format(value);
      },
      from: (value) => {
        return value.replace(' ₽', '');
      }
    },
  };

  $('.js-range').each((index, node) => {

    const rangeValues = [
      node.querySelector('.js-range__value-start'),
      node.querySelector('.js-range__value-end')
    ];

    const rangeSlider = node.querySelector('.js-range__slider');
    const sliderOptions = JSON.parse(rangeSlider.dataset.options);

    noUiSlider.create(rangeSlider, {...defaultOptions, ...sliderOptions});

    rangeSlider.noUiSlider.on('update', (values, handle) => {
      rangeValues[handle].innerHTML = values[handle];
    });
  });
});