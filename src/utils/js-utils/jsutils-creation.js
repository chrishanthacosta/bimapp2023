export class DomElementIdGenerator {
  static lastGeneratedId = 0;
  constructor() {}
  static get NextId() {
    DomElementIdGenerator.lastGeneratedId++;
    return DomElementIdGenerator.lastGeneratedId;
  }
}

export const gelembyid = (id) => {
  return document.getElementById(id);
};

export const gtxtnode = (text) => {
  return document.createTextNode(text);
};

export const gdiv = (
  cssClassList = ["pp"],
  options = { text: "", css: {}, attributes: {} }
) => {
  //creation
  const oDiv = document.createElement("DIV");
  if (options.text) {
    console.log("ddddrrrrr", options.text);
    const txtNode = document.createTextNode(options.text);
    oDiv.appendChild(txtNode);
  }
  //set id
  const divId = "div" + DomElementIdGenerator.NextId;
  oDiv.id = divId;
  //add class list
  cssClassList.forEach((element) => {
    oDiv.classList.add(element);
  });
  //set inline css
  if (options.css) {
    Object.keys(options.css).forEach((element) => {
      oDiv.style[element] = options.css[element];
    });
  }

  //set attributes if any
  if (options.attributes) {
    Object.keys(options.attributes).forEach((element) => {
      oDiv.setAttribute(element, options.attributes[element]);
    });
  }
  return oDiv;
};

export const gbtn = (
  text = "",
  cssClassList = [],
  css = { display: "block" },
  options = { attributes: {} }
) => {
  const btn = document.createElement("BUTTON");
  const txtNode = document.createTextNode(text);
  btn.appendChild(txtNode);

  Object.keys(css).forEach((element) => {
    btn.style[element] = css[element];
  });

  cssClassList.forEach((element) => {
    btn.classList.add(element);
  });

  Object.keys(options).forEach((element) => {
    if (options.attributes[element])
      btn.setAttribute(element, options.attributes[element]);
  });

  return btn;
};

export const gspan = (
  text = "",
  cssClassList = [],
  css = {},
  options = {
    attributes: {},
  }
) => {
  const span = document.createElement("SPAN");
  const txtNode = document.createTextNode(text);
  span.appendChild(txtNode);

  Object.keys(css).forEach((element) => {
    span.style[element] = css[element];
  });

  cssClassList.forEach((element) => {
    span.classList.add(element);
  });
  Object.keys(options.attributes).forEach((element) => {
    span.setAttribute(element, options.attributes[element]);
  });
  return span;
};

export const ginputnumber = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const inum = document.createElement("INPUT");
  inum.type = "number";

  cssClassList.forEach((element) => {
    inum.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    inum.style[element] = css[element];
  });
  if (options.attributes)
    Object.keys(options.attributes).forEach((element) => {
      if (element == "readOnly") {
        if (options.attributes[element]) {
          inum.setAttribute(element, options.attributes[element]);
        }
      } else {
        inum.setAttribute(element, options.attributes[element]);
      }
    });

  return inum;
};

export const glabel = (
  text,
  forParam = "",
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const label = document.createElement("LABEL");
  label.innerHTML = text;

  cssClassList.forEach((element) => {
    label.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    label.style[element] = css[element];
  });

  //for
  if (forParam) label.setAttribute("for", forParam);
  if (options.attributes)
    Object.keys(options.attributes).forEach((element) => {
      label.setAttribute(element, options.attributes[element]);
    });

  return label;
};

export const ginputtext = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const text = document.createElement("INPUT");
  text.type = "text";

  cssClassList.forEach((element) => {
    text.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    text.style[element] = css[element];
  });
  if (options.attributes)
    Object.keys(options.attributes).forEach((element) => {
      if (element == "readOnly") {
        if (options.attributes[element]) {
          text.setAttribute(element, options.attributes[element]);
        }
      } else {
        text.setAttribute(element, options.attributes[element]);
      }
    });

  return text;
};
export const ginputtextsearch = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const text = document.createElement("INPUT");
  text.type = "search";

  cssClassList.forEach((element) => {
    text.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    text.style[element] = css[element];
  });
  if (options.attributes)
    Object.keys(options.attributes).forEach((element) => {
      if (element == "readOnly") {
        if (options.attributes[element]) {
          text.setAttribute(element, options.attributes[element]);
        }
      } else {
        text.setAttribute(element, options.attributes[element]);
      }
    });

  return text;
};
export const ginputemail = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const text = document.createElement("INPUT");
  text.type = "email";

  cssClassList.forEach((element) => {
    text.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    text.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    if (element == "readOnly") {
      if (options.attributes[element]) {
        text.setAttribute(element, options.attributes[element]);
      }
    } else {
      text.setAttribute(element, options.attributes[element]);
    }
  });

  return text;
};

