import { getDataFromViewcontext } from "../../utils/framework-utils/get-data-from-viewcontext";

export class ColumnInputElement extends HTMLElement {
  static lastStaticDivId = 0;
  constructor() {
    super();

    const template1 = this.GetTemplate();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template1.content.cloneNode(true));
    this._value = {   };
  }

  connectedCallback() {
    //this.dragElement(this._shadowRoot.getElementById("popbody"));
    this.render();
  }

  static get observedAttributes() {
    return ["value"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
 
  }
  set value(value) {
   // this.setAttribute("value", value);
 
    this._value = value ?? {};
    this.render();
    //console.log("inside value property web compo",this._value)
  }

  get value() {
    //this.getAttribute("value");
    //console.log("called value web compo")
    const d = this.getDataObjectFromColumns();
    //console.log("called value web compo-data d",d)
    return d;
  }
  set metadata(value) {
    this._metadata = value;
  }

  set renderer(value) {
    this.customRenderFunction = value;
  }

  set headerElementRefs(value) {
    this._headerElementRefs = value;
  }

  // setContent(text) {
  //   const d = this._shadowRoot.getElementById(`col-input-${this.curDivId}`);
  //   d.innerHTML = text;
  // }

  render() {
     console.log("inside render web compo render", this._value);
    const d = this._shadowRoot.getElementById(`col-input-${this.curDivId}`);
    d.firstChild.remove();
   
    const res = this.customRenderFunction(
      this._metadata,
      this._value,
      this._headerElementRefs,
      this
    );
    this.columns = res[1];
    d.appendChild(res[0]);
  }

  GetTemplate = () => {
    ColumnInputElement.lastStaticDivId++;
    //console.log("last", ColumnInputElement.lastStaticDivId);
    this.curDivId = ColumnInputElement.lastStaticDivId;
    const colInputTemplate = document.createElement("template");
    colInputTemplate.innerHTML = `
  <style>
  .col-input-outer-div{
    display: flex;
    flex-direction: column;
    width:100%;
    
  }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
             -webkit-appearance: none;
            margin: 0;
            }
    </style>
  <div id= "col-input-${this.curDivId}" class="col-input-outer-div">
 col input
 
    </div>
  `;

    return colInputTemplate;
  };

  getDataObjectFromColumns() {
    const dataRows = [];
    this.columns.forEach((c) => {
      const d = getDataFromViewcontext(this._metadata, c.elementRefs, true);
      dataRows.push(d);
    });
    return dataRows;
  }

  recalculateFormulas() {
    console.log("recalculateFormulas");
    const propNames = Object.keys(this._metadata);

    for (let index = 0; index < propNames.length; index++) {
      const propName = propNames[index];
      const prop= this._metadata[propName]
      if (prop.formula) {
        const firstInputName = prop.formulaArgs[0];
        //console.log("firstInput in fo ");
        const event = new Event("input");
        //call event for all cols
        this.columns.forEach(column => {
           column.elementRefs[firstInputName].dispatchEvent(event);
        });
       
        break;
      }
    }
     



 
  }
}

window.customElements.define("column-input", ColumnInputElement);
