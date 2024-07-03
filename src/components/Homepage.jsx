import React from 'react'
import millify from 'millify'
import { Typography,Row,Col,Statistic } from 'antd'
import {Link} from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies,News} from '../components';
import Loader from './Loader';

const {Title}=Typography; // as we need to use typography for a lot of time here

const Homepage = () => {

  const {data,isFetching}=useGetCryptosQuery();
  const globalStats=data?.data; // this fetches data from rapid api/globalstats and displays the data on the webpage
  if(isFetching) return <Loader />;


  return (
    <>
        <Title level={2} className="heading">Global Cryptocurrency Statistics</Title>
        <Row>
            <Col span={12}><Statistic title="Total Cryptocurrencies" value={millify(globalStats.totalCoins)} /></Col>  {/* here span=12 means in antd there are total 24 spans which means it takes half the screen width ,used millify here to make numeric data more readable by not writing exact number*/}
            <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
            <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
            <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume) } /></Col>
            <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
        </Row>
        <div className="home-heading-container">
            <Title level={2} className="home-title">Top 10 Cryptocurrencies in the World!</Title>
            <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
        </div>
        <Cryptocurrencies simplified />
        <div className="home-heading-container">
            <Title level={2} className="home-title">Latest Crypto News</Title>
            <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
        </div>
        <News simplified />
    </>
  )
}

export default Homepage