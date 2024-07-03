import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useGetCoinsQuery, useGetCoinDetailsQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCoinsQuery(50); // Fetch top 50 coins
  const coinsList = data?.data?.coins;
  const [activePanel, setActivePanel] = useState(null);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Cryptocurrency</Col>
        <Col span={6}>Price</Col>
        <Col span={6}>Market Cap</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Collapse activeKey={activePanel} onChange={setActivePanel}>
        {coinsList.map((coin) => (
          <Panel
            key={coin.uuid}
            header={
              <Row key={coin.uuid}>
                <Col span={6}>
                  <Text><strong>{coin.rank}.</strong></Text>
                  <Avatar className="exchange-image" src={coin.iconUrl} />
                  <Text><strong>{coin.name}</strong></Text>
                </Col>
                <Col span={6}>${millify(coin.price)}</Col>
                <Col span={6}>{millify(coin.marketCap)}</Col>
                <Col span={6}>{millify(coin.change)}%</Col>
              </Row>
            }
          >
            <CoinDetail coinId={coin.uuid} />
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

const CoinDetail = ({ coinId }) => {
  const { data, isFetching } = useGetCoinDetailsQuery(coinId);
  const coinDetail = data?.data?.coin;

  if (isFetching) return 'Loading...';

  return (
    <div>
      {coinDetail?.description ? coinDetail.description : 'No description available'}
    </div>
  );
};

export default Exchanges;
