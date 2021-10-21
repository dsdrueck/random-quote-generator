import { animateButton } from "../App";

export default function DisplayQuote({
  quotesData,
  quote,
  previousData,
  currentPage,
  showPage,
  updateQuotesData,
  updateQuote,
  updatePreviousData,
  updateCurrentPage,
  updateShowPage,
  random,
}) {
  function newQuote() {
    console.log("NEW QUOTE REQUEST");
    if (quotesData.length > 0) {
      let r = random(quotesData);
      let newQuote = quotesData[r];
      let copyPrevious = [...previousData, newQuote];
      let lastPage = currentPage;
      updateCurrentPage(lastPage + 1);
      updateQuote(newQuote);
      updatePreviousData(copyPrevious);
      updateShowPage(true);
      animateButton("display-quote-forward");
      console.log("quote", quote, "previousData", previousData);
    } else {
      updateCurrentPage(1);
      alert(
        "No quotes data available! Create one with the 'Create a new quote' menu"
      );
    }
  }

  function oldQuote() {
    console.log("OLD QUOTE REQUEST");
    if (previousData.length > 0) {
      let page = currentPage - 1;
      updateCurrentPage(page);
      let quoteToShow = previousData[page - 1];
      updateQuote(quoteToShow);
      animateButton("display-quote-back");
    } else {
      updateCurrentPage(1);
      alert(
        "No quotes data available! Create one with the 'Create a new quote' menu"
      );
    }
  }

  function nextQuote() {
    console.log("NEXT QUOTE REQUEST");
    if (previousData.length > 0) {
      let page = currentPage + 1;
      updateCurrentPage(page);
      let quoteToShow = previousData[page - 1];
      updateQuote(quoteToShow);
      animateButton("display-quote-forward");
    } else {
      alert(
        "No quotes data available! Create one with the 'Create a new quote' menu"
      );
    }
  }

  return (
    <div className="component-container">
      <h2>Random Quote Generator</h2>
      <div className="description">
        Use the buttons below to generate a new quote or go back to a previous
        quote.
      </div>
      <div className="quote-container">
        <i class="fas fa-quote-right fa-2x"></i>

        <div className="quote-text">
          {JSON.stringify(quote.quote).slice(1, -1)}
        </div>
        <br />
        <div>
          {quote.author
            ? "― " + JSON.stringify(quote.author).slice(1, -1).replace("–", "")
            : ""}
        </div>
      </div>
      <div>
        {currentPage > 1 ? (
          <button id="display-quote-back" onClick={() => oldQuote()}>
            <i class="fas fa-angle-left fa-2x"></i>
          </button>
        ) : (
          <button
            style={{ visibility: "hidden" }}
            id="display-quote-back"
            onClick={() => oldQuote()}
          >
            <i class="fas fa-angle-left fa-2x"></i>
          </button>
        )}
        <button
          id="display-quote-forward"
          onClick={() =>
            previousData.length <= currentPage ? newQuote() : nextQuote()
          }
        >
          <i class="fas fa-angle-right fa-2x"></i>
        </button>
      </div>
      {showPage ? <div className="page">Page {currentPage}</div> : ""}
    </div>
  );
}
