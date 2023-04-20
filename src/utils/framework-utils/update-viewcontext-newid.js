

export const updateViewcontextNewId = (primaryKeyName, newid, elementRefs,modelData) => {
    //update primary key in the eui
    const originalData = {};
    const input = elementRefs[primaryKeyName];
    if (input) {
        if (input.nodeName == "LABEL") {
            
            input.innerHTML = newid;
        } else {
            input.value = newid;
            
        }
       
    }

    //update originalData
    const keys = Object.keys(modelData);
    keys.forEach(element => {
        originalData[element] = modelData[element];
    });
 
    //update latest one received from db
     originalData[primaryKeyName] = newid;
    
    return originalData;
}