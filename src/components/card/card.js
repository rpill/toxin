import './card.scss';

import 'swiper/css';
import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

$(() => {
  $('.js-card-slider').each((index, node) => {
    const $swiper = $(node).find('.swiper');
    const $pagination = $swiper.find('.js-card-slider__pagination');
    const $buttonPrev = $swiper.find('.js-card-slider__button-prev');
    const $buttonNext = $swiper.find('.js-card-slider__button-next');

    new Swiper($swiper[0], {
      loop: true,
      spaceBetween: 0,
      pagination: {
        el: $pagination[0],
        clickable: true
      },
      navigation: {
        nextEl: $buttonNext[0],
        prevEl: $buttonPrev[0],
      },
    });
  });
});
