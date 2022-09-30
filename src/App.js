import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [coinPrice, setCoinPrice] = useState("");
  const selectChange = (event) => {
    setCoinPrice(event.target.value);
    setPrice(0);
    setQuantity(0);
  };
  const onPrice = (event) => {
    if (coinPrice === "") {
      alert("Please select a coin.");
      return;
    }
    setPrice(event.target.value);
    setQuantity(price / coinPrice);
  };
  return (
    <div className="App">
      <h1>The Conins! {loading ? "" : `(${coins.length})`} </h1>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={selectChange}>
          <option>select coin</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
      <div>
        <input
          value={price}
          onChange={onPrice}
          type="number"
          placeholder="price.."
        />
        <br />
        Quantity
        <br />
        <input value={quantity} type="number" disabled />
      </div>
    </div>
  );
}

export default App;
