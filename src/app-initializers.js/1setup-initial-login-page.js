import { gdiv } from "../utils/js-utils/jsutils-creation";
import { showSearchModalType3 } from './../ui-widgets/modal-type1/modal-type3-buttons';

export const setupInitialLoginPage = (appDiv) => {
  const ldiv = gdiv();
  ldiv.innerHTML = loginHtml;

  appDiv.appendChild(ldiv);

  const loginButton = document.getElementById("login-btn");
   // loginButton.addEventListener("click", loginButtonHandler);
    
    return { loginButton };
};



const loginHtml = `
 <div id="login-div">
      <div class="imgcontainer">
        <div style="font-size: 2rem">Bim App</div>
        <img src="./public/logoaf.PNG" alt="Avatar" class="avatar" />
      </div>

      <div class="container-login">
        <label for="company"><b>Company</b></label>
        <input
          id="company-input"
          class="login-inputs"
          type="text"
          placeholder="Enter Company"
          name="company"
          required
        />

         <label for="uname"><b>Username</b></label>
        <input
          id="uname-input"
          class="login-inputs"
          type="text"
          placeholder="Enter Username"
          name="uname"
          required
        />

        <label for="psw"><b>Password</b></label>
        <input
          id="pwd-input"
          class="login-inputs"
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <button id="login-btn" class="button-login" type="submit">Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember
          me
        </label>
      </div>

      <div class="container-login" style="background-color: #f1f1f1">
        <!-- <button class="button-login"  type="button" class="cancelbtn">Cancel</button> -->
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </div>
    `;
