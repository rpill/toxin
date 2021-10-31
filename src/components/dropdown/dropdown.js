import './dropdown.scss';

import 'item-quantity-dropdown/lib/item-quantity-dropdown.min';
import * as pluralRu from 'plural-ru';

$(() => {

  $('.js-dropdown').each((index, node) => {

    const dropdownOptions = JSON.parse(node.dataset.options);

    const { defaultText, plural } = dropdownOptions;

    const $buttonClear = $(node).find('.js-dropdown__clear');
    const $buttonApply = $(node).find('.js-dropdown__apply');

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
      beforeDecrement: (id, itemCount) => {
        return true;
      },
      beforeIncrement: (id, itemCount) => {
        return true;
      }
    });

    $buttonClear.on('click', (e) => {
      e.preventDefault();
    });

    $buttonApply.on('click', (e) => {
      e.preventDefault();
    });
  });
});