import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
async function getData() {
  const result = await (await fetch(url)).json();
  return result.quotes;
}

function App() {
  const [quotesData, updateQuotesData] = useState();
  const [quote, updateQuote] = useState();
  const [previousData, updatePreviousData] = useState();
  const [currentPage, updateCurrentPage] = useState(1);

  function random(a) {
    return Math.floor(Math.random() * a.length);
  }
  useEffect(() => {
    getData().then((result) => {
      updateQuotesData(result);
      let r = random(result);
      updateQuote(result[r]);
      updatePreviousData([result[r]]);
    });
  }, []);

  function newQuote() {
    console.log("NEW QUOTE REQUEST");
    let r = random(quotesData);
    let newQuote = quotesData[r];
    let copyPrevious = [...previousData, newQuote];
    let lastPage = currentPage;
    updateCurrentPage(lastPage + 1);
    updateQuote(newQuote);
    updatePreviousData(copyPrevious);
    console.log("quote", quote, "previousData", previousData);
  }

  function oldQuote() {
    console.log("OLD QUOTE REQUEST");
    let page = currentPage - 1;
    updateCurrentPage(page);
    let quoteToShow = previousData[page - 1];
    updateQuote(quoteToShow);
  }

  function nextQuote() {
    console.log("NEXT QUOTE REQUEST");
    let page = currentPage + 1;
    updateCurrentPage(page);
    let quoteToShow = previousData[page - 1];
    updateQuote(quoteToShow);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Quote Generator</h1>
        <div>{JSON.stringify(quote)}</div>
        <div>Page: {currentPage}</div>
        <div>
          {currentPage > 1 && <button onClick={() => oldQuote()}>←</button>}
          <button
            onClick={() =>
              previousData.length === currentPage ? newQuote() : nextQuote()
            }
          >
            →
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
