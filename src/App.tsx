import React, { useEffect, useState } from 'react';
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
  const [started, setStarted] = useState(false);
  const [pageSelected, setPageSelected] = useState<string>('home');

  const tokenName = 'Example Token'


  useEffect(() => {
    let interval: any = null;
    if (started) {
      interval = setInterval(() => {
        simulationLoop();
      }, 1000);
    } else if (!started) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started]);

  function simulationLoop() {
    let boardCopy = [...gameBoard];
    //go through each board element
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        let numNeighbours = 0;
        if (gameBoard[i - 1] && gameBoard[i - 1][j - 1] === 1) {
          numNeighbours += 1;
        }
        if (gameBoard[i - 1] && gameBoard[i - 1][j] === 1) {
          numNeighbours += 1;
        }
        if (gameBoard[i - 1] && gameBoard[i - 1][j + 1] === 1) {
          numNeighbours += 1;
        }

        if (gameBoard[i] && gameBoard[i][j - 1] === 1) {
          numNeighbours += 1;
        }
        if (gameBoard[i] && gameBoard[i][j + 1] === 1) {
          numNeighbours += 1;
        }

        if (gameBoard[i + 1] && gameBoard[i + 1][j - 1] === 1) {
          numNeighbours += 1;
        }
        if (gameBoard[i + 1] && gameBoard[i + 1][j] === 1) {
          numNeighbours += 1;
        }
        if (gameBoard[i + 1] && gameBoard[i + 1][j + 1] === 1) {
          numNeighbours += 1;
        }

        //Any live cell with two or three live neighbours survives.
        if (gameBoard[i][j] === 1 && (numNeighbours === 2 || numNeighbours === 3)) {
          boardCopy[i][j] = 1;
        } else {
          //All other live cells die in the next generation. Similarly, all other dead cells stay dead.
          boardCopy[i][j] = 0;
        }
        //Any dead cell with three live neighbours becomes a live cell.
        if (gameBoard[i][j] === 0 && numNeighbours === 3) {
          boardCopy[i][j] = 1;
        }


      }
    }
    setGameBoard(gameBoard => boardCopy);
  }
  const getCryptoPrices = async () => {

    let res = await CoinGeckoClient.ping();
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
      <div className='nav'>
        <input type='button' value='home' onClick={() => setPageSelected('home')} />
        <input type='button' value='page2' onClick={() => setPageSelected('page2')} />

      </div>
      <div className='Body'>

        {pageSelected === 'home' &&
          <>
            <p>Home</p>
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
              <p>Game of life</p>
              <input type='button' value='Generate Game' onClick={() => generateGame(9)} />
              <input type='button' value={`${!started ? 'Start' : 'Pause'} Game`} onClick={() => setStarted(!started)} />
              {
                gameBoard.map((column: any, index: any) => {
                  return (
                    <div className='row' key={column + index}>
                      {
                        column.map((i: any, j: any) =>
                          <div key={index + j} className={`cube ${gameBoard[index][j] === 0 ? 'white' : 'black'}`} onClick={() => flipTile(index, j)} />
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          </>
        }
        {pageSelected === 'page2' &&
          <>
            <p>Welcome to page2</p>
            <p>{tokenName} page</p>
          </>
        }
      </div>



    </div>
  );
}

export default App;
