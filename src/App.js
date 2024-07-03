import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, CryptoDetails, Cryptocurrencies, News, Homepage } from './components'; // this imports all components which are in components folder
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes> {/* Routes component from react-router-dom allows to have multiple routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} /> {/* colon means that the route would be dynamic and different for different coinId */}
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
      

      <div className="footer">
          <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
            Coinverse <br />
            All Rights Reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
          </div>
      </div>
    </div>
  )
}

export default App;
