import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinData from '../components/CoinData/CoinData';
import HistoryChart from '../components/HistoryChart/HistoryChart';
import coinGecko from '../apis/coinGecko';

const CoinDetailPage = () => {

  const { coin } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = data => {
    return data.map(el => ({ t: el[0], y: el[1].toFixed(2) }));
  }

  useEffect(() => {
    const fetchData = async () => {

      setIsLoading(true);

      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${coin}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '1'
          }
        }),

        coinGecko.get(`/coins/${coin}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '7'
          }
        }),

        coinGecko.get(`/coins/${coin}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '365'
          }
        }),

        coinGecko.get('/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: coin
          }
        })
      ]);

      // const resultsDay = await coinGecko.get(`/coins/${coin}/market_chart`, {
      //   params: {
      //     vs_currency: 'usd',
      //     days: '1'
      //   }
      // });

      setCoinData(
        {
          day: formatData(day.data.prices),
          week: formatData(week.data.prices),
          year: formatData(year.data.prices),
          detail: detail.data[0]
        });

      setIsLoading(false);
    }

    fetchData();

    // eslint-disable-next-line
  }, []);

  const renderData = () => {

    if (isLoading) {
      return (
        <div>
          Loading...
        </div>
      );
    } else {
      return (
        <div className="coinList">
          <HistoryChart
            data={coinData}
          />
          <CoinData />
        </div>
      );
    }
  }

  return renderData();
}

export default CoinDetailPage;