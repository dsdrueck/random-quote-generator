export default function DisplayQuote(props) {
  return (
    <div>
      <div>{JSON.stringify(props.quote.quote)}</div>
      <br />
      <div>
        {props.quote.author
          ? "― " +
            JSON.stringify(props.quote.author).slice(1, -1).replace("–", "")
          : ""}
      </div>
    </div>
  );
}
