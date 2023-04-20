import { Subject } from "rxjs";

export const showEntityBrowserType1 = async (title,
  modelPropsToDisplay = [],
  returnPropNames = [],
  dataRetrieverFunc = () => { },
  args=[],
  browserHostDiv = {},
  options = { multiselect: true,repetitiveselect:false }
) => {
  await import("./../entity-browser-type1/entityBrowserType1-webcomponent");
  await customElements.whenDefined("entity-browsert1");
  const brwwc = document.createElement("entity-browsert1");

  browserHostDiv?.appendChild(brwwc);
 
  const entityBrowserSubject = brwwc.render(
    title,
    modelPropsToDisplay,
    dataRetrieverFunc,
    args,
    options
  );

  brwwc.addEventListener("removed", (e) => {
    //console.log("removed")
    e.target.remove();
  });

  return entityBrowserSubject;
};
