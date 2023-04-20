import { getDataFromViewcontext } from "../../utils/framework-utils/get-data-from-viewcontext";
import { gbtn, gdiv } from "../../utils/js-utils/jsutils-creation";
import { getRowInputRowDiv } from "../../utils/row-input-utils/row-input-utils";
import { getRowInputHeaderDiv } from './../../utils/row-input-utils/row-input-utils';

export class RowInputElement extends HTMLElement {
  static lastStaticDivId = 0;
  constructor() {
    super();

    const template1 = this.GetTemplate();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template1.content.cloneNode(true));
    this._value = {};
  }

  connectedCallback() {
    //this.dragElement(this._shadowRoot.getElementById("popbody"));
    //console.log("connectedCallback:");
    this.render();
  }

  static get observedAttributes() {
    return ["value"];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
  set value(value) {
    // console.log("set value(value):");
    //this.setAttribute("value", value);
    this._value = value;
    this.render();
    //console.log("inside value property web compo",this._value)
  }

  get value() {
    //this.getAttribute("value");
    //console.log("called value web compo")
    const d = this.getDataObjectFromRows();
    //console.log("called value web compo-data d",d)
    return d;
  }
  set metadata(value) {
    this._metadata = value;
  }
  set viewOptions(value) {
    this._viewOptions = value;
  }

  set headerElementRefs(value) {
    this._headerElementRefs = value;
  }

  render() {
    const d = this._shadowRoot.getElementById(`row-input-${this.curDivId}`);
    d.firstChild?.remove();
    console.log("inside render web compo render", this._value);
    const res = this.RowInputGenericRenderer(
      this._metadata,
      this._value,
      this._headerElementRefs,
      this,
      this._viewOptions
    );
    this.rows = res[1];
    this.outerDiv = res[0];
    d.appendChild(res[0]);
  }

  GetTemplate = () => {
    RowInputElement.lastStaticDivId++;
    //console.log("last", ColumnInputElement.lastStaticDivId);
    this.curDivId = RowInputElement.lastStaticDivId;
    const rowInputTemplate = document.createElement("template");
    rowInputTemplate.innerHTML = `
  <style>
  .row-input-outer-div{
    display: flex;
    flex-direction: column;
    
  }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
             -webkit-appearance: none;
            margin: 0;
            }
 
 
    </style>
  <div id= "row-input-${this.curDivId}" class="row-input-outer-div">
 col input
 
    </div>
  `;

    return rowInputTemplate;
  };

  getDataObjectFromRows() {
    const dataRows = [];
    this.rows.forEach((c) => {
      const d = getDataFromViewcontext(this._metadata, c.elementRefs, true);
      dataRows.push(d);
    });
    return dataRows;
  }

  recalculateFormulas() {
    //console.log("recalculateFormulas");
    const propNames = Object.keys(this._metadata);

    for (let index = 0; index < propNames.length; index++) {
      const propName = propNames[index];
      const prop = this._metadata[propName];
      if (prop.formula) {
        const firstInputName = prop.formulaArgs[0];
        console.log("firstInput in formula arg is not found system error");
        const event = new Event("input");
        //call event for all cols
        this.rows.forEach((row) => {
          row.elementRefs[firstInputName].dispatchEvent(event);
        });

        break;
      }
    }
  }

  AddRowLast(data) {
    // if (e.target.showEntityBrowser) {
    //   await showEntityBrowser();
    //   //then communicate over rxjs subject
    //   return;
    // }
    const res = getRowInputRowDiv(
      data,
      this._metadata,
      this._headerElementRefs
    );
    const curRowDiv = res[0];
    //add controls div
    const cdiv = gdiv([], {
      css: {
        display: "flex",
        justifyContent: "space-between",
      },
    });

    if (this._viewOptions.addRowPrevious) {
      const btnAddRow = gbtn("+", [], {
        border: "none",
        backgroundColor: "LawnGreen",
      });
      btnAddRow.curRowDiv = curRowDiv;
      btnAddRow.metadata = this._metadata;
      btnAddRow.rows = this.rows;
      btnAddRow.headerElementRefs = this._headerElementRefs;
      btnAddRow.rowInput = this;
      btnAddRow.addEventListener("click", addRowPrevious);

      cdiv.appendChild(btnAddRow);
    }

    const btnDelRow = gbtn("-", [], {
      border: "none",
      backgroundColor: "LightCoral",
    });
    btnDelRow.addEventListener("click", removeCurrentDivAndRow);
    btnDelRow.curRowDiv = curRowDiv;
    btnDelRow.rows = this.rows;
    btnDelRow.rowInput = this;

    cdiv.appendChild(btnDelRow);
    res[0].appendChild(cdiv);

    if (this._viewOptions.addRowLast) {
      this.outerDiv.lastChild.insertAdjacentElement("beforebegin", res[0]);
    } else {
      this.outerDiv.appendChild(res[0]);
    }
    this.rows.push({ elementRefs: res[1] });

    //add any outbound events

    //bind if any outbound events are defined in model

    const metadataKeys = Object.keys(this._metadata);
    metadataKeys.forEach((metadatakey) => {
      const metadataProp = this._metadata[metadatakey];
      if (metadataProp.headerFieldToUpdateSum) {
        // now bind an event to cal totroweach column in grid
        //console.log("column",columns)
        // this.rows.forEach((row) => {
        const row = this.rows[this.rows.length - 1];
        const input = row.elementRefs[metadatakey];
        input.rows = this.rows;
        input.outboundEventReceiver =
          this._headerElementRefs[metadataProp.headerFieldToUpdateSum];
        input.columnNameToSum = metadatakey;
        //console.log("columnNameToSum", metadatakey);
        input.addEventListener("input", outboundEventHandler);
        //console.log("e added")
        // });
      }
    });
  }

  async AddRowPrevious(data) {
    // if (e.target.showEntityBrowser) {
    //   await showEntityBrowser();
    //   //then communicate over rxjs subject
    //   return;
    // }
    const res = getRowInputRowDiv(
      data,
      this._metadata,
      this._headerElementRefs
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
    btnAddRow.metadata = this._metadata;
    btnAddRow.rows = this.rows;
    btnAddRow.headerElementRefs = this._headerElementRefs;
    btnAddRow.rowInput = this;
    btnAddRow.addEventListener("click", addRowPrevious);
    cdiv.appendChild(btnAddRow);
    const btnDelRow = gbtn("-", [], {
      border: "none",
      backgroundColor: "LightCoral",
    });
    btnDelRow.addEventListener("click", removeCurrentDivAndRow);
    btnDelRow.curRowDiv = curRowDiv;
    btnDelRow.rows = this.rows;
    btnDelRow.rowInput = this;
    cdiv.appendChild(btnDelRow);
    res[0].appendChild(cdiv);

    // e.target.curRowDiv.insertAdjacentElement("beforebegin", res[0]);
    curRowDiv.insertAdjacentElement("beforebegin", res[0]);
    const curRowIndex = getCurrentRowIndex(res[0]);
    // console.log("curRowIndex", curRowIndex);
    this.rows.splice(curRowIndex, 0, { elementRefs: res[1] });
    //console.log("e.target. rows", e.target. rows);

    //add any outbound events

    //bind if any outbound events are defined in model

    const metadataKeys = Object.keys(this._metadata);
    metadataKeys.forEach((metadatakey) => {
      const metadataProp = this._metadata[metadatakey];
      if (metadataProp.headerFieldToUpdateSum) {
        // now bind an event to cal total to each column in grid
        //console.log("column",columns)
        // this.rows.forEach((row) => {
        const row = this.rows[this.rows.length - 1];
        const input = row.elementRefs[metadatakey];
        input.rows = this.rows;
        input.outboundEventReceiver =
          this._headerElementRefs[metadataProp.headerFieldToUpdateSum];
        input.columnNameToSum = metadatakey;
        //console.log("columnNameToSum", metadatakey);
        input.addEventListener("input", outboundEventHandler);
        //console.log("e added")
        // });
      }
    });
  }

  recalculateFormulas() {
    console.log("recalculateFormulas");
    const propNames = Object.keys(this._metadata);

    for (let index = 0; index < propNames.length; index++) {
      const propName = propNames[index];
      const prop = this._metadata[propName];
      if (prop.formula) {
        const firstInputName = prop.formulaArgs[0];
        //console.log("firstInput in fo ");
        const event = new Event("input");
        //call event for all cols
        this.rows.forEach((row) => {
          row.elementRefs[firstInputName].dispatchEvent(event);
        });

        break;
      }
    }
  }

  RowInputGenericRenderer(
    metadata,
    data,
    headerElementRefs,
    rowInput,
    viewOptions,  
  ) {
    //handle entity browser handling
    // if (Object.keys(entityBrowserOptions).length > 0) {
    //   SetupEntityBrowser(
    //     metadata,
    //     data,
    //     headerElementRefs,
    //     rowInput,
    //     entityBrowserOptions = {}
    //   );
    //   return
    // }
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
      const res = getRowInputRowDiv(
        row,
        metadata,
        headerElementRefs,
        
      );
      const curRowDiv = res[0];
      //add controls div
      const cdiv = gdiv([], {
        css: {
          display: "flex",
          //   flexDirection:"column",
          justifyContent: "space-between",
        },
      });

      if (viewOptions.addRowPrevious ) {
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
      }
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

    if (viewOptions.addRowLast) {
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
    }
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
  }
}

const addRowLast = async (e) => {
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
      const row = e.target.rows[e.target.rows.length - 1];
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
const removeCurrentDivAndRow=(e)=> {
  const curRowIndex = getCurrentRowIndex(e.target.curRowDiv);
  const rowInput = e.target.rowInput;
  // console.log("curRowIndex", curRowIndex);
  e.target.rows.splice(curRowIndex, 1);
  rowInput.recalculateFormulas();
  e.target.curRowDiv.remove();
  };
  
const outboundEventHandler=  (e)=>   {
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

const getCurrentRowIndex = (div) =>  {
  for (let index = 1; index < div.parentElement.children.length; index++) {
    const element = div.parentElement.children[index];
    if (div.id == element.id) {
      return index - 1;
    }
  }
  console.log("error-getCurrentDivIndex");
  return -1;
};
const addRowPrevious = async (e) => {
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
      const row = e.target.rows[e.target.rows.length - 1];
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
window.customElements.define("row-input", RowInputElement);
