import { gdiv, ghidden, glabel } from "../js-utils/jsutils-creation";
import { ginputtext, ginputnumber } from "./../js-utils/jsutils-creation";

export const getRowInputHeaderDiv = (metadata) => {
  const odiv = gdiv([], {
    css: {
      display: "flex",
      width:"100%",
      justifyContent: "flex-start",
      //   padding: "0.5rem",
    },
  });

  const propNames = Object.keys(metadata);

  for (let index = 0; index < propNames.length; index++) {
    const propName = propNames[index];
    const prop = metadata[propName];
    //console.log("prop",prop)
    switch (prop.inputType) {
      case "text":
      case "number":
        const label = glabel(
          prop.label,
          "",
          [],
          {},
          {
            lineHeight: "normal",
            width: "100%",
            display: "inline-block",
            backgroundColor: "#34495E",
            textAlign: "center",
            color: "white",
          
          }
        );
        const div = gdiv([], {
          css: {
           // width: "100%",
            flexGrow: prop.listOptions.flexGrow,
            flexBasis: prop.listOptions.flexBasis,
            flexShrink: prop.listOptions.flexShrink,
            paddingLeft: "2px",
            display: "flex",
            justifyContent: "center",
          },
        });
        div.appendChild(label);
        odiv.appendChild(div);
        break;

      default:
        break;
    }
  }

  return odiv;
};

export const getRowInputRowDiv = (col, metadata, headerElementRefs) => {
  //console.log("headerElementRefs", headerElementRefs);
  const elementRefs = {};
  const odiv = gdiv([], {
    css: {
      display: "flex",
      justifyContent: "flex-start",
      borderBottom: "1px solid steelblue",
      width: "100%",
      //   paddingTop: "0.5rem",
    },
  });

  const propNames = Object.keys(metadata);

  for (let index = 0; index < propNames.length; index++) {
    const propName = propNames[index];
    const prop = metadata[propName];

    switch (prop.inputType) {
      case "number":
        const num = ginputnumber(
          [],
          {},
          {
            width: "100px",
            fontSize: "1rem",
            borderWidth: "0px",
            textAlign: "center",
            outline: "none",
            flexGrow: prop.listOptions.flexGrow,
            flexBasis: prop.listOptions.flexBasis,
            flexShrink: prop.listOptions.flexShrink,
          }
        );
        num.value = col?.[propName] ?? null;
        elementRefs[propName] = num;
        odiv.appendChild(num);
        break;

      case "text":
        const txt = ginputtext(
          [],
          {},
          {
            width: "100px",
            fontSize: "1rem",
            borderWidth: "0px",
            textAlign: "center",
            outline: "none",
            flexGrow: prop.listOptions.flexGrow,
            flexBasis: prop.listOptions.flexBasis,
            flexShrink: prop.listOptions.flexShrink,
          }
        );

        txt.value = col?.[propName] ?? null;
        elementRefs[propName] = txt;
        odiv.appendChild(txt);
        break;
      case "hidden":
        const hid = ghidden();
        hid.value = col?.[propName] ?? null;
        elementRefs[propName] = hid;
        odiv.appendChild(hid);
        break;

      default:
        break;
    }
  }

  //handle binding events for formulas
  for (let index = 0; index < propNames.length; index++) {
    const propName = propNames[index];
    const prop = metadata[propName];

    if (!prop.formula) {
      continue;
    }
    //bind events

    prop.formulaArgs.forEach((arg) => {
      //  console.log("evt bound arg", arg);
      const curInput = elementRefs[arg];
      //handle external params
      //console.log("evt bound arg ex", arg);
      const dotIndex1 = arg.indexOf(".");

     // console.log("doti", dotIndex1);
      if (dotIndex1 != -1) {
        const exParamName1 = arg.substring(dotIndex1 + 1);
        const headerInput = headerElementRefs[exParamName1];
        const rowInput = headerElementRefs[prop.inputKey];
        headerInput.rowInput = rowInput;

        headerInput.addEventListener("input", (e) => {
          const rowInput = e.target.rowInput;
          rowInput.recalculateFormulas();
        });

        // curInput.externalParamRefs = headerElementRefs;
      } else {
       // console.log("evt bound arg", arg);
        curInput.elementRefs = elementRefs;
        curInput.formula = prop.formula;
        curInput.formulaArgs = prop.formulaArgs;
        curInput.externalParamRefs = headerElementRefs;
        curInput.decimalPlaces = prop.decimalPlaces;

        curInput.addEventListener("input", (e) => {
          const args = [];
          e.target.formulaArgs.forEach((arg) => {
            const dotIndex = arg.indexOf(".");

            if (dotIndex != -1) {
              const exParamName = arg.substring(dotIndex + 1);
              // console.log("exParamName", exParamName);
              // console.log(
              //   "e.target.externalParamRefs ",
              //   e.target.externalParamRefs
              // );
              args.push(e.target.externalParamRefs[exParamName].value);
            } else {
              args.push(e.target.elementRefs[arg].value);
            }
          });

         // console.log("args", args);
          const decimalPlaces = e.target.decimalPlaces;
          const formulaValue = e.target.formula(...args);
          e.target.elementRefs[propName].value =
            formulaValue.toFixed(decimalPlaces);
          //now fire the event for addtional event firing
          const eventFire = new Event("input");
          e.target.elementRefs[propName].dispatchEvent(eventFire);
          //console.log("event wiring ok-propName", propName);
         // console.log("event wiring ok");
        });
      }
    });
  }

  // handle numeric decimal place events
  for (let index = 0; index < propNames.length; index++) {
    const propName = propNames[index];
    const prop = metadata[propName];

    if (
      prop.inputType != "number" ||
      prop.formula ||
      prop.decimalPlaces == undefined
    ) {
      continue;
    }
    const curInput = elementRefs[propName];
    curInput.decimalPlaces = prop.decimalPlaces;

    curInput.addEventListener("input", (e) => {
      const decimalPlaces = e.target.decimalPlaces;
      const minValue = e.target.minValue;
      const maxValue = e.target.maxValue;
      var t = e.target.value;
      const indexofDot = t.indexOf(".");
      if (indexofDot > 0) {
        if (decimalPlaces != 0) {
          const decimaltypedcount = t.length - indexofDot - 1;

          if (decimaltypedcount > decimalPlaces) {
            const extradecimals = decimaltypedcount - decimalPlaces;
            e.target.value = t.substr(0, t.length - extradecimals);
          }
        } else {
          e.target.value = t.substr(0, indexofDot);
        }
      }
    });
  }

  return [odiv, elementRefs];
};
