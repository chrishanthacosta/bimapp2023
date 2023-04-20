import { gdiv } from "../../utils/js-utils/jsutils-creation";
import { gbtn } from "../../utils/js-utils/jsutils-creation";
import {
  getRowInputHeaderDiv,
  getRowInputRowDiv,
} from "../../utils/row-input-utils/row-input-utils";

export const xRowInputGenericRenderer = (
  metadata,
  data,
  headerElementRefs,
  rowInput,
  entityBrowserOptions = {}
) => {
  //handle entity browser handling
  if (Object.keys(entityBrowserOptions).length > 0) {
    SetupEntityBrowser(
      metadata,
      data,
      headerElementRefs,
      rowInput,
      entityBrowserOptions = {}
    );
    return
  }
  console.log("RowInputGenericRenderer ");
  const rows = [];
  const odiv = gdiv([], {
    css: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "Gainsboro",
      alignItems: "flex-start",
    },
  });
  //add header
  const hd = getRowInputHeaderDiv(metadata);
  odiv.appendChild(hd);
  //add cols

  for (let index = 0; index < data.length; index++) {
    const row = data[index];
    // console.log("row", row);
    const res = getRowInputRowDiv(row, metadata, headerElementRefs);
    const curRowDiv = res[0];
    //add controls div
    const cdiv = gdiv([], {
      css: {
        display: "flex",
        //   flexDirection:"column",
        justifyContent: "space-between",
      },
    });

    const btnAddRow = gbtn("+", [], {
      border: "none",
      backgroundColor: "LawnGreen",
    });
    btnAddRow.curRowDiv = curRowDiv;
    btnAddRow.metadata = metadata;
    btnAddRow.rows = rows;
    btnAddRow.headerElementRefs = headerElementRefs;
    btnAddRow.rowInput = rowInput;
    btnAddRow.addEventListener("click", addRowPrevious);

    cdiv.appendChild(btnAddRow);
    //handle del column
    const btnDelRow = gbtn("-", [], {
      border: "none",
      backgroundColor: "LightCoral",
    });
    btnDelRow.addEventListener("click", removeCurrentDivAndRow);
    btnDelRow.curRowDiv = curRowDiv;
    btnDelRow.rows = rows;
    btnDelRow.rowInput = rowInput;

    cdiv.appendChild(btnDelRow);
    curRowDiv.appendChild(cdiv);
    odiv.appendChild(curRowDiv);
    rows.push({ elementRefs: res[1] });
  }

  //add controls div
  const btnAddRowLast = gbtn("+ row at end..", [], {
    height: "1.5rem",
    textAlign: "center",
    padding: "0px",
    width: "100%",
  });

  btnAddRowLast.metadata = metadata;
  btnAddRowLast.outerDiv = odiv;
  btnAddRowLast.rows = rows;
  btnAddRowLast.headerElementRefs = headerElementRefs;
  btnAddRowLast.rowInput = rowInput;

  btnAddRowLast.addEventListener("click", addRowLast);
  odiv.appendChild(btnAddRowLast);

  //bind if any outbound events are defined in model

  const metadataKeys = Object.keys(metadata);
  metadataKeys.forEach((metadatakey) => {
    const metadataProp = metadata[metadatakey];
    if (metadataProp.headerFieldToUpdateSum) {
      // now bind an event to cal total to each column in grid
      //console.log("column",columns)
      rows.forEach((row) => {
        const input = row.elementRefs[metadatakey];
        input.rows = rows;
        input.outboundEventReceiver =
          headerElementRefs[metadataProp.headerFieldToUpdateSum];
        input.columnNameToSum = metadatakey;
        //console.log("columnNameToSum", metadatakey);
        input.addEventListener("input", outboundEventHandler);
        //console.log("e added")
      });
    }
  });

  return [odiv, rows];
};

const xoutboundEventHandler = (e) => {
  //console.log("outboundEventHandler");
  const outboundEventReceiver = e.target.outboundEventReceiver;
  const rows = e.target.rows;
  let total = 0;
  const columnNameToSum = e.target.columnNameToSum;
  rows.forEach((row) => {
    const input = row.elementRefs[columnNameToSum];
    //console.log("columnNameToSum", columnNameToSum);
    //console.log("input.value", input.value);
    total += parseFloat(input.value ?? 0);
  });
  outboundEventReceiver.value = total;
  const eventOutBound = new Event("input");
  outboundEventReceiver.dispatchEvent(eventOutBound);
};

