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
  const [timesClicked, setTimesClicked] = useState<number>(0);
  const [gameBoard, setGameBoard] = useState<number[][]>([]);

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

  //0 in the array is empty, 1 is populated
  const generateGame = (boardSize: number) => {
    let board = Array.from(Array(boardSize), _ => Array(boardSize).fill(0));
    setGameBoard(board);
  }

  const flipTile = (x: number, y: number) => {
    console.log(`x: ${x} y: ${y}`)
    let board = [...gameBoard];
    board[x][y] = gameBoard[x][y] === 0 ? 1 : 0;
    setGameBoard(gameBoard => board);
  }
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

      <p onClick={() => setTimesClicked(timesClicked + 1)}>Ive been clicked {timesClicked} times</p>

      <div className='oscillators'>
        <p>Game of life oscillators</p>
        <input type='button' value='Generate Game' onClick={() => generateGame(9)} />

        {
          gameBoard.map((column: any, index: any) => {
            return (
              <div className='row' key={column + index}>
                {
                  column.map((i: any, j: any) => 
                    <div key={index+j} className={`cube ${gameBoard[index][j] === 0 ? 'white' : 'black'}`} onClick={() => flipTile(index, j)}/>
                  ) 
                }
              </div>
            ) 
          })
        }
      </div>

    </div>
  );
}

export default App;
