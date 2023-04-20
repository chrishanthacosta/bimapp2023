import { gbtn, gdiv, gspan } from "../../../utils/js-utils/jsutils-creation";

export const getTabButtonDiv = (
  btnText,
  viewContextDomElementID,
  tabButtonManagerSubject,
  closeButton = true
) => {
  const odiv = gdiv( ["tabButton"]);

  odiv.tabButtonDiv = odiv;
  odiv.tabButtonManagerSubject = tabButtonManagerSubject;
  odiv.viewContextDomElementID = viewContextDomElementID;

  odiv.addEventListener("click", handleDivClick);
  const span = gspan(btnText,  ["tabButtonText"]);
  odiv.appendChild(span);
  if (closeButton) {
    const closeBtn = gbtn("",["tabCloseButton"]);
    closeBtn.innerHTML = "&times;";
    // closeBtn.tabButtonDiv = odiv;
    // closeBtn.tabButtonManagerSubject = tabButtonManagerSubject;
    // closeBtn.viewContextDomElementID = viewContextDomElementID;
    closeBtn.addEventListener("click", handleCloseButton);
    odiv.appendChild(closeBtn);
  }
  return odiv;
};

const handleCloseButton = (e) => {
  console.log("handleCloseButton");
  const t = e.target.parentElement.tabButtonDiv;

  if (t) {
    t.remove();
    const tabButtonManagerSubject =
      e.target.parentElement.tabButtonManagerSubject;
    const viewContextDomElementID =
      e.target.parentElement.viewContextDomElementID;
    if (tabButtonManagerSubject) {
      tabButtonManagerSubject.next({
        action: "tabButtonRemoved",
        viewContextDomElementID,
      });
    }
  }
  e.stopPropagation();
};

const handleDivClick = (e) => {
 
  //apply selected style and remove prev selection
  let selTabDiv = e.target.parentElement;

  if (selTabDiv.nodeName == "DIV") {

    selTabDiv.classList.add("tabButtonSelected");
  }
  else if (e.currentTarget == "DIV") {
    selTabDiv = e.currentTarget;
     selTabDiv.classList.add("tabButtonSelected");
  } else {
    console.log("no l",e)
  }



//set message mechanism
  let tabButtonManagerSubject = e.target.tabButtonManagerSubject;
  let viewContextDomElementID = e.target.viewContextDomElementID;
  if (!tabButtonManagerSubject) {
    tabButtonManagerSubject = e.currentTarget.tabButtonManagerSubject;
    viewContextDomElementID = e.currentTarget.viewContextDomElementID;
  }

  if (tabButtonManagerSubject) {
    //console.log("xxx");
    tabButtonManagerSubject.next({
      action: "tabButtonSelected",
      viewContextDomElementID,
      selectedTabButtonId: selTabDiv.id
    });
  }
 
};
