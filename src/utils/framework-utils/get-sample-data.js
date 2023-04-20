
export const getSampleDataFromModel = (model,id) => {
    
    const sampleData ={}

    const keys = Object.keys(model);

    keys.forEach(element => {
        const prop = model[element]
        let value
        switch (prop.type) {
            case Number:
                value = Math.floor(Math.random() * 10);
                break;
          case String:
                value =  element+id
                break;
            default:
                break;
        }


        sampleData[element] = value
    });

    return sampleData;;
}