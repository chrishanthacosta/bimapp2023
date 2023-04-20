import { getDataFromViewcontext } from "../../utils/framework-utils/get-data-from-viewcontext";
import { dragElement } from "../../utils/js-utils/draggableElement";
import { Subject } from "rxjs";
import {
  gbtn,
  gdiv,
  gelembyid,
  ghidden,
  ginputdate,
  ginputnumber,
  ginputtext,
  ginputtextsearch,
  glabel,
  gselect,
  gspan,
  gtxtnode,
} from "../../utils/js-utils/jsutils-creation";
import { getSelectOptionsArray } from "../../utils/framework-utils/get-viewcontext-div";

export class PrintUiWebComponent extends HTMLElement {
  static lastStaticDivId = 0;
  constructor() {
    super();

    const template1 = this.GetTemplate();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template1.content.cloneNode(true));

    this.AttachEvents();
    this.entityBroserSubject = new Subject();
  }
  AttachEvents() {
    const popupCloser = this._shadowRoot.getElementById(
      `popupcloser-${this.curDivId}`
    );

    popupCloser.addEventListener("click", (e) => {
      const ee = new CustomEvent("removed", { ddd: 2 });
      this.dispatchEvent(ee);
    });
  }
  // SetBrowserOptions(
  //   modelPropsToDisplay = [],
  //   returnPropNames = [],
  //   browserSubject = {},
  //   dataRetrieverFunc = () => {}
  // ) {
  //   this.modelPropsToDisplay = modelPropsToDisplay;
  //   this.returnPropNames = returnPropNames;
  //   this.dataRetrieverFunc = dataRetrieverFunc;
  // }

  async render(
    title,
    printTemplate,
    data = {},
   
  ) {
    //console.log("inside render web compo render", this._value);
    const dOuter = this._shadowRoot.getElementById(`ent-brw-${this.curDivId}`);
    // const d = this._shadowRoot.getElementById(
    //   `ent-brw-main-div-${this.curDivId}`
    // );
    // d.firstChild?.remove();
    // const nd = document.createElement("DIV");

    // nd.innerHTML = this.GetBrowserDiv(
    //   title,
    //   modelPropsToDisplay,
    //   returnPropNames,
    //   dataRetrieverFunc
    // );
    // // console.log("ihtml", nd.innerHTML);
    // d.appendChild(nd);

    const dMainDiv = await this.GetBrowserDiv(title, modelPropsToDisplay);
    const broserBodyDiv = gdiv(["borwser-body-div"]);
    const serachDiv = this.GetSearchDiv(
      this.searchInputRefs,
      modelPropsToDisplay,
      dataRetrieverFunc,
      args,
      this.entityBroserSubject
    );
    broserBodyDiv.appendChild(dMainDiv);
    broserBodyDiv.appendChild(serachDiv);

    dOuter.appendChild(broserBodyDiv);

    dOuter.appendChild(getFooterDiv());
    return this.entityBroserSubject;
  }

  GetTemplate = () => {
    EntityBrowserType1Element.lastStaticDivId++;
    //console.log("last", ColumnInputElement.lastStaticDivId);
    this.curDivId = EntityBrowserType1Element.lastStaticDivId;
    const entBrowsert1Template = document.createElement("template");
    entBrowsert1Template.innerHTML = `
  <style>
        .ent-browsert1-outer-div{
        display: flex;
        flex-direction: column;
        width:fit-content;
        min-width:700px;
        position:absolute;
        top:100px;
        left:50px;
         background-color:darkgrey;
         z-index:10;
         resize: both;
         overflow: auto;
        }
        
        .ent-browsert1-main-div{
        display: flex;
        flex-direction: column;
        background-color:darkgrey;
        margin:3px;
        min-height:300px;
        flex-basis: 95%;
        }

        .ent-browsert1-row-div {
        display: flex;
        background-color:green;
        gap:5px;
        }

        .ent-browsert1-searchresult-row-div {
        display: flex;
        background-color:aliceblue;
        gap:5px;
        color:darkblue;
        }

        .ent-browsert1-searchresult-row-div:nth-child(even) {
            background-color: lavender;
        }
        .ent-browsert1-searchresult-row-div:hover{
            background-color: lightgrey;
        }
           .ent-browsert1-searchresult-row-div:active{
            background-color: lightpink;
        }

        .search-results-div{
           display: flex;
          flex-direction: column;
        }

        .borwser-body-div{
          display:flex;
        }
        .search-btn-div{
          display:flex;
          justify-content:flex-start;
          flex-basis:5%;
        }
        .search-btn{
          max-height:1.25rem;
          margin-top:1.6rem;
        }
        .no-browser-records-span{
          color:white;
          margin:2rem;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        margin: 0;
        }

                
        .close {
        float: right;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        color: #FFFFFF;
        text-shadow: 0 1px 0 #fff;
        opacity: .5;
        margin-left:15px;
        }

        .close:hover, .close:focus {
        color: #F0F8FF;
        text-decoration: none;
        opacity: .75;
        }

        .close:not(:disabled):not(.disabled) {
        cursor: pointer;
        }

        button.close {
        padding: 0;
        background-color: transparent;
        border: 0;
        -webkit-appearance: none;
        }
          #popbodyheader-${this.curDivId} {
            padding: 10px;
            cursor: move;
            z-index: 10;
            background: #003683;
            color: #fff;
            border-radius: 5px 5px 0px 0px;
            }
    </style>
    <div id= "ent-brw-${this.curDivId}" class="ent-browsert1-outer-div">
        <div id="popbodyheader-${this.curDivId}"><span id='brw-title-${this.curDivId}'> </span>
        <button type="button" class="close "    id ="popupcloser-${this.curDivId}">&times;</button>
        </div>
        
    </div>
  `;

    return entBrowsert1Template;
  };

  async GetBrowserDiv(title, modelPropsToDisplay = []) {
    //attach close handler
    const btnCloser = this._shadowRoot.getElementById(
      `popupcloser-${this.curDivId}`
    );
    btnCloser.entityBrowserElement = this;
    btnCloser.addEventListener("click", this.closeBroserHandler);

    //attach draggable handler
    const outerdiv = this._shadowRoot.getElementById(
      `ent-brw-${this.curDivId}`
    );
    const headerDiv = this._shadowRoot.getElementById(
      `popbodyheader-${this.curDivId}`
    );
    dragElement(outerdiv, headerDiv);

    // add other stuff
    //title
    const maindiv = gdiv(["ent-browsert1-main-div"]);
    maindiv.id = `ent-brw-main-div-${this.curDivId}`;
    //console.log("`brw-title-${this.curDivId}`", `brw-title-${this.curDivId}`);
    const titleSpan = this._shadowRoot.getElementById(
      `brw-title-${this.curDivId}`
    );
    const tilteTextNode = gtxtnode(title);
    titleSpan.appendChild(tilteTextNode);

    //add header titles
    console.log("modelPropsToDisplay", modelPropsToDisplay);
    const headerTilesDiv = getHeaderTitleDiv(modelPropsToDisplay);
    maindiv.appendChild(headerTilesDiv);

    //add inputs
    const results = await this.getHeaderInputDiv(modelPropsToDisplay);
    this.searchInputRefs = results[1];
    const headerInputsDiv = results[0];

    maindiv.appendChild(headerInputsDiv);

    //searchResults div
    const searchResultDiv = gdiv(["search-results-div"]);
    searchResultDiv.id = `search-results-div-${this.curDivId}`;
    maindiv.appendChild(searchResultDiv);
    //add data

    return maindiv;
  }

  CloseBroserHandler(e) {
    const wc = e.target.entityBrowserElement;

    wc.remove();
  }

  async searchButtonHandler(e) {
    const dataRetrieverFunc = e.target.dataRetrieverFunc;
    const args = e.target.dataRetrieverFunc_args;
    const modelPropsToDisplay = e.target.modelPropsToDisplay;
    const searchInputRefs = e.target.searchInputRefs;
    const entityBrowser = e.target.EntityBrowser;
    const entityBroserSubject = e.target.entityBroserSubject;
    const searchParams = getSearchParamsFromInputs(searchInputRefs);
    console.log("searchParams", searchParams);
    const data = await getSearchResultsData(
      dataRetrieverFunc,
      args,
      modelPropsToDisplay,
      searchParams
    );
    console.log("data", data);
    entityBrowser.addResultDataToDiv(
      modelPropsToDisplay,
      data,
      entityBroserSubject
    );
    //console.log("seachp", searchParams);
  }

  async getHeaderInputDiv(modelPropsToDisplay = []) {
    const headerInputsDiv = gdiv(["ent-browsert1-row-div"]);
    const searchInputRefs = [];
    //  modelPropsToDisplay.forEach((prop) => {
    for (let index = 0; index < modelPropsToDisplay.length; index++) {
      const prop = modelPropsToDisplay[index];

      let input;
      const searchInputRef = {};
      switch (prop.inputType) {
        case "text":
          input = ginputtextsearch(
            [],
            {},
            {
              flexBasis: prop.listOptions.flexBasis,
              flexGrow: prop.listOptions.flexGrow,
              flexShrink: prop.listOptions.flexShrink,
            }
          );
          searchInputRef[prop.dbFieldName] = input;

          break;

        case "number":
          input = ginputnumber(
            [],
            {},
            {
              flexBasis: prop.listOptions.flexBasis,
              flexGrow: prop.listOptions.flexGrow,
              flexShrink: prop.listOptions.flexShrink,
            }
          );
          searchInputRef[prop.dbFieldName] = input;
          break;
        case "date":
          input = ginputdate(
            [],
            {},
            {},
            {
              flexBasis: prop.listOptions.flexBasis,
              flexGrow: prop.listOptions.flexGrow,
              flexShrink: prop.listOptions.flexShrink,
            }
          );
          searchInputRef[prop.dbFieldName] = input;
          break;
        case "label":
          input = ginputtext(
            [],
            {},
            {
              flexBasis: prop.listOptions.flexBasis,
              flexGrow: prop.listOptions.flexGrow,
              flexShrink: prop.listOptions.flexShrink,
            }
          );
          searchInputRef[prop.dbFieldName] = input;

          break;
        case "select":
          const optionsList = await getSelectOptionsArray(prop);
          console.log("oplist", optionsList);
          input = gselect(
            optionsList,
            [],
            {},
            {
              flexBasis: prop.listOptions.flexBasis,
              flexGrow: prop.listOptions.flexGrow,
              flexShrink: prop.listOptions.flexShrink,
            }
          );
          input.value = null;
          searchInputRef[prop.dbFieldName] = input;
          break;
        case "hidden":
          input = ghidden();
          searchInputRef[prop.dbFieldName] = input;
          break;
        default:
          console.log("default switch-");
          break;
      }
      searchInputRefs.push(searchInputRef);
      console.assert(
        input,
        "no valid input found-getHeaderInputDiv-ent brwoser-" + prop.inputType
      );
      headerInputsDiv.appendChild(input);
    }

    // const btn = gbtn("Search");
    // btn.EntityBrowser = this;
    // btn.searchInputRefs = searchInputRefs;
    // btn.modelPropsToDisplay = modelPropsToDisplay;
    // btn.dataRetrieverFunc = dataRetrieverFunc;
    // btn.addEventListener("click", this.searchButtonHandler);
    // headerInputsDiv.appendChild(btn);

    return [headerInputsDiv, searchInputRefs];
  }

  addResultDataToDiv(modelPropsToDisplay, data, entityBroserSubject) {
    const searchDiv = this._shadowRoot.getElementById(
      `search-results-div-${this.curDivId}`
    );
    while (searchDiv.firstChild) {
      searchDiv.firstChild.remove();
    }
    if (data.length == 0) {
      const sp = gspan("No records available...", ["no-browser-records-span"]);
      searchDiv.appendChild(sp);
    }
    data.forEach((dataRow) => {
      const d = getSearchResultDataRowDiv(
        modelPropsToDisplay,
        dataRow,
        entityBroserSubject
      );
      searchDiv.appendChild(d);
    });
  }

  GetSearchDiv(
    searchInputRefs,
    modelPropsToDisplay,
    dataRetrieverFunc,
    args,
    entityBroserSubject
  ) {
    const searchDiv = gdiv(["search-btn-div"]);
    //const lblEmpty = glabel(" ", "", [], {}, {minHeight: "1rem"} );

    const btn = gbtn("Search", ["search-btn"]);
    btn.EntityBrowser = this;
    btn.searchInputRefs = searchInputRefs;
    btn.modelPropsToDisplay = modelPropsToDisplay;
    btn.dataRetrieverFunc = dataRetrieverFunc;
    btn.dataRetrieverFunc_args = args;
    btn.entityBroserSubject = entityBroserSubject;
    btn.addEventListener("click", this.searchButtonHandler);
    //searchDiv.appendChild(lblEmpty);
    searchDiv.appendChild(btn);

    return searchDiv;
  }
}

const getSearchResultDataRowDiv = (
  modelPropsToDisplay = [],
  dataRow,
  entityBroserSubject
) => {
  const searchResultDataRowDiv = gdiv(["ent-browsert1-searchresult-row-div"]);

  modelPropsToDisplay.forEach((prop) => {
    const lb = glabel(
      dataRow[prop.dbFieldName],
      "",
      [],
      {},
      {
        flexBasis: prop.listOptions.flexBasis,
        flexGrow: prop.listOptions.flexGrow,
        flexShrink: prop.listOptions.flexShrink,
        // color: "white",
        textAlign: "center",
      }
    );
    lb.dbFieldName = prop.dbFieldName;
    searchResultDataRowDiv.appendChild(lb);
  });
  searchResultDataRowDiv.entityBroserSubject = entityBroserSubject;
  searchResultDataRowDiv.addEventListener("click", selectBrowserRowHandler);

  return searchResultDataRowDiv;
};

const selectBrowserRowHandler = (e) => {
  const result = {};
  if (e.target.entityBroserSubject) {
    console.log("clicked dic=");
  } else if (e.currentTarget.entityBroserSubject) {
    //console.log("clicked lbl");

    for (let index = 0; index < e.currentTarget.children.length; index++) {
      const r = e.currentTarget.children[index];
      result[r.dbFieldName] = r.innerHTML;
    }

    e.currentTarget.entityBroserSubject.next({ action: "row-added", result });
  }

  console.log("data", result);
};

const getSearchResultsData = async (
  dataRetrieverFunc,
  args,
  modelPropsToDisplay,
  searchParams
) => {
  const columnList = modelPropsToDisplay.map((p) => p.dbFieldName);
  console.log("columnList", columnList);

  const res = await dataRetrieverFunc(columnList, searchParams, ...args);
  console.log("res", res);

  return res;
};

const getSearchParamsFromInputs = (searchInputRefs) => {
  let searchParam = "";
  searchInputRefs.forEach((searchInputRef) => {
    const dbfieldname = Object.keys(searchInputRef)[0];
    console.assert(
      searchInputRef[dbfieldname],
      "getSearchParamsFromInputs-error-" + dbfieldname
    );
    const val = searchInputRef[dbfieldname].value;
    if (val != undefined && val != null && val.trim() != "") {
      searchParam +=
        (searchParam != "" ? " AND " : "") + ` ${dbfieldname} LIKE'%${val}%' `;
      // searchParam += (searchParam !="" ? "%20AND%20 " : "" ) +  `${dbfieldname}%20LIKE%20'%${val}%'`
    } else {
      console.log("ddddddd");
    }
  });
  if (searchParam.trim() != "") searchParam = "WHERE " + searchParam;
  //console.log("searchParam", searchParam);
  return searchParam;
};

const getHeaderTitleDiv = (modelPropsToDisplay = []) => {
  const headerTilesDiv = gdiv(["ent-browsert1-row-div"]);

  modelPropsToDisplay.forEach((prop) => {
    switch (prop.inputType) {
      case "text":
      case "number":
      case "label":
      case "date":
      case "select":
        const lb = glabel(
          prop.label,
          "",
          [],
          {},
          {
            flexBasis: prop.listOptions.flexBasis,
            flexGrow: prop.listOptions.flexGrow,
            flexShrink: prop.listOptions.flexShrink,
            color: "white",
            textAlign: "center",
          }
        );
        headerTilesDiv.appendChild(lb);
        break;

      default:
        break;
    }
  });

  return headerTilesDiv;
};

const getFooterDiv = () => {
  const ftdiv = gdiv(["ent-browsert1-row-div"]);

  const btnPrevPage = gbtn("Prev");
  ftdiv.appendChild(btnPrevPage);
  const btnNextPage = gbtn("Next");
  ftdiv.appendChild(btnNextPage);

  return ftdiv;
};

window.customElements.define("print-ui-element", PrintUiWebComponent);
