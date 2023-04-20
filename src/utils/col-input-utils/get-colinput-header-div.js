import { gdiv, ghidden, glabel } from "../js-utils/jsutils-creation";
import { ginputtext, ginputnumber } from "./../js-utils/jsutils-creation";

export const getColumnInputHeaderDiv = (metadata) => {
  const odiv = gdiv([], {
    css: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      // padding: "0rem 0.5rem",
      backgroundColor: "#34495E",
      color: "white",
    },
  });

  const propNames = Object.keys(metadata);

  for (let index = 0; index < propNames.length; index++) {
    const propName = propNames[index];
    const prop = metadata[propName];

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
            paddingLeft: "4px",
            paddingRight: "20px",
            fontSize: "1.25rem",
          }
        );

        odiv.appendChild(label);
        break;

      default:
        break;
    }
  }

  return odiv;
};

export const getColumnInputColumnDiv = (col, metadata, headerElementRefs) => {
  console.log("headerElementRefs", headerElementRefs);
  const elementRefs = {};
  const odiv = gdiv([], {
    css: {
      display: "flex",
      flexDirection: "column",

      //paddingTop: "0.5rem",
    },
  });

  const propNames = Object.keys(metadata);

  for (let index = 0; index < propNames.length; index++) {
    const propName = propNames[index];
    const prop = metadata[propName];

    switch (prop.inputType) {
      case "number":
        const num = ginputnumber();

        //styles
        const myStyles = `
            width: 4rem;
            font-size: 1.25rem;
            border-Width: 0px;
            border-bottom: 1px solid steelblue;
            border-right: 1px solid steelblue;
            text-align: center;
            outline: none;
           
        `;

        num.style.cssText = myStyles;

        num.value = col?.[propName] ?? null;
        elementRefs[propName] = num;
        odiv.appendChild(num);
        break;
      case "text":
        const txt = ginputtext(
          [],
          {},
          {
            width: "4rem",
            fontSize: "1.25rem",
            borderWidth: "0px",
            textAlign: "center",
            outline: "none",
            borderBottom: "1px solid steelblue",
            borderRight: "1px solid steelblue",
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

  //handle binding events
  for (let index = 0; index < propNames.length; index++) {
    const propName = propNames[index];
    const prop = metadata[propName];

    if (!prop.formula) {
      continue;
    }
    //bind events

    prop.formulaArgs.forEach((arg) => {
      console.log("evt bound arg", arg);
      const curInput = elementRefs[arg];
      //handle external params
      // console.log("evt bound arg ex", arg);
      const dotIndex1 = arg.indexOf(".");

      // console.log("doti", dotIndex1);
      if (dotIndex1 != -1) {
        const exParamName1 = arg.substring(dotIndex1 + 1);
        const headerInput = headerElementRefs[exParamName1];
        const colInput = headerElementRefs[prop.inputKey];
        headerInput.columnInput = colInput;

        headerInput.addEventListener("input", (e) => {
          const columnInput = e.target.columnInput;
          columnInput.recalculateFormulas();
        });

        // curInput.externalParamRefs = headerElementRefs;
      } else {
        console.log("evt bound arg-no dots", arg);
        console.log("elementRefs - inside last col add", elementRefs);
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
          //console.log("args", args);
          const decimalPlaces = e.target.decimalPlaces;
          const formulaValue = e.target.formula(...args);
          e.target.elementRefs[propName].value =
            formulaValue.toFixed(decimalPlaces);
          //now fire the event for addtional event firing
          const eventFire = new Event("input");
          e.target.elementRefs[propName].dispatchEvent(eventFire);
          console.log("event wiring ok-propName", propName);
          console.log("event wiring ok");
        });
      }
    });
  }

  return [odiv, elementRefs];
};
