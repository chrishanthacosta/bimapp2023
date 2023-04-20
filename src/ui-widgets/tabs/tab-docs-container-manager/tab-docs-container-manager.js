import { Subject } from "rxjs";
import { gdiv } from "../../../utils/js-utils/jsutils-creation";
import { TabButtonsDivManager } from "../tab-btn-manager/tab-btn-manager";

export class TabDocsContainerDivManager {
  constructor() {
    this.tabButtonManagerSubject = new Subject();
    this.tabButtonManager = new TabButtonsDivManager(
      this.tabButtonManagerSubject
    );
    this.OuterDiv = gdiv(  ["TabDocsContainerDivManager"]);
    this.OuterDiv.appendChild(this.tabButtonManager.OuterDiv);
    this.docsContainerDiv = gdiv( );

    this.OuterDiv.appendChild(this.docsContainerDiv);

    this.SetUpSubjectObserver();
  }

  SetUpSubjectObserver() {
    this.tabButtonManagerSubject.subscribe((data) => {
      console.log("subscribe", data);
      if (data.action == "tabButtonRemoved") {
        //remove
        const d = document.getElementById(data.viewContextDomElementID);
        d.remove();

        // show last div
        const lastChild = this.docsContainerDiv.lastChild;
        lastChild.style.display = "block";
      } else if (data.action == "tabButtonSelected") {
        console.log("tabButtonSelected");
        const children = this.docsContainerDiv.children;
        for (let i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.id == data.viewContextDomElementID) {
            child.style.display = "block";
          } else {
            child.style.display = "none";
          }
        }
      }
    });
  }

  AddView(title, viewContextDiv, options = { closeButton: true }) {
    //console.log("av", title);
    this.tabButtonManager.AddTab(title, viewContextDiv.id, options.closeButton);

    const children = this.docsContainerDiv.children;
    for (let i = 0; i < children.length; i++) {
      var child = children[i];
      child.style.display = "none";
    }

    this.docsContainerDiv.appendChild(viewContextDiv);
  }
}
