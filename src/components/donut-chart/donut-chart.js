import './donut-chart.scss';

import $ from 'jquery';
import Chart from 'chart.js/auto';

$(() => {

  const data = {
    labels: [
      'Удовлетворительно',
      'Хорошо',
      'Великолепно'
    ],
    datasets: [{
      label: 'Впечатления от номера',
      data: [65, 65, 130],
      backgroundColor: [
        '#B39EFE',
        '#6FD0A0',
        '#FFD09C'
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    cutout: '90%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      hover: {
        mode: null
      }
    }
  }

  const config = {
    type: 'doughnut',
    data: data,
    options: options
  };

  $('.js-donut-chart').each((index, node) => {
    new Chart(node, config);
  });
});