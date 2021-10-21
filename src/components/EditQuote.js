import { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

function haveSameData(obj1, obj2) {
  const obj1Length = Object.keys(obj1).length;
  const obj2Length = Object.keys(obj2).length;

  if (obj1Length === obj2Length) {
    return Object.keys(obj1).every(
      (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
    );
  }
  return false;
}

export default function EditQuote(props) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onQuickFilterChanged = () => {
    gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };
  const onRemoveSelected = () => {
    const selectedRowData = gridApi.getSelectedRows();
    console.log(selectedRowData);
    gridApi.applyTransaction({ remove: selectedRowData });

    let filteredQuotesData = [...props.quotesData];
    let filteredPreviousData = [...props.previousData];
    for (const key in selectedRowData) {
      if (haveSameData(props.quote, selectedRowData[key])) {
        props.updateQuote({ quote: "", author: "" });
      }
      for (const key2 in props.previousData) {
        if (haveSameData(props.previousData[key2], selectedRowData[key])) {
          console.log(
            "haveSameData!",
            "props.previousData[key2], selectedRowData[key]",
            props.previousData[key2],
            selectedRowData[key]
          );
          filteredPreviousData = filteredPreviousData.filter(
            (item) => !haveSameData(item, selectedRowData[key])
          );
        }
      }

      filteredQuotesData = filteredQuotesData.filter(
        (item) => item !== selectedRowData[key]
      );
    }
    props.updateQuotesData(filteredQuotesData);
    props.updatePreviousData(filteredPreviousData);
  };

  function isFirstColumn(params) {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  return (
    <div className="component-container">
      <h2>Edit</h2>
      <div className="description">
        Use the table below to edit a quote. Left click into a field to begin
        editing. Select the tickbox to the left of a quote to delete it, then
        press the 'delete selected rows' button below. quote.
      </div>
      <div className="before-grid">
        <input
          type="text"
          onInput={() => onQuickFilterChanged()}
          id="quickFilter"
          placeholder="Quick filter..."
        />
      </div>
      <div id="edit-grid" className="ag-theme-alpine-dark">
        <AgGridReact
          defaultColDef={{
            flex: 1,
            minWidth: 49,
            resizable: true,
            headerCheckboxSelection: isFirstColumn,
            checkboxSelection: isFirstColumn,
          }}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          rowSelection={"multiple"}
          rowData={props.quotesData}
        >
          <AgGridColumn
            headerName="ID"
            field="id"
            maxWidth={"62"}
          ></AgGridColumn>
          <AgGridColumn
            field="quote"
            minWidth={"500"}
            editable={true}
            singleClickEdit={true}
            stopEditingWhenCellsLoseFocus={true}
          ></AgGridColumn>
          <AgGridColumn
            field="author"
            minWidth={"135"}
            maxWidth={"185"}
            editable={true}
            singleClickEdit={true}
            stopEditingWhenCellsLoseFocus={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>

      <div>
        <button onClick={() => onRemoveSelected()}>Delete selected rows</button>
      </div>
    </div>
  );
}
