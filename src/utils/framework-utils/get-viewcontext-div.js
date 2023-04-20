import {
  gcolumninput,
  gdiv,
  ghidden,
  ginputdate,
  ginputdatetime,
  ginputemail,
  ginputtext,
  ginputtextarea,
  ginputtime,
  glabel,
  growinput,
  gselect,
} from "../js-utils/jsutils-creation";
import { ginputnumber } from "./../js-utils/jsutils-creation";

export const getViewcontextSingleColumnDiv = async (model, data) => {
  // const odiv = gdiv(["viewcontextSingleColumnDiv", "container-sm"]);
  const odiv = gdiv(["viewcontextSingleColumnDiv"]);
  const elementRefs = {};
  const modelKeys = Object.keys(model);

  for (let index = 0; index < modelKeys.length; index++) {
    const propName = modelKeys[index];
    const prop = model[propName];
    // get form-group div
    const formGroupDiv = await getFormGroupDiv(
      prop,
      propName,
      data,
      elementRefs
    );

    odiv.appendChild(formGroupDiv);
  }

  return { div: odiv, elementRefs };
};

const getFormGroupDiv = async (prop, propName, data, elementRefs) => {
  const formGroupDiv = gdiv(["form-group", "form-group-custom"]);

  //handle label
  let label, value, input;
  if (prop.label) {
    label = glabel(prop.label, propName, ["form-label-custom"]);
    formGroupDiv.appendChild(label);
  }

  if (data) {
    value = data[prop];
  }

  switch (prop.inputType) {
    case "number":
      const decimalPlaces = prop.decimalPlaces;
      const minValue = prop.minValue;
      const maxValue = prop.maxValue;
      
      const options = {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      };
      input = ginputnumber(["form-control"], options);
        //handle decimal and min max
        input.decimalPlaces = decimalPlaces;
        input.minValue = minValue;
      input.maxValue = maxValue;
      //input.setAttribute("step","0.01")
        input.addEventListener("input", (e) => {
           const decimalPlaces = e.target.decimalPlaces;
          //  const minValue = e.target.minValue;
          //  const maxValue = e.target.maxValue;
          var t = e.target.value;
          const indexofDot = t.indexOf(".");
          if (indexofDot > 0) {
            if (decimalPlaces != 0) {
              const decimaltypedcount = t.length - indexofDot - 1;
             
              if (decimaltypedcount > decimalPlaces) {
                const extradecimals = decimaltypedcount - decimalPlaces;
                const tt = t.substr(0, t.length - extradecimals);
                if (tt) {
                   e.target.value = parseFloat(tt)
                     .toFixed(decimalPlaces);
                }
               

              }
            } else
            {
               e.target.value = parseFloat(t.substr(0, indexofDot)).toFixed(decimalPlaces);
            }
          }
 
        })
        //console.log("found decimal 2")
       
     

      break;
    case "text":
      input = ginputtext(["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "textarea":
      input = ginputtextarea(["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "email":
      input = ginputemail(["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "date":
      input = ginputdate("today", ["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "time":
      input = ginputtime("now", ["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "datetime":
      input = ginputdatetime("now", ["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "checkbox":
      input = ginputcheckbox(["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "label":
      input = glabel(" ", "", ["form-control", "viewcontext-labels"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "select":
      const optionsList = await getSelectOptionsArray(prop);
      //console.log("oplist",optionsList)
      input = gselect(optionsList, ["form-select"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    case "rowinput":
      input = growinput(["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      //  input.renderer = prop.renderer;
        input.metadata = prop.metadata;
      input.headerElementRefs = elementRefs;
      input.viewOptions = prop.viewOptions;
      break;
    case "columninput":
      input = gcolumninput(["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      input.renderer = prop.renderer;
      input.metadata = prop.metadata;
      input.headerElementRefs = elementRefs;
      break;
    case "hidden":
      input = ghidden(["form-control"], {
        attributes: { name: propName, readOnly: prop.readOnly ?? false },
      });
      break;
    default:
      break;
  }
  console.assert(input, "failes loading input:", propName);
  if (value) {
    input.value = value;
  }
  elementRefs[propName] = input;
  if (input) formGroupDiv.appendChild(input);

  return formGroupDiv;
};
export const getViewcontextDivType1 = async (model, data,options) => {
  // const odiv = gdiv(["viewcontextSingleColumnDiv", "container-sm"]);
  //const odiv = gdiv(["viewcontextDivType1"]);
  const elementRefs = {};
  const modelKeys = Object.keys(model);
  const divList = [];
  for (let index = 0; index < modelKeys.length; index++) {
    const propName = modelKeys[index];
    const prop = model[propName];
    // get form-group div
    const formGroupDiv = await getFormGroupDiv(
      prop,
      propName,
      data,
      elementRefs
    );

    divList.push({
      divElement: formGroupDiv,
      panel: prop.viewPosition.panel,
      div: prop.viewPosition.div,
      row: prop.viewPosition.row,
    });

    //bind events
    if (prop.formula) {
      //cal formula value
      
      prop.formulaArgs.forEach(arg => {

        const input = elementRefs[arg];
        console.assert(input, "no input found for name:",arg)
        input.elementRefs = elementRefs;
        input.formula = prop.formula;
        input.formulaArgs = prop.formulaArgs;
        input.eventSinkElementRefName = propName;
        input.decimalPlaces = prop.decimalPlaces;
        input.addEventListener("input", (e) => {
          const elementRefs = e.target.elementRefs;
          const formulaArgs = e.target.formulaArgs;
          const formula = e.target.formula;
          const decimalPlaces = e.target.decimalPlaces;
          const eventSinkElementRefName = e.target.eventSinkElementRefName;
          const argsArray = [];
          formulaArgs.forEach(arg => {
            const argValue = elementRefs[arg].value ?? 0;
            argsArray.push(argValue);
          })
           const formulaValue =  formula(...argsArray);
          const taegetEventSinkElement = elementRefs[eventSinkElementRefName];
          taegetEventSinkElement.value = formulaValue.toFixed(decimalPlaces);
        })

       
      });

     

      //

    }


  }

  const odiv = buildPanels(divList,options);

  return { div: odiv, elementRefs };
};

export const getSelectOptionsArray = async (prop) => {
  let columnList = [];
  if (prop.selectOptionMode == "db") {
    const columnListArgs = [
      prop.selectOptionsApiDetails.args.label,
      prop.selectOptionsApiDetails.args.value,
    ];
    console.log("FUNC-PROP",prop)
    const rows = await prop.selectOptionsApiDetails.func(columnListArgs);
    console.log("rows:", rows);
    rows.forEach((element) => {
      columnList.push(element[prop.selectOptionsApiDetails.args.label]);
      columnList.push(element[prop.selectOptionsApiDetails.args.value]);
    });

    // console.log("rows in select", rows);
  } else if (prop.selectOptionMode == "fixed") {
    columnList = prop.selectOptions;
  } else {
    console.log("Error in Select option mode");
  }

  return columnList;
};

const buildPanels = (divList, options) => {
  const odiv = gdiv(["viewcontextOuterColumnDivType1", "container-sm"]);

  for (let panelIndex = 0; panelIndex < 10; panelIndex++) {
    //see if any panle with this index
    const divsInCurPanel = divList.filter((divs) => divs.panel == panelIndex);
    // quit looping if no divs in this panelID
    if (divsInCurPanel.length == 0) {
      break;
    }
    let panelWidth = options?.panels[panelIndex].panelWidth ?? 1;

    const curPanelDiv = gdiv(["viewContextPanel"], {
      css: { width: `${panelWidth *100}%`},
    });

    //now iterate for div in this panel
    for (
      let divIndexinCurPanel = 0;
      divIndexinCurPanel < 5;
      divIndexinCurPanel++
    ) {
      //see if any panle with this index
      const divsInCurDivIndex = divsInCurPanel.filter(
        (divs) => divs.div == divIndexinCurPanel
      );
      // quit looping if no divs in this panelID
      if (divsInCurDivIndex.length == 0) {
        break;
      }
      const curDiv = gdiv(["viewContextColumnDiv"]);
      //sort by rows
      divsInCurDivIndex.sort((a, b) => {
        return a.row - b.row;
      });

      divsInCurDivIndex.forEach((element) => {
        curDiv.appendChild(element.divElement);
      });

      curPanelDiv.appendChild(curDiv);
    }

    if (curPanelDiv.childElementCount > 0) odiv.appendChild(curPanelDiv);
  }

  return odiv;
};
