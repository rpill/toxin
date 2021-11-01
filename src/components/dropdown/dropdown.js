import './dropdown.scss';

import 'item-quantity-dropdown/lib/item-quantity-dropdown.min';
import * as pluralRu from 'plural-ru';

$(() => {

  $('.js-dropdown').each((index, node) => {

    const dropdownOptions = JSON.parse(node.dataset.options);

    const { defaultText, plural } = dropdownOptions;

    const $buttonClear = $(node).find('.js-dropdown__clear');
    const $buttonApply = $(node).find('.js-dropdown__apply');

    const buttonsDecrement = {};

    $(node).iqDropdown({
      setSelectionText: (itemCount, totalItems) => {
        if(totalItems === 0) {
          return defaultText;
        }

        if(Array.isArray(plural)) {
          return totalItems + ' ' + pluralRu(totalItems, ...plural);
        }

        if(plural instanceof Object) {
          const items = Object.entries(itemCount).filter(([_, count]) => count !== 0);
          
          const itemsFormatted = items.reduce((acc, [id, count]) => {
            const string = count + ' ' + pluralRu(count, ...plural[id]);
            return [...acc, string];
          }, []);

          const stringFormatted = itemsFormatted.join(', ');

          return stringFormatted;
        }
      },
      onChange: (id, count, totalItems) => {
        if(count === 0) {
          $(buttonsDecrement[id]).addClass('is-disabled');
        } else {
          $(buttonsDecrement[id]).removeClass('is-disabled');
        }
      }
    });

    $(node).find('.iqdropdown-menu-option').each((index, node) => {
      const id = $(node).data('id');
      const $button = $(node).find('.button-decrement');

      buttonsDecrement[id] = $button;
      $button.addClass('is-disabled');
    });

    $buttonClear.on('click', (e) => {
      e.preventDefault();
    });

    $buttonApply.on('click', (e) => {
      e.preventDefault();
    });
  });
});