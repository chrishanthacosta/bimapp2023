export const updateViewcontextInputStatus = (model, elementRefs) => {
  const modelKeys = Object.keys(model);
    const unfilledRequiredFieldList = [];
    
  for (let index = 0; index < modelKeys.length; index++) {
    const propModelName = modelKeys[index];
    const propModel = model[propModelName];
    //required
      if (propModel.required) {
         let element = elementRefs[propModelName];
         if (element) {
           if (element.nodeName == "LABEL") {
               if (!element.innerHTML) {
                  unfilledRequiredFieldList.push(propModel.label);
              }
           } else {
              if (!element.value) {
                unfilledRequiredFieldList.push(propModel.label);
              }
           }
         }
    }
 
    }
    let success= true;
    if (unfilledRequiredFieldList.length != 0) {
        success = false;
    }
  return { success, unfilledRequiredFieldList };
};
