import { useState } from "react";

export default function CreateQuote(props) {
  const [authorInput, updateAuthorInput] = useState();
  const [quoteInput, updateQuoteInput] = useState();

  function getNewUniqueId() {
    if (props.quotesData.length !== 0) {
      return props.quotesData[props.quotesData.length - 1].id * 1 + 1;
    } else {
      return 0;
    }
  }

  function submitCreateQuote() {
    {
      console.log("SUBMIT CREATE QUOTE ACTION");
      if (quoteInput && authorInput) {
        let id = getNewUniqueId();
        let copy = [...props.quotesData];
        console.log(
          "id",
          id,
          "authorInput",
          authorInput,
          "quoteInput",
          quoteInput
        );
        props.updateQuotesData([
          ...copy,
          { id: id, quote: quoteInput, author: authorInput },
        ]);
        updateQuoteInput("");
        updateAuthorInput("");
        document.getElementById("create-quote").value = "";
        document.getElementById("create-author").value = "";
      } else {
        alert(
          "Submit failed! Make sure to complete the 'quote' and 'author' fields before submitting."
        );
      }
    }
  }

  return (
    <div>
      <div>Add a new quote to the list</div>
      <div>
        Quote:{" "}
        <input
          id="create-quote"
          onChange={(e) => updateAuthorInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submitCreateQuote();
            }
          }}
        ></input>
      </div>
      <div>
        Author:{" "}
        <input
          id="create-author"
          onChange={(e) => updateQuoteInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submitCreateQuote();
            }
          }}
        ></input>
      </div>
      <button onClick={() => submitCreateQuote()}>Submit</button>
    </div>
  );
}
