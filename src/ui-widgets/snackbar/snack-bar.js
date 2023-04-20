export const showSnackbar = (message,durationMilSecs=3000) => {
  // Get the snackbar DIV
  const x = document.getElementById("snackbar");

  const strngEl = document.getElementById("snackbar-text");
  const txtChild = strngEl.childNodes[0];

  if (txtChild) strngEl.removeChild(txtChild);

  const txtx = document.createTextNode(message);

  strngEl.appendChild(txtx);
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, durationMilSecs);
};
