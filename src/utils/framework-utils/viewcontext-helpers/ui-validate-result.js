
export const getViewContextValidateTextForModal = (unfilledInputFieldList) => {

    let txt = "Following Fields are REQUIRED: \n";

    txt += unfilledInputFieldList.join(", ");
    return txt;
}