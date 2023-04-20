import { gatag, gdiv, gspan } from "../../../utils/js-utils/jsutils-creation";
import {
  svgIconDeleteTemplate,
  svgIconNewTemplate,
  svgIconNextTemplate,
  svgIconPreviousTemplate,
  svgIconPrintTemplate,
  svgIconSaveTemplate,
  svgIconSearchTemplate,
} from "./svgIcon-templates";

export const getNewSaveTravSearchToolbarDiv = (subject) => {
  const odiv = gdiv(["toolabarNewSaveTravSearch"]);
  let iconDiv;
  //new
  const atagNew = gatag("#");
  atagNew.toobarActionSubject = subject;
  atagNew.classList.add("toolbar-icons-atag");
  // atagNew.classList.add(  "tooltip");

  const cloneSvgNew = svgIconNewTemplate.content.cloneNode(true);
  atagNew.appendChild(cloneSvgNew);

  atagNew.addEventListener("click", (e) => {
    let toobarActionSubject = e.target.toobarActionSubject;
    if (!toobarActionSubject) {
      toobarActionSubject = e.currentTarget.toobarActionSubject;
    }

    toobarActionSubject.next({ action: "new" });
  });

  iconDiv = gdiv(["toolbar-icon-div","tooltipc"]);
  let s = gspan("Add New", ["tooltiptextc"]);
  iconDiv.appendChild(s);
  iconDiv.appendChild(atagNew);
  //tooltipspan

  odiv.appendChild(iconDiv);

  //save
  const atagSave = gatag("#");
  atagSave.toobarActionSubject = subject;
  atagSave.classList.add("toolbar-icons-atag");

  const cloneSvgSave = svgIconSaveTemplate.content.cloneNode(true);
  atagSave.appendChild(cloneSvgSave);
  atagSave.addEventListener("click", (e) => {
    let toobarActionSubject = e.target.toobarActionSubject;
    if (!toobarActionSubject) {
      toobarActionSubject = e.currentTarget.toobarActionSubject;
    }
    toobarActionSubject.next({ action: "save" });
  });

  iconDiv = gdiv(["toolbar-icon-div", "tooltipc"]);
   s = gspan("Save", ["tooltiptextc"]);
  iconDiv.appendChild(s);
  iconDiv.appendChild(atagSave);
  odiv.appendChild(iconDiv);

  //previous
  const atagPrevious = gatag("#");
  atagPrevious.toobarActionSubject = subject;
  atagPrevious.classList.add("toolbar-icons-atag");
  const cloneSvgPrevious = svgIconPreviousTemplate.content.cloneNode(true);
  atagPrevious.appendChild(cloneSvgPrevious);
  atagPrevious.addEventListener("click", (e) => {
    let toobarActionSubject = e.target.toobarActionSubject;
    if (!toobarActionSubject) {
      toobarActionSubject = e.currentTarget.toobarActionSubject;
    }
    toobarActionSubject.next({ action: "previous" });
  });

  iconDiv = gdiv(["toolbar-icon-div", "tooltipc"]);
  s = gspan("Previous Item", ["tooltiptextc"]);
  iconDiv.appendChild(s);
  iconDiv.appendChild(atagPrevious);
  odiv.appendChild(iconDiv);

  //next
  const atagNext = gatag("#");
  atagNext.toobarActionSubject = subject;
  atagNext.classList.add("toolbar-icons-atag");
  const cloneSvgNext = svgIconNextTemplate.content.cloneNode(true);
  atagNext.appendChild(cloneSvgNext);
  atagNext.addEventListener("click", (e) => {
    let toobarActionSubject = e.target.toobarActionSubject;
    if (!toobarActionSubject) {
      toobarActionSubject = e.currentTarget.toobarActionSubject;
    }
    toobarActionSubject.next({ action: "next" });
  });
  iconDiv = gdiv(["toolbar-icon-div", "tooltipc"]);
  s = gspan("Next Item", ["tooltiptextc"]);
  iconDiv.appendChild(s);
  iconDiv.appendChild(atagNext);
  odiv.appendChild(iconDiv);

  //delete svgIconDeleteTemplate
  const atagDelete = gatag("#");
  atagDelete.toobarActionSubject = subject;
  atagDelete.classList.add("toolbar-icons-atag");
  const cloneSvgDelete = svgIconDeleteTemplate.content.cloneNode(true);
  atagDelete.appendChild(cloneSvgDelete);
  atagDelete.addEventListener("click", (e) => {
    let toobarActionSubject = e.target.toobarActionSubject;
    if (!toobarActionSubject) {
      toobarActionSubject = e.currentTarget.toobarActionSubject;
    }
    toobarActionSubject.next({ action: "delete" });
  });
  iconDiv = gdiv(["toolbar-icon-div", "tooltipc"]);
  s = gspan("Delete", ["tooltiptextc"]);
  iconDiv.appendChild(s);
  iconDiv.appendChild(atagDelete);
  odiv.appendChild(iconDiv);

  //search svgIconSearchTemplate
  const atagSearch = gatag("#");
  atagSearch.toobarActionSubject = subject;
  atagSearch.classList.add("toolbar-icons-atag");
  const cloneSvgSearch = svgIconSearchTemplate.content.cloneNode(true);
  atagSearch.appendChild(cloneSvgSearch);
  atagSearch.addEventListener("click", (e) => {
    let toobarActionSubject = e.target.toobarActionSubject;
    if (!toobarActionSubject) {
      toobarActionSubject = e.currentTarget.toobarActionSubject;
    }
    toobarActionSubject.next({ action: "search" });
  });
  iconDiv = gdiv(["toolbar-icon-div", "tooltipc"]);
  s = gspan("Search", ["tooltiptextc"]);
  iconDiv.appendChild(s);
  iconDiv.appendChild(atagSearch);
  odiv.appendChild(iconDiv);

  //search svgIconSearchTemplate
  const atagPrint = gatag("#");
  atagPrint.toobarActionSubject = subject;
  atagPrint.classList.add("toolbar-icons-atag");
  const cloneSvgPrint = svgIconPrintTemplate.content.cloneNode(true);
  atagPrint.appendChild(cloneSvgPrint);
  atagPrint.addEventListener("click", (e) => {
    let toobarActionSubject = e.target.toobarActionSubject;
    if (!toobarActionSubject) {
      toobarActionSubject = e.currentTarget.toobarActionSubject;
    }
    toobarActionSubject.next({ action: "print" });
  });
  iconDiv = gdiv(["toolbar-icon-div", "tooltipc"]);
  s = gspan("Print", ["tooltiptextc"]);
  iconDiv.appendChild(s);
  iconDiv.appendChild(atagPrint);
  odiv.appendChild(iconDiv);

  //test tooltip
  //  let td = gdiv([ "tooltipc"],{text:"ppp"});
  // let s = gspan("Add New", ["tooltiptextc"]);
  // td.appendChild(s);
  // odiv.appendChild(td)sd
  //return
  return odiv;
};
