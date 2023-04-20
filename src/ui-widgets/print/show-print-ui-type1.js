export const ShowPrintUIType1 = ( template) => {
  var divContents = document.createElement("DIV");
  divContents.id = "printui";
  //const txt = document.createTextNode("dsgsdgsdgsd");
  //const a = getSampleTemplate();

  divContents.innerHTML = template.innerHTML;

  printDiv(divContents);
};

const printDiv = (divContents) => {
  document.body.appendChild(divContents);

  var a = window.open(
    "",
    "",
    "left=300, height=900, width=600, menubar=no,resizable=no,fullscreen=no"
  );
  a.document.write("<html>");
  a.document.write("<head>");
  a.document.write("<style>");
  a.document.write(`
  * {
  box-sizing: border-box;
}`);

  a.document.write("</style>");
  a.document.write("</head>");
  a.document.write("<body > <div style='position:relative'>");
  a.document.write(divContents.innerHTML);
  a.document.write("</div></body></html>");
  a.document.close();
  const ui = document.getElementById("printui");
  ui.remove();
  //  a.print();
  // divContents.remove();
};

const xgetSampleTemplate = () => {
  const a = document.createElement("template");
  a.innerHTML = `
<div style=" display:flex; position:absolute;width:472.8px; height:33.6px; top:0px; left:80px;font-size:26px; font-weight:bold;justify-content:center; align-items:center; " > 1</div>
<div style=" display:flex; position:absolute;width:472.8px; height:14.4px; top:33.6px; left:80px;font-size:11px; font-weight:normal;justify-content:center; align-items:flex-end; " > Unit 150, 981 Great West Road, Brenford, TW8 9DN</div>
<div style=" display:flex; position:absolute;width:472.8px; height:14.4px; top:48px; left:80px;font-size:11px; font-weight:normal;justify-content:center; align-items:flex-end; " > Tel : +44 020 3948 5008 / +44 020 3883 9577 /www.aandfsourcing.com</div>
<div style=" display:flex; position:absolute;width:472.8px; height:14.4px; top:62.4px; left:80px;font-size:11px; font-weight:normal;justify-content:center; align-items:flex-end; " > VAT Registration Number: 273 8855 56</div>
<div style=" display:flex; position:absolute;width:472.8px; height:14.4px; top:91.2px; left:80px;font-size:11px; font-weight:bold;justify-content:center; align-items:center; " > Purchase Order</div>
<div style=" display:flex; position:absolute;width:48.6px; height:14.4px; top:120px; left:80px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > PO#:ss9196}</div>
<div style=" display:flex; position:absolute;width:55.8px; height:14.4px; top:120px; left:422.6px;font-size:11px; font-weight:normal;justify-content:center; align-items:flex-end; " > PO Date:</div>
<div style=" display:flex; position:absolute;width:18.6px; height:14.4px; top:120px; left:478.4px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > ssdate}</div>
<div style=" display:flex; position:absolute;width:48.6px; height:14.4px; top:134.4px; left:80px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > 1</div>
<div style=" display:flex; position:absolute;width:48.6px; height:14.4px; top:148.8px; left:80px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > Customer:</div>
<div style=" display:flex; position:absolute;width:111.6px; height:14.4px; top:148.8px; left:236.6px;font-size:11px; font-weight:normal;justify-content:center; align-items:flex-end; " > sscustomername}</div>
<div style=" display:flex; position:absolute;width:74.4px; height:14.4px; top:163.2px; left:385.4px;font-size:11px; font-weight:normal;justify-content:center; align-items:flex-end; " > Customer PO #:</div>
<div style=" display:flex; position:absolute;width:93px; height:14.4px; top:163.2px; left:459.8px;font-size:11px; font-weight:normal;justify-content:center; align-items:flex-end; " > sscustomerpono}</div>
<div style=" display:flex; position:absolute;width:48.6px; height:15px; top:177.6px; left:80px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " >  </div>
<div style=" display:flex; position:absolute;width:18.6px; height:15px; top:177.6px; left:128.6px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > 43.2</div>
<div style=" display:flex; position:absolute;width:26.4px; height:15px; top:177.6px; left:173px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > s</div>
<div style=" display:flex; position:absolute;width:193.8px; height:28.8px; top:192.6px; left:80px;font-size:11px; font-weight:normal;justify-content:center; align-items:center; " > 33.6</div>
<div style=" display:flex; position:absolute;width:18.6px; height:14.4px; top:192.6px; left:273.8px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > ss</div>
<div style=" display:flex; position:absolute;width:74.4px; height:43.8px; top:192.6px; left:329.6px;font-size:11px; font-weight:normal;justify-content:center; align-items:flex-end;border-top:1px solid black; border-left:1px solid black;  " > cat</div>
<div style=" display:flex; position:absolute;width:18.6px; height:14.4px; top:207px; left:273.8px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > dd</div>
<div style=" display:flex; position:absolute;width:26.4px; height:15px; top:221.4px; left:173px;font-size:11px; font-weight:normal;justify-content:left; align-items:flex-end; " > s</div>
<div style=" display:flex; position:absolute;width:48.6px; height:14.4px; top:236.4px; left:80px;font-size:11px; font-weight:normal;justify-content:flex-end; align-items:flex-end; " > 33</div>

`;

  return a;
};

const xgetSampleTemplate1 = () => {
  const a = document.createElement("template");
  a.innerHTML = `
    <div style="background-color:red; position:absolute; top:100px; left 100px;" > 1saaaaaaaaaaa</div>
 
`;

  return a;
};
