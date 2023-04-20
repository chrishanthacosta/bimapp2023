import { showSearchModalType3 } from "./../ui-widgets/modal-type1/modal-type3-buttons";

export const setupNewOpenSelectionPopup = (loginButton, appDiv) => {
  console.log("btn", loginButton);
  loginButton.appDiv = appDiv;
  loginButton.addEventListener("click", loginButtonHandler);
};

const loginButtonHandler = async (e) => {
  const appDiv = e.target.appDiv;
    appDiv.firstElementChild.remove();
    console.log("appDiv", appDiv.firstChild);
  await showSearchModalType3("Select Project", "", [
    { text: "New Project", returnValue: "new", class: "btn-primary" },
  ]);
};
