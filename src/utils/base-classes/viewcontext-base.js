import { gdiv } from "../js-utils/jsutils-creation";
import { Subject } from "rxjs";
import { updateViewcontextInputStatus } from "../framework-utils/validate-viewcontext-inputfields";
import { getViewContextValidateTextForModal } from "../framework-utils/viewcontext-helpers/ui-validate-result";
import { showSearchModalType2 } from "../../ui-widgets/modal-type1/modal-type2";
import { updateViewContextData } from "../framework-utils/update-viewcontext-data";
import { showSnackbar } from "../../ui-widgets/snackbar/snack-bar";
import { updateViewcontextNewId } from "../framework-utils/update-viewcontext-newid";
import { getDataFromViewcontext } from "../framework-utils/get-data-from-viewcontext";
import { getComparisonOriginalData } from "../framework-utils/compare-original-data";
import { getPrimaryKeyValue } from "../framework-utils/get-PrimaryKey-Value";
import { showSearchModalType1 } from "../../ui-widgets/modal-type1/modal-type1";
import { ShowPrintUIType1 } from "../../ui-widgets/print/show-print-ui-type1";
import { showEntityBrowserType1 } from "./../../ui-widgets/entity-browser-type1/show-entity-browser";
import { showSearchModalType3 } from './../../ui-widgets/modal-type1/modal-type3-buttons';

export class ViewContextBase {
  constructor(
    model,
    metaData,
    entityDbService,
    divTemplateFunction,
    viewcontextLayoutOptions
  ) {
    this.divTemplateFunction = divTemplateFunction;
    this.viewcontextLayoutOptions = viewcontextLayoutOptions;
    this.entityDbService = entityDbService;
    this.metaData = metaData;
    this.model = model;
    this.OuterDiv = gdiv(["viewContextBase"]);
    this.toolBarActionSubject = new Subject();

    this.originalData = {};
  }

  async Initialize() {
    const result = await this.divTemplateFunction(
      this.model,
      {},
      this.viewcontextLayoutOptions
    );
    this.elementRefs = result.elementRefs;
    // console.log("this.elementRefs", this.elementRefs);
    const singleColumnDiv = result.div;

    this.OuterDiv.appendChild(singleColumnDiv);
    await this.SetupToolBarActionSubject();

    this.DoPostInitailizeActions();
  }

  DoPostInitailizeActions() {
    //dummy func stub to hold place
    //concrete implementation at concrete view contwxt class - ie: customer-viewcontext etc
  }

  getBasicPrintLayout() {
    //dummy func stub to hold place
  }

  async GetUIValidationStatus() {
    const uiValidateResult = updateViewcontextInputStatus(
      this.model,
      this.elementRefs
    );
    if (!uiValidateResult.success) {
      const txt = getViewContextValidateTextForModal(
        uiValidateResult.unfilledRequiredFieldList
      );
      const retVal = await showSearchModalType2("Incomplete data....", txt);
    }

    return uiValidateResult.success;
  }

