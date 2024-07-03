import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';

// Registering the components required for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title: AntTitle } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // as the data coing from api call has data from latest to oldest so we need to reverse it first then stre it in the array
  const historyReversed = coinHistory?.data?.history?.slice().reverse();

  // Ensure you are using milliseconds for Date conversion
  for (let i = 0; i < historyReversed?.length; i += 1) {
    coinPrice.push(historyReversed[i].price);
    coinTimestamp.push(new Date(historyReversed[i].timestamp * 1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Price: $${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <AntTitle level={2} className="chart-title">{coinName} Price Chart</AntTitle>
        <Col className="price-container">
          <AntTitle level={5} className="price-change"> Price Change:{coinHistory?.data?.change}%</AntTitle>
          <AntTitle level={5} className="current-price">Current {coinName} Price: ${currentPrice}</AntTitle>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
