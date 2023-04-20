

export const getComparisonOriginalData = (originalData, currentData, metaData) => {
    console.log("ori data", originalData);
    console.log("cur data",currentData)
    const result = {}
    const updateProps={}
    const originalKeys = Object.keys(originalData)
    let primaryKeyValue;
    if (originalKeys.length == 0) {
        result.objectState = "new";
      result.currentData = currentData;
      console.log("comaprison end - new onj")
        return result;
    }

    let objectState = "pristine"; // dirty
    originalKeys.forEach(propName => {
        const propValue = originalData[propName];
        const curValue = currentData[propName];
        if (Array.isArray(propValue)) {
            if (propValue.length != curValue.length) {
                 updateProps[propName] = curValue;
                 objectState = "dirty";
            } else {
              for (let index = 0; index < propValue.length; index++) {
                const oriRow = propValue[index];
                const curRow = curValue[index];
                console.log("oriRow:", oriRow);
                console.log("curRow", curRow);
                if (!compareTwoObjects(oriRow, curRow)) {
                  console.log("diff objs");
                  updateProps[propName] = currentData[propName];
                  objectState = "dirty";
                  break;
                }
              }
            }
        } else {
             if (currentData[propName] != propValue) {
               objectState = "dirty";
               updateProps[propName] = currentData[propName];
             }
        }
        if (propName == metaData.primaryKeyName) {
            primaryKeyValue = currentData[metaData.primaryKeyName];
        }
    });

    if (objectState == "pristine") {
        result.objectState = objectState;
    } else {
        result.objectState = objectState;
        result.updateProps = updateProps;
        result.primaryKeyValue = primaryKeyValue;
    }

    console.log("resul from compare-data",result)
    return result;
}

const compareTwoObjects = (obj1, obj2) => {
    
    const obj1Keys = Object.keys(obj1).sort();
    const obj2Keys = Object.keys(obj2).sort();

    const areEqual = obj1Keys.every((key, index) => {
      const objValue1 = obj1[key];
      const objValue2 = obj2[key];
      return objValue1 === objValue2;
    });
    console.log("compareTwoObjects:", areEqual);
    return areEqual;
}