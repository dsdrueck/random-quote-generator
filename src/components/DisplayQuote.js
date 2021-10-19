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
    } else {
      alert(
        "No quotes data available! Create one with the 'Create a new quote' menu"
      );
    }
  }

  return (
    <div>
      <div>{JSON.stringify(quote.quote)}</div>
      <br />
      <div>
        {quote.author
          ? "― " + JSON.stringify(quote.author).slice(1, -1).replace("–", "")
          : ""}
      </div>
      <div>
        {currentPage > 1 && <button onClick={() => oldQuote()}>←</button>}
        <button
          onClick={() =>
            previousData.length <= currentPage ? newQuote() : nextQuote()
          }
        >
          →
        </button>
      </div>
      {showPage ? <div className="page">Page {currentPage}</div> : ""}
    </div>
  );
}
