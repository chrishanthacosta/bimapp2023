import { gbtn, gdiv } from "../utils/js-utils/jsutils-creation";

 

export const showNewProjectPopup = (
 
) => {
 
 
    const titleText = "Add New Project";
    const contentText = "Content";
    const buttons = [{ text: "OK", returnValue: "OK" }]; //{text:"OK",returnValue:"OK"}

  const mdiv = gdiv();
  mdiv.id = "modal-div";
  mdiv.innerHTML = modalHtml;

  document.body.appendChild(mdiv);

  const modaType1 = document.getElementById("modal-search-type1");
  modaType1.style.display = "block";

  const modalType1CloseSpan = document.getElementsByClassName(
    "close-modal-search-type1"
  )[0];
  modalType1CloseSpan.style.display = "none";
  //handle title
  const titleSpan = document.getElementById("modal-search-type1-title");
  while (titleSpan.firstChild) {
    titleSpan.firstChild.remove();
  }

  titleSpan.appendChild(document.createTextNode(titleText));

  const contentDiv = document.getElementById("modal-content-search-body-type1");

  contentDiv.innerHTML = contentText;

  //set promise
  const retPromise = new Promise((resolve, reject) => {
    // set footer
    const footerDiv = document.getElementById("modal-footer-type1");
    while (footerDiv.firstChild) {
      footerDiv.firstChild.remove();
    }
    if (buttons.length != 0) {
      buttons.forEach((button) => {
        const btn = gbtn(button.text);
        btn.returnValue = button.returnValue;
        btn.classList.add("btn");
        btn.classList.add(button.class);
        btn.addEventListener("click", (e) => {
          const retval = e.target.returnValue;
          resolve(retval);
          const mdiv = document.getElementById("modal-div");
          mdiv.remove();
          //modaType1.style.display = "none";
        });
        footerDiv.appendChild(btn);
      });
    }

    // modalType1CloseSpan.onclick = function () {
    //   modaType1.style.display = "none";
    // };

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //   if (event.target == modaType1) {
    //     modaType1.style.display = "none";
    //   }
    // };
  });

  return retPromise;
  //add content
};

const modalHtml = `
  <div id="modal-search-type1" class="modal-search-type1">
        <!-- Modal content -->
        <div class="modal-content-search-type1">
          <div class="modal-search-type1-title-div">
            <span
              id="modal-search-type1-title"
              class="modal-search-type1-title"
            >
            </span>
            <span class="close-modal-search-type1">&times;</span>
          </div>

          <div
            id="modal-content-search-body-type1"
            class="modal-content-search-body-type1"
          ></div>

          <div id="modal-footer-type1"></div>
        </div>
      </div>`;




 

