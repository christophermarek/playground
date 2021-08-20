import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './Background.css';
const CoinGecko = require('coingecko-api');

interface cryptoPricesInterface {
  bitcoin: { usd: Number, cad: Number }
  etherum: { usd: Number, cad: Number }
  vechain: { usd: Number, cad: Number }
}

function App() {

  const CoinGeckoClient = new CoinGecko();

  const [cryptoPrices, setCryptoPrices] = useState<cryptoPricesInterface>();

  const getCryptoPrices = async () => {

    let res = await CoinGeckoClient.ping();
    console.log(res);
    let data = await CoinGeckoClient.simple.price({
      ids: ['bitcoin', 'ethereum', 'vechain'],
      vs_currencies: ['usd', 'cad'],
    });
    setCryptoPrices(data.data);
  };

  useEffect(() => {
    if (cryptoPrices === undefined) {
      getCryptoPrices();
    }
  });


  return (
    <div className="App">
      {/* <div>
        <div className='stars'></div>
        <div className='twinkling'></div>
        <div className='clouds'></div>
      </div> */}

      <div className='Header'>
        <p>The website of the future</p>
      </div>
      <div className='Body'>

      </div>

      {cryptoPrices !== undefined &&
        <>
          Crypto Prices
          <ul>
            {cryptoPrices.bitcoin !== undefined &&
              <li>BTC: USD {cryptoPrices.bitcoin.usd}  CAD {cryptoPrices.bitcoin.cad}</li>}
            {cryptoPrices.etherum !== undefined &&
              <li>ETH: USD {cryptoPrices.etherum.usd}  CAD {cryptoPrices.etherum.cad}</li>}
            {cryptoPrices.vechain !== undefined &&
              <li>VET: USD {cryptoPrices.vechain.usd}  CAD {cryptoPrices.vechain.cad}</li>}
          </ul>
        </>
      }



    </div>
  );
}

export default App;