const xaddRowLast = async (e) => {

  let data;

  if (e.target.showEntityBrowser) {
    await showEntityBrowser();
    //then communicate over rxjs subject
    return;
  }
  const res = getRowInputRowDiv(
    data,
    e.target.metadata,
    e.target.headerElementRefs
  );
  const curRowDiv = res[0];
  //add controls div
  const cdiv = gdiv([], {
    css: {
      display: "flex",
      justifyContent: "space-between",
    },
  });

  const btnAddRow = gbtn("+", [], {
    border: "none",
    backgroundColor: "LawnGreen",
  });
  btnAddRow.curRowDiv = curRowDiv;
  btnAddRow.metadata = e.target.metadata;
  btnAddRow.rows = e.target.rows;
  btnAddRow.headerElementRefs = e.target.headerElementRefs;
  btnAddRow.rowInput = e.target.rowInput;
  btnAddRow.addEventListener("click", addRowPrevious);

  cdiv.appendChild(btnAddRow);
  const btnDelRow = gbtn("-", [], {
    border: "none",
    backgroundColor: "LightCoral",
  });
  btnDelRow.addEventListener("click", removeCurrentDivAndRow);
  btnDelRow.curRowDiv = curRowDiv;
  btnDelRow.rows = e.target.rows;
  btnDelRow.rowInput = e.target.rowInput;

  cdiv.appendChild(btnDelRow);
  res[0].appendChild(cdiv);

  e.target.outerDiv.lastChild.insertAdjacentElement("beforebegin", res[0]);
  e.target.rows.push({ elementRefs: res[1] });

  //add any outbound events

  //bind if any outbound events are defined in model

  const metadataKeys = Object.keys(e.target.metadata);
  metadataKeys.forEach((metadatakey) => {
    const metadataProp = e.target.metadata[metadatakey];
    if (metadataProp.headerFieldToUpdateSum) {
      // now bind an event to cal totroweach column in grid
      //console.log("column",columns)
     // e.target.rows.forEach((row) => {
      const row = e.target.rows[e.target.rows.length-1];
        const input = row.elementRefs[metadatakey];
        input.rows = e.target.rows;
        input.outboundEventReceiver =
          e.target.headerElementRefs[metadataProp.headerFieldToUpdateSum];
        input.columnNameToSum = metadatakey;
        //console.log("columnNameToSum", metadatakey);
        input.addEventListener("input", outboundEventHandler);
        //console.log("e added")
     // });
    }
  });
};

const xaddRowPrevious = async(e) => {

   let data;

  if (e.target.showEntityBrowser) {
    await showEntityBrowser();
    //then communicate over rxjs subject
    return;
  }
  const res = getRowInputRowDiv(
    data,
    e.target.metadata,
    e.target.headerElementRefs
  );
  const curRowDiv = res[0];
  //add controls div
  const cdiv = gdiv([], {
    css: {
      display: "flex",
      justifyContent: "space-between",
    },
  });
  const btnAddRow = gbtn("+", [], {
    border: "none",
    backgroundColor: "LawnGreen",
  });
  btnAddRow.curRowDiv = curRowDiv;
  btnAddRow.metadata = e.target.metadata;
  btnAddRow.rows = e.target.rows;
  btnAddRow.headerElementRefs = e.target.headerElementRefs;
  btnAddRow.rowInput = e.target.rowInput;
  btnAddRow.addEventListener("click", addRowPrevious);
  cdiv.appendChild(btnAddRow);
  const btnDelRow = gbtn("-", [], {
    border: "none",
    backgroundColor: "LightCoral",
  });
  btnDelRow.addEventListener("click", removeCurrentDivAndRow);
  btnDelRow.curRowDiv = curRowDiv;
  btnDelRow.rows = e.target.rows;
  btnDelRow.rowInput = e.target.rowInput;
  cdiv.appendChild(btnDelRow);
  res[0].appendChild(cdiv);

  e.target.curRowDiv.insertAdjacentElement("beforebegin", res[0]);
  const curRowIndex = getCurrentRowIndex(res[0]);
  // console.log("curRowIndex", curRowIndex);
  e.target.rows.splice(curRowIndex, 0, { elementRefs: res[1] });
  //console.log("e.target. rows", e.target. rows);

  //add any outbound events

  //bind if any outbound events are defined in model

  const metadataKeys = Object.keys(e.target.metadata);
  metadataKeys.forEach((metadatakey) => {
    const metadataProp = e.target.metadata[metadatakey];
    if (metadataProp.headerFieldToUpdateSum) {
      // now bind an event to cal total to each column in grid
      //console.log("column",columns)
     // e.target.rows.forEach((row) => {
       const row = e.target.rows[e.target.rows.length-1];
        const input = row.elementRefs[metadatakey];
        input.rows = e.target.rows;
        input.outboundEventReceiver =
          e.target.headerElementRefs[metadataProp.headerFieldToUpdateSum];
        input.columnNameToSum = metadatakey;
        //console.log("columnNameToSum", metadatakey);
        input.addEventListener("input", outboundEventHandler);
        //console.log("e added")
     // });
    }
  });
};

const xgetCurrentRowIndex = (div) => {
  for (let index = 1; index < div.parentElement.children.length; index++) {
    const element = div.parentElement.children[index];
    if (div.id == element.id) {
      return index - 1;
    }
  }
  console.log("error-getCurrentDivIndex");
  return -1;
};

const xremoveCurrentDivAndRow = (e) => {
  const curRowIndex = getCurrentRowIndex(e.target.curRowDiv);
  const rowInput = e.target.rowInput;
  // console.log("curRowIndex", curRowIndex);
  e.target.rows.splice(curRowIndex, 1);
  rowInput.recalculateFormulas();
  e.target.curRowDiv.remove();
};

const xSetupEntityBrowser = (
  metadata,
  data,
  headerElementRefs,
  rowInput,
  entityBrowserOptions = {}
) => {

  
  //setup rxjs subject
  options.browserActionSubject.subscribe((data) => {
    switch (data.action) {
      case "addlastrow":
        break;
      default:
        break;
    }
  });
};