  async SetupToolBarActionSubject() {
    this.toolBarActionSubject.subscribe(async (data) => {
      switch (data.action) {
        case "new":
          console.info("new btn clicked");
          this.originalData = {};
          updateViewContextData(
            this.elementRefs,
            this.originalData,
            this.model
          );
          break;
        case "save":
          console.info("save btn clicked");
          if (await this.GetUIValidationStatus()) {
            await this.Save();
          }

          break;
        case "next":
          const resultObj = await this.GetNext();
          //console.log("next:", resultObj);
          if (resultObj) {
            this.originalData = resultObj;
          } else {
            // this.originalData = {}
            showSnackbar("You are at end of list!");
          }

          updateViewContextData(this.elementRefs, this.originalData);

          break;
        case "previous":
          //console.log("prev:");
          const resultObj1 = await this.GetPrev();
          if (resultObj1) {
            this.originalData = resultObj1;
          } else {
            //this.originalData = {};
            showSnackbar("You are at start of list!");
          }

          updateViewContextData(this.elementRefs, this.originalData);
          break;
        case "get":
          //console.log("get click");
          break;
        case "delete":
          const result = await showSearchModalType3(
            " Deleting Document!",
            "Do you Want to Delete?",
            [
              { text: "Delete", returnValue: "delete", class: "btn-primary" },
              { text: "Cancel", returnValue: "cancel", class: "btn-default"}
            ]
          );
         // console.log("result", result);
          if (result == "delete") {
            const result =await  this.Delete();
            if (result) {
              this.originalData = {};
              updateViewContextData(this.elementRefs, this.originalData);
            }
          }
          break;
        case "search":
          //console.log("search");
          await this.ShowSearch();
          // this.originalData = {};
          // updateViewContextData(this.elementRefs, this.originalData);

          break;
        case "print":
          console.log("print");
          await this.ShowPrint();
          // this.originalData = {};
          // updateViewContextData(this.elementRefs, this.originalData);

          break;

        default:
          break;
      }
    });
  }

  async Save() {
    const currentData = getDataFromViewcontext(this.model, this.elementRefs);

    const comparison = getComparisonOriginalData(
      this.originalData,
      currentData,
      this.metaData
    );

    console.log(" comparison:", comparison);
    const result = await this.entityDbService.save(comparison);
    console.log("result from db service:", result);
    if (comparison.objectState == "new") {
      this.originalData = updateViewcontextNewId(
        this.metaData.primaryKeyName,
        result.data.lastInsertRowid,
        this.elementRefs,
        currentData
      );
    }
    // console.log(" this.originalData2:", this.originalData);
    showSnackbar("Saved....");
  }

  async Delete() {
    const primaryKeyValue = getPrimaryKeyValue(
      this.metaData,
      this.originalData
    );

    if (primaryKeyValue) {
      const result = await this.entityDbService.delete(primaryKeyValue);
      if (result.result == "FAIL") {
         const result1 = await showSearchModalType3(
           " Delete Document Failed!",
           result.message,
           [
             { text: "OK", returnValue: "ok", class: "btn-primary" },
           
           ]
         );
         return false;
      } else {
       
        showSnackbar("Successfully Deleted",);
        return true;
      }
    } else {
      console.log("entity without id to save!!!!");
       return false;
      //new doc - just refersh screen
    }
  }
  async GetEntity(id) {
    if (id == -1) {
      return;
    } else {
      const data = await this.entityDbService.getEntity(id);

      return data;
    }
  }
  async GetNext() {
    const primaryKeyValue =
      getPrimaryKeyValue(this.metaData, this.originalData) ?? 0;
    if (primaryKeyValue == 0) {
      return;
    } else {
      const data = await this.entityDbService.next(primaryKeyValue);

      return data;
    }
  }
  async GetPrev() {
    const primaryKeyValue =
      getPrimaryKeyValue(this.metaData, this.originalData) ?? 0;

    const data = await this.entityDbService.prev(primaryKeyValue);

    return data;
  }

  async ShowSearch() {
    console.log("ShowSearch");
    const sub = await showEntityBrowserType1(
      this.metaData.searchWindowTitle,
      this.metaData.modelPropsToDisplayInSearch,
      [],
      this.entityDbService.searchlist,
      [],
      this.OuterDiv
    );

    sub.subscribe({
      next: async (v) => {
        const resultObj = await this.GetEntity(v.result.id);
        //console.log("next:", resultObj);
        if (resultObj) {
          this.originalData = resultObj;
        } else {
          // this.originalData = {}
          showSnackbar("Entity not Found!");
        }

        updateViewContextData(this.elementRefs, this.originalData);
      },
    });
  }

  async ShowPrint() {
    const currentData = getDataFromViewcontext(this.model, this.elementRefs);
    this.getBasicPrintLayout(currentData);
  }
}
