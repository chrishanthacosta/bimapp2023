

export const getDataFromViewcontext = (
  model,
  elementRefs,
  serializeOnly = true
) => {
  // console.log("model", model)
   //console.log("elemetrefs",elementRefs)
  const modelKeys = Object.keys(model);
  const data = {};
  for (let index = 0; index < modelKeys.length; index++) {
    const propName = modelKeys[index];
    const prop = model[propName];
    //
    if (serializeOnly) {
      if (!prop.serialize) {
        continue;
      }
    }

      let element = elementRefs[propName];
    if (element) {
      if (element.nodeName == "LABEL") {
        data[propName] = element.innerHTML;
      } else {
         data[propName] = element.value;
      }
      }
    
  }
  console.log("data from getDataFromViewcontext ", data);
  return data;
};


 
