import { showSearchModalType3 } from "./../ui-widgets/modal-type1/modal-type3-buttons";
import { showNewProjectPopup } from './3setup-new-project-popup';

export const setupNewOpenSelectionPopup = async (
  loginButton,
  appDiv,
  projectSelection$
) => {
  loginButton.appDiv = appDiv;
  loginButton.projectSelection$ = projectSelection$;
  loginButton.addEventListener("click", loginButtonHandler);
};

const loginButtonHandler = async (e) => {
  let projectSelection$ = e.target.projectSelection$;

  const appDiv = e.target.appDiv;
    appDiv.firstElementChild.remove();
    console.log("appDiv", appDiv.firstChild);
 const retValue =  await showSearchModalType3("Select Project", "", [
    { text: "New Project", returnValue: "new", class: "btn-primary" },
 ]);
  
  projectSelection$.next(retValue); 
  
 // callBack(retValue);
  // if (retValue == "new") {
  //   showNewProjectPopup();
  // }
};
