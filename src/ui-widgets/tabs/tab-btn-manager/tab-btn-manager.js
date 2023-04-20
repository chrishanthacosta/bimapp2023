import { gdiv } from "./../../../utils/js-utils/jsutils-creation";
import { getTabButtonDiv } from "../tab-button/get-tab-button-div";
export class TabButtonsDivManager {
  constructor(tabButtonManagerSubject) {
    this.tabButtonManagerSubject = tabButtonManagerSubject;
    this.OuterDiv = gdiv(["tabButtonManager"]);
    this.SetupTabButtonManagerSubject();
  }

  AddTab(title, viewContextDivId, closeButton = true) {
    const tabBtnDiv = getTabButtonDiv(
      title,
      viewContextDivId,
      this.tabButtonManagerSubject,
      closeButton
    );

    this.OuterDiv.appendChild(tabBtnDiv);
  }

  SetupTabButtonManagerSubject() {
    this.tabButtonManagerSubject.subscribe(data => {
      if (data.action == "tabButtonSelected") {
        //console.log("t seld");

        this.OuterDiv.childNodes.forEach(element => {
          if (element.id != data.selectedTabButtonId) {
            element.classList.remove("tabButtonSelected");
            //console.log("tabButtonSelected rem");
          }
        });

        
      }
    })
  };
}
