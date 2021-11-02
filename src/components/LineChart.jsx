import React from 'react';
import { Line } from 'react-chartjs-2';


const LineChart = ({ coinHistory}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory.length; i += 1) {
    coinPrice.push(coinHistory[i].priceUsd);
  }

  for (let i = 0; i < coinHistory.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory[i].time).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};


export default LineChart