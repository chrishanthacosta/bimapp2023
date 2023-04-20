import {
  getColumnInputColumnDiv,
  getColumnInputHeaderDiv,
} from "../../utils/col-input-utils/get-colinput-header-div";
import { gdiv } from "../../utils/js-utils/jsutils-creation";
import { gbtn } from "./../../utils/js-utils/jsutils-creation";

export const ColumnInputGenericRenderer = (
  metadata,
  data,
  headerElementRefs,
  columnInput
) => {
  console.log("poDetailsRenderer:data", data);
  const columns = [];
  const odiv = gdiv([], {
    css: {
      display: "flex",
      backgroundColor: "Gainsboro",
      alignItems: "flex-start",
      border: "1px solid darkgrey",
    },
  });
  //add header
  const hd = getColumnInputHeaderDiv(metadata);
  odiv.appendChild(hd);
  //add cols

  for (let index = 0; index < data.length; index++) {
    const col = data[index];
    //console.log("col", col);

    const res = getColumnInputColumnDiv(col, metadata, headerElementRefs);
    const curColumnDiv = res[0];
    //add controls div
    const cdiv = gdiv([], {
      css: {
        display: "flex",
        justifyContent: "space-between",
      },
    });

    const btnAddCol = gbtn("+", [], {
      border: "none",
      backgroundColor: "LawnGreen",
    });
    btnAddCol.curColumnDiv = curColumnDiv;
    btnAddCol.metadata = metadata;
    btnAddCol.columns = columns;
    btnAddCol.headerElementRefs = headerElementRefs;
    btnAddCol.columnInput = columnInput;
    btnAddCol.addEventListener("click", addColumnPrevious);

    cdiv.appendChild(btnAddCol);
    //handle del column
    const btnDelCol = gbtn("-", [], {
      border: "none",
      backgroundColor: "LightCoral",
    });
    btnDelCol.addEventListener("click", removeCurrentDivAndColumn);
    btnDelCol.curColumnDiv = curColumnDiv;
    btnDelCol.columns = columns;
    btnDelCol.columnInput = columnInput;

    cdiv.appendChild(btnDelCol);
    curColumnDiv.appendChild(cdiv);
    odiv.appendChild(curColumnDiv);
    columns.push({ elementRefs: res[1] });
  }

  //add controls div
  const btnAddColLast = gbtn("+", [], {
    border: "none",
    backgroundColor: "LawnGreen",
  });
  btnAddColLast.metadata = metadata;
  btnAddColLast.outerDiv = odiv;
  btnAddColLast.columns = columns;
  btnAddColLast.headerElementRefs = headerElementRefs;
  btnAddColLast.columnInput = columnInput;

  btnAddColLast.addEventListener("click", addColumnLast);
  odiv.appendChild(btnAddColLast);

  //bind if any outbound events are defined in model

  const metadataKeys = Object.keys(metadata);
  metadataKeys.forEach((metadatakey) => {
    const metadataProp = metadata[metadatakey];
    if (metadataProp.headerFieldToUpdateSum) {
      // now bind an event to cal total to each column in grid
      //console.log("column",columns)
      columns.forEach((column) => {
        const input = column.elementRefs[metadatakey];
        input.columns = columns;
        input.outboundEventReceiver =
          headerElementRefs[metadataProp.headerFieldToUpdateSum];
        input.columnNameToSum = metadatakey;
        //console.log("columnNameToSum", metadatakey);
        input.addEventListener("input", outboundEventHandler);
        //console.log("e added")
      });
    }
  });

  //

  return [odiv, columns];
};

const outboundEventHandler = (e) => {
  //console.log("outboundEventHandler");
  const outboundEventReceiver = e.target.outboundEventReceiver;
  const columns = e.target.columns;
  let total = 0;
  const columnNameToSum = e.target.columnNameToSum;
  columns.forEach((column) => {
    const input = column.elementRefs[columnNameToSum];
    //console.log("columnNameToSum", columnNameToSum);
    //console.log("input.value", input.value);
    total += parseFloat(input.value ?? 0);
  });
  outboundEventReceiver.value = total;
  const eventOutBound = new Event("input");
  outboundEventReceiver.dispatchEvent(eventOutBound);
};

const addColumnLast = (e) => {
  const res = getColumnInputColumnDiv(
    undefined,
    e.target.metadata,
    e.target.headerElementRefs
  );
  const curColumnDiv = res[0];
  //add controls div
  const cdiv = gdiv([], {
    css: {
      display: "flex",
      justifyContent: "space-between",
    },
  });
  const btnAddCol = gbtn("+", [], {
    border: "none",
    backgroundColor: "LawnGreen",
  });
  btnAddCol.curColumnDiv = curColumnDiv;
  btnAddCol.metadata = e.target.metadata;
  btnAddCol.columns = e.target.columns;
  btnAddCol.headerElementRefs = e.target.headerElementRefs;
  btnAddCol.columnInput = e.target.columnInput;
  btnAddCol.addEventListener("click", addColumnPrevious);

  cdiv.appendChild(btnAddCol);
  const btnDelCol = gbtn("-", [], {
    border: "none",
    backgroundColor: "LightCoral",
  });
  btnDelCol.addEventListener("click", removeCurrentDivAndColumn);
  btnDelCol.curColumnDiv = curColumnDiv;
  btnDelCol.columns = e.target.columns;
  btnDelCol.columnInput = e.target.columnInput;

  cdiv.appendChild(btnDelCol);
  res[0].appendChild(cdiv);

  e.target.outerDiv.lastChild.insertAdjacentElement("beforebegin", res[0]);
  e.target.columns.push({ elementRefs: res[1] });

  //add any outbound events

  //bind if any outbound events are defined in model

  const metadataKeys = Object.keys(e.target.metadata);
  metadataKeys.forEach((metadatakey) => {
    const metadataProp = e.target.metadata[metadatakey];
    if (metadataProp.headerFieldToUpdateSum) {
      // now bind an event to cal total to each column in grid
      //console.log("column",columns)
      e.target.columns.forEach((column) => {
        const input = column.elementRefs[metadatakey];
        input.columns = e.target.columns;
        input.outboundEventReceiver =
          e.target.headerElementRefs[metadataProp.headerFieldToUpdateSum];
        input.columnNameToSum = metadatakey;
        //console.log("columnNameToSum", metadatakey);
        input.addEventListener("input", outboundEventHandler);
        //console.log("e added")
      });
    }
  });
};

const addColumnPrevious = (e) => {
  const res = getColumnInputColumnDiv(
    undefined,
    e.target.metadata,
    e.target.headerElementRefs
  );
  const curColumnDiv = res[0];
  //add controls div
  const cdiv = gdiv([], {
    css: {
      display: "flex",
      justifyContent: "space-between",
    },
  });
  const btnAddCol = gbtn("+", [], {
    border: "none",
    backgroundColor: "LawnGreen",
  });
  btnAddCol.curColumnDiv = curColumnDiv;
  btnAddCol.metadata = e.target.metadata;
  btnAddCol.columns = e.target.columns;
  btnAddCol.headerElementRefs = e.target.headerElementRefs;
  btnAddCol.addEventListener("click", addColumnPrevious);
  btnAddCol.columnInput = e.target.columnInput;
  cdiv.appendChild(btnAddCol);
  const btnDelCol = gbtn("-", [], {
    border: "none",
    backgroundColor: "LightCoral",
  });
  btnDelCol.addEventListener("click", removeCurrentDivAndColumn);
  btnDelCol.curColumnDiv = curColumnDiv;
  btnDelCol.columns = e.target.columns;
  btnDelCol.columnInput = e.target.columnInput;
  cdiv.appendChild(btnDelCol);
  res[0].appendChild(cdiv);

  e.target.curColumnDiv.insertAdjacentElement("beforebegin", res[0]);
  const curColumnIndex = getCurrentColumnIndex(res[0]);
  // console.log("curColumnIndex", curColumnIndex);
  e.target.columns.splice(curColumnIndex, 0, { elementRefs: res[1] });
  //console.log("e.target.columns", e.target.columns);

  //add any outbound events

  //bind if any outbound events are defined in model

  const metadataKeys = Object.keys(e.target.metadata);
  metadataKeys.forEach((metadatakey) => {
    const metadataProp = e.target.metadata[metadatakey];
    if (metadataProp.headerFieldToUpdateSum) {
      // now bind an event to cal total to each column in grid
      //console.log("column",columns)
      e.target.columns.forEach((column) => {
        const input = column.elementRefs[metadatakey];
        input.columns = e.target.columns;
        input.outboundEventReceiver =
          e.target.headerElementRefs[metadataProp.headerFieldToUpdateSum];
        input.columnNameToSum = metadatakey;
        //console.log("columnNameToSum", metadatakey);
        input.addEventListener("input", outboundEventHandler);
        //console.log("e added")
      });
    }
  });
};

const getCurrentColumnIndex = (div) => {
  for (let index = 1; index < div.parentElement.children.length; index++) {
    const element = div.parentElement.children[index];
    if (div.id == element.id) {
      return index - 1;
    }
  }
  console.log("error-getCurrentDivIndex");
  return -1;
};

const removeCurrentDivAndColumn = (e) => {
  const curColumnIndex = getCurrentColumnIndex(e.target.curColumnDiv);
  const colInput = e.target.columnInput;
  //console.log("curColumnIndex", curColumnIndex);
  e.target.columns.splice(curColumnIndex, 1);
  colInput.recalculateFormulas();
  //  e.target.curColumnDiv.remove();
  const ele = e.target.curColumnDiv;
  ele.remove();

  //recal All outbound events
};
