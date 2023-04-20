 

 
export const showSearchModalType2 = (
  titleText,
  contentText,
   
) => {
  const modaType1 = document.getElementById("modal-search-type1");
  modaType1.style.display = "block";

  const modalType1CloseSpan = document.getElementsByClassName(
    "close-modal-search-type1"
  )[0];

  //handle title
  const titleSpan = document.getElementById("modal-search-type1-title");
  titleSpan.appendChild(document.createTextNode(titleText));

  const contentDiv = document.getElementById("modal-content-search-body-type1");

  contentDiv.innerHTML = contentText;
   
    

 
   

  modalType1CloseSpan.onclick = function () {
    modaType1.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modaType1) {
      modaType1.style.display = "none";
    }
  };

  //add content
};
