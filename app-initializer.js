import { appDiv } from "./index-febe";
import { setupInitialLoginPage } from "./src/app-initializers.js/1setup-initial-login-page";
import {   setupNewOpenSelectionPopup } from './src/app-initializers.js/2setup-new-open-selection';




const { loginButton } = setupInitialLoginPage(appDiv);
 
setupNewOpenSelectionPopup(loginButton,appDiv);
