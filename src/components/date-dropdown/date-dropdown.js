import './date-dropdown.scss';

import 'air-datepicker/air-datepicker.css';

import $ from 'jquery';
import AirDatepicker from 'air-datepicker';

$(() => {

  const buttonApply = {
    content: 'Применить',
    className: 'air-datepicker-button',
    onClick: (dp) => {
        dp.hide();
    }
  }
  
  const defaultOptions = {
    classes: '-custom-',
    range: true,
    toggleSelected: false,
    multipleDatesSeparator: ' - ',
    navTitles: {
        days: '<i>MMMM</i> <i>yyyy</i>'
    },
    prevHtml: '',
    nextHtml: '',
    minDate: new Date(),
    buttons: ['clear', buttonApply]
  }

  const initSingleDatepicker = ($container, defaultOpt) => {
    const $input = $container.find('.js-date-dropdown__input-from-to input');

    const options = {
      dateFormat: 'd MMM',
      onSelect() {
        const currentValue = $input.val();
        $input.val(currentValue.toLowerCase());
      }
    }

    const dp = new AirDatepicker($input[0], {...defaultOpt, ...options});
  }

  const initDoubleDatepicker = ($container, defaultOpt) => {
    const $inputFrom = $container.find('.js-date-dropdown__input-from input');
    const $inputTo = $container.find('.js-date-dropdown__input-to input');

    const options = {
      onSelect({datepicker}) {
        const dateTo = datepicker.rangeDateTo;
        if(dateTo) {
          const dateToFormatted = dateTo.toLocaleDateString("ru-RU");
          $inputTo.val(dateToFormatted);
        } else {
          $inputTo.val('');
        }
      }
    }

    const dp = new AirDatepicker($inputFrom[0], {...defaultOpt, ...options});

    $inputTo.on('click focus', () => {
      dp.show();
    });
  }

  $('.js-date-dropdown').each((index, node) => {
    const type = $(node).data('type');

    if(type === 'single') {
      initSingleDatepicker($(node), defaultOptions);
    } else {
      initDoubleDatepicker($(node), defaultOptions);
    }
  });
});