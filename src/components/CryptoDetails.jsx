import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Row,Col,Typography,Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, ContainerTwoTone } from '@ant-design/icons';
import { useGetCoinDetailsQuery,useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';

const {Title,Text}=Typography;
const {Option}=Select;

const CryptoDetails = () => {
  const {coinId}=useParams();
  
  const [timePeriod,setTimePeriod]=useState('7d');

  const {data,isFetching}=useGetCoinDetailsQuery(coinId);
  const {data:coinHistory}=useGetCryptoHistoryQuery({coinId,timePeriod});
  const cryptoDetails=data?.data?.coin;

  if(isFetching){return <Loader />;}
  
  console.log(coinHistory);

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
       <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>
            {cryptoDetails.name} live price in US Dollars.
            View value Statistics,Market Cap and Supply.
          </p>
       </Col>
       <Select
         defaultValue="7d"
         className="select-timeperiod"
         placeholder="Select Time Period"
         onChange={(value)=>setTimePeriod(value)}
       >
        {time.map((date)=><Option key={date}>{date}</Option>)}
       </Select>
       <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
       <Col className="stats-container">
          <Col className="coin-value-statistics">
             <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-detailes-heading">
                  {cryptoDetails.name} Value Statistics
                </Title>
                <p>
                   An Overview showing stats of {cryptoDetails.name}
                </p>
             </Col>
             {stats.map(({icon,title,value})=>(
               <Col className="coin-stats">
                  <Col className="coin-stats-name">
                     <Text>{icon}</Text>
                     <Title style={{ fontWeight: 'normal', marginLeft: '10px' }}>{title}</Title>
                  </Col>
                  <Text style={{ fontWeight: 'bold' }}>{value}</Text>
               </Col>
             ))}
            </Col>
            <Col className="other-stats-info">
             <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-detailes-heading">
                  Other Statistics
                </Title>
             </Col>
             {genericStats.map(({icon,title,value})=>(
               <Col className="coin-stats">
                  <Col className="coin-stats-name">
                     <Text>{icon}</Text>
                     <Title style={{ fontWeight: 'normal', marginLeft: '10px' }}>{title}</Title>
                  </Col>
                  <Text style={{ fontWeight: 'bold' }}>{value}</Text>
               </Col>
             ))}
            </Col>
       </Col>
       <Col className="coin-desc-link">
         <Col className="coin-links">
           <Title level={3} className="coin-details-heading">
             {cryptoDetails.name} Links
           </Title>
           {cryptoDetails.links.map((link)=>(
             <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">{link.type}</Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                   {link.name}
                </a>
             </Row>
           ))}
         </Col>
       </Col>
    </Col>
  )
}

export default CryptoDetails