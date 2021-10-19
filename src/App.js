import "./App.css";
import Nav from "./components/Nav.js";
import EditDeleteQuote from "./components/EditDeleteQuote.js";
import CreateQuote from "./components/CreateQuote.js";
import { useState, useEffect } from "react";
import DisplayQuote from "./components/DisplayQuote.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
export async function getData() {
  const result = await (await fetch(url)).json();
  return result.quotes;
}
export function random(a) {
  return Math.floor(Math.random() * a.length);
}
export function enumerateQuotes(data) {
  return data.map((item, id) => ({
    id: id,
    quote: item.quote,
    author: item.author,
  }));
}

function App() {
  const [quotesData, updateQuotesData] = useState();
  const [quote, updateQuote] = useState({ quote: "", author: "" });
  const [previousData, updatePreviousData] = useState();
  const [currentPage, updateCurrentPage] = useState(1);
  const [showPage, updateShowPage] = useState(false);
  const [fetchingStatus, updateFetchingStatus] = useState(0);

  function myUseEffect() {
    getData()
      .then((result) => {
        updateQuotesData(enumerateQuotes(result));
        return enumerateQuotes(result);
      })
      .then((enumeratedResult) => {
        let r = random(enumeratedResult);
        updateQuote(enumeratedResult[r]);
        updatePreviousData([enumeratedResult[r]]);
        updateFetchingStatus(1);
      });
  }

  useEffect(() => myUseEffect(), []);

  // function logMyState() {
  //   console.log(
  //     "quotesData",
  //     quotesData,
  //     "quote",
  //     quote,
  //     "previousData",
  //     previousData,
  //     "currentPage",
  //     currentPage,
  //     "showPage",
  //     showPage
  //   );
  // }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <Nav />         */}
          <div className="hide-on-mobile">
            <Link to="/">Random Quote Generator</Link> |{" "}
            <Link to="/create">Create a new quote</Link> |{" "}
            <Link to="/delete">Edit/Delete a quote</Link>
            <hr />
          </div>

          <div className="hide-on-desktop">
            <ul>
              <li>
                <Link to="/">Random Quote Generator</Link>
              </li>
              <li>
                <Link to="/create">Create a new quote</Link>
              </li>
              <li>
                <Link to="/delete">Edit/Delete a quote</Link>
              </li>
            </ul>
            <hr />
          </div>

          <div>
            <Switch>
              <Route exact path="/">
                <DisplayQuote
                  quotesData={quotesData}
                  quote={quote}
                  previousData={previousData}
                  currentPage={currentPage}
                  showPage={showPage}
                  updateQuotesData={updateQuotesData}
                  updateQuote={updateQuote}
                  updatePreviousData={updatePreviousData}
                  updateCurrentPage={updateCurrentPage}
                  updateShowPage={updateShowPage}
                  random={random}
                />
              </Route>
              <Route path="/create">
                <CreateQuote
                  quotesData={quotesData}
                  updateQuotesData={updateQuotesData}
                  updateQuote={updateQuote}
                  updatePreviousData={updatePreviousData}
                />
              </Route>
              <Route path="/delete">
                <EditDeleteQuote
                  quote={quote}
                  previousData={previousData}
                  key={fetchingStatus}
                  quotesData={quotesData}
                  updateQuotesData={updateQuotesData}
                  updateQuote={updateQuote}
                  updatePreviousData={updatePreviousData}
                />
              </Route>
            </Switch>
            {/* <button onClick={() => logMyState()}>Log state to console</button> */}
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
