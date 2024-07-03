import React,{useState} from 'react';
import { Select,Typography,Row,Col,Avatar,Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCoinsQuery } from '../services/cryptoApi';
import Loader from './Loader';
const {Text,Title}=Typography;
const {Option}=Select;

const demoImage='https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const styles = {
  newsCard: {
    minHeight: '300px',
  },
  newsImageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsTitle: {
    width: '70%',
  },
  newsImage: {
    width: '90px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
};


const News = ({simplified}) => {
  const [newsCount, setNewsCount] = useState(simplified ? 6 : 12); // to get news count
  const [newsCategory,setNewsCategory]=useState('Cryptocurrency')
  const {data:cryptoNews,count}=useGetCryptoNewsQuery({keyword:newsCategory});
  const {data}=useGetCoinsQuery(100);


  console.log(cryptoNews);

  if(!cryptoNews?.items){return <Loader />;}

  const displayedNews = cryptoNews.items.slice(0, newsCount);

  return (
          <Row gutter={[24,24]}>
          {/* this is only fitlering out the news of selected cryptocurrency*/}
             {!simplified && (
                 <Col span={24}>
                     <Select
                      showSearch
                      className="select-news"
                      placeholde="Select a Crypto"
                      optionFilterProp="children"
                      onChange={(value)=> setNewsCategory(value)}
                      filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >=0}  
                     >
                         <Option value="Cryptocurrency">Cryptocurrency</Option>
                         {data?.data?.coins.map((coin)=> (<Option value={coin.name}>{coin.name}</Option>))}
                     </Select>
                 </Col>
             )}
             {displayedNews.map((news,i)=>(
               <Col xs={24} sm={12} lg={6} key={i}>
                 <Card hoverable className="news-card" style={styles.newsCard}>
                     <a href={news.newsUrl} target="_blank" rel="noreferrer">
                        <div className="news-image-container" style={styles.newsImageContainer}>
                            <Title className="news-title" level={4} style={styles.newsTitle}>{news.title}</Title>
                            <img src={news?.images?.thumbnailProxied || demoImage} alt="news" style={styles.newsImage}/>
                        </div>
                        <p>
                          {news.snippet > 100 ? `${news.snippet.substring(0,100)} ...`:news.snippet}
                        </p>
                     </a>
                 </Card>
               </Col>
             ))}
          </Row>
  )
}

export default News