import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';

import CoinDetailPage from '../../pages/CoinDetailPage';
import CoinSummaryPage from '../../pages/CoinSummaryPage';

import Header from '../Header/Header';
import { WatchListContextProvider } from '../../context/watchListContext';

function App() {
  return (
    <div className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={CoinSummaryPage} />

          <Route exact path="/coindetail" component={CoinDetailPage} />
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