export const ginputdate = (
  defaultValue = "today",
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const date = document.createElement("INPUT");
  date.type = "date";
  if (defaultValue == "today") {
    date.value = new Date().toISOString().slice(0, -14);
  }
  cssClassList.forEach((element) => {
    date.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    date.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    // date.setAttribute(element, options.attributes[element]);

    if (element == "readOnly") {
      if (options.attributes[element])
        date.setAttribute(element, options.attributes[element]);
    } else {
      date.setAttribute(element, options.attributes[element]);
    }
  });

  return date;
  Customer;
};

export const ginputdatetime = (
  defaultValue = "now",
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const time = document.createElement("INPUT");
  time.type = "datetime-local";
  if (defaultValue == "now") {
    const today = new Date();
    const timev =
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getDate() +
      ":" +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();
    time.value = timev;
  }
  cssClassList.forEach((element) => {
    time.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    time.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    // time.setAttribute(element, options.attributes[element]);

    if (element == "readOnly") {
      if (options.attributes[element])
        time.setAttribute(element, options.attributes[element]);
    } else {
      time.setAttribute(element, options.attributes[element]);
    }
  });

  return time;
};

export const ginputtime = (
  defaultValue = "now",
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const time = document.createElement("INPUT");
  time.type = "time";
  if (defaultValue == "now") {
    const today = new Date();
    const timev = today.getHours() + ":" + today.getMinutes();
    time.value = timev;
  }
  cssClassList.forEach((element) => {
    time.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    time.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    // time.setAttribute(element, options.attributes[element]);

    if (element == "readOnly") {
      if (options.attributes[element])
        time.setAttribute(element, options.attributes[element]);
    } else {
      time.setAttribute(element, options.attributes[element]);
    }
  });

  return time;
};
export const ginputcheckbox = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const chk = document.createElement("INPUT");
  chk.type = "checkbox";

  cssClassList.forEach((element) => {
    chk.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    chk.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    // chk.setAttribute(element, options.attributes[element]);

    if (element == "readOnly") {
      if (options.attributes[element])
        chk.setAttribute(element, options.attributes[element]);
    } else {
      chk.setAttribute(element, options.attributes[element]);
    }
  });

  return chk;
};

export const gatag = (
  href,
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const atag = document.createElement("A");
  atag.href = href;

  cssClassList.forEach((element) => {
    atag.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    atag.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    atag.setAttribute(element, options.attributes[element]);
  });

  return atag;
};

export const ginputtextarea = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const textarea = document.createElement("TEXTAREA");

  cssClassList.forEach((element) => {
    textarea.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    textarea.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    if (element == "readOnly") {
      if (options.attributes[element]) {
        textarea.setAttribute(element, options.attributes[element]);
      }
    } else {
      textarea.setAttribute(element, options.attributes[element]);
    }
  });

  return textarea;
};

export const gselect = (
  selectOptions = [],
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  // console.log("sel ops",selectOptions)
  const select = document.createElement("SELECT");

  //add options
  for (let i = 0; i < selectOptions.length - 1; i += 2) {
    const option = document.createElement("option");
    option.value = selectOptions[i + 1];
    option.text = selectOptions[i];
    select.appendChild(option);
  }

  cssClassList.forEach((element) => {
    select.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    select.style[element] = css[element];
  });

  if (options.attributes) {
    Object.keys(options.attributes).forEach((element) => {
      if (element == "readOnly") {
        if (options.attributes[element]) {
          select.setAttribute(element, options.attributes[element]);
        }
      } else {
        select.setAttribute(element, options.attributes[element]);
      }
    });
  }
  return select;
};

export const growinput = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const rowinput = document.createElement("row-input");
  //rowinput.innerHTML = text;

  cssClassList.forEach((element) => {
    rowinput.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    rowinput.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    rowinput.setAttribute(element, options.attributes[element]);
  });

  return rowinput;
};
export const gcolumninput = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const colinput = document.createElement("column-input");
  //colinput.innerHTML = text;

  cssClassList.forEach((element) => {
    colinput.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    colinput.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    colinput.setAttribute(element, options.attributes[element]);
  });

  return colinput;
};

export const ghidden = (
  cssClassList = [],
  options = { attributes: {} }, //minValue,maxValue
  css = {}
) => {
  const hidden = document.createElement("INPUT");
  hidden.type = "hidden";

  cssClassList.forEach((element) => {
    hidden.classList.add(element);
  });

  Object.keys(css).forEach((element) => {
    hidden.style[element] = css[element];
  });

  Object.keys(options.attributes).forEach((element) => {
    if (element == "readOnly") {
      if (options.attributes[element]) {
        hidden.setAttribute(element, options.attributes[element]);
      }
    } else {
      hidden.setAttribute(element, options.attributes[element]);
    }
  });

  return hidden;
};
