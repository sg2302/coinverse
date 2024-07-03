import React,{useState,useEffect} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card,Row,Col,Input } from 'antd';
import Loader from './Loader';
import {useGetCoinsQuery } from '../services/cryptoApi'; //api request to get coins data


const Cryptocurrencies = ({simplified}) => {
  
  const count =simplified ? 10:100;
  const {data:cryptosList,isFetching}=useGetCoinsQuery(count); // here we renamed data from cryptos api to cryptos list
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm,setSearchTerm]=useState('');

  useEffect(() => {
    const filteredData=cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [cryptosList,searchTerm]);

  // Inline style for specific adjustments as the css made in file were not working
  const imageStyle = {
    width: '45px',
    height: '45px',
    objectFit: 'contain',
  };
  

  if(isFetching){return <Loader />;}

  return (
    <>
       {/* as simplified is false then we are in show more of cryptocurrencies and then only we want the search menu*/}
       {!simplified && (
        <div className="search-crypto">
            <Input placeholder="Search CryptoCurrency" onChange={(e)=>setSearchTerm(e.target.value)} />
       </div>
       )}
       
      <Row gutter={[32,32]} className="crypto-card-container" >  {/* gutters are used for spacing between each row [32,32] means 32 px from top and botttom and 32px from left and right*/}
          {cryptos?.map((currency)=>(
            <Col xs={24} sm={12} lg={6} className="cryto-card" key={currency.uuid}>
               <Link to={`/crypto/${currency.uuid}`}> {/* made the link dynamic by mapping coins to there unique uuid*/}
                  <Card 
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className="crypto-image" src={currency.iconUrl} style={imageStyle} />}
                  hoverable
                  >
                   <p>Price: {millify(currency.price)}</p>
                   <p>Market Cap: {millify(currency.marketCap)}</p>
                   <p>Daily Change: {millify(currency.change)}%</p>
                  </Card>
               </Link>
            </Col>
          ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies