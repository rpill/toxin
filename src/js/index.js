import 'normalize.css';

import '@/styles/styles.scss';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js$/));