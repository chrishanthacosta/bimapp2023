import { appDiv } from "./index-febe";
import { setupInitialLoginPage } from "./src/app-initializers.js/1setup-initial-login-page";
import {   setupNewOpenSelectionPopup } from './src/app-initializers.js/2setup-new-open-selection';
import { showNewProjectPopup } from './src/app-initializers.js/3setup-new-project-popup';
import { Subject } from 'rxjs';




const { loginButton } = setupInitialLoginPage(appDiv);
 
// const projectSelectionCallBack = (selectionObject) => {
//   if (selectionObject == "new") {
//     showNewProjectPopup();
//   } else {
//   }
// };

const projectSelection$ = new Subject();
setupNewOpenSelectionPopup(loginButton, appDiv, projectSelection$);
// {type:"new" | "existing", fileName:"path"}

projectSelection$.subscribe({
    next: (returnValue) => {
        if (returnValue == "new") {
            showNewProjectPopup();
        } else {
            //showExistingOpen()
        }
     }
});


