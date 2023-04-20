export const updateViewContextData = (elementRefs, data, model) => {
  const propNames = Object.keys(elementRefs);
  const rowColInputs = [];
  propNames.forEach((propName) => {

    const input = elementRefs[propName];
    //console.log("input.nodeName", input.nodeName);
    if (input.nodeName == "LABEL") {
      input.innerHTML = data[propName] ?? null;
    } else if (input.nodeName == "DATE") {
      if (data[propName]) {
        if (model[propName].defaultValue == "today") {
          input.value = Date.now();
        } else {
          input.value = data[propName] ?? null;
        }
      } else {
        input.value = data[propName];
      }
    } else if (input.nodeName == "COLUMN-INPUT" || input.nodeName == "ROW-INPUT") {
      console.log("updateViewContextData-col ele found", data[propName]);
      input.value = data[propName] ?? null;
      rowColInputs.push(input);
    } else {
      input.value = data[propName] ?? null;
    }
  });

  //calculate totals etc..
  rowColInputs.forEach((element) => {
    element.recalculateFormulas();
  });

};
