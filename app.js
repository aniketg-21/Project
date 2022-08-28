let modal = document.getElementsByClassName("modal")[0];
let tbody = document.getElementsByTagName("tbody")[0];

showRows();

function getObj() {
  let records = localStorage.getItem("records");
  if (records == null) {
    recordsObj = [];
  } else {
    recordsObj = JSON.parse(records);
  }
}

function showRows() {
  getObj();
  let jsonView = document.getElementById("jsonView");
  jsonView.innerHTML = JSON.stringify(recordsObj, null, 4);

  tbody.innerHTML = "";
  Array.from(recordsObj).forEach((rec) => {
    tbody.innerHTML += `<tr>
                          <td>${rec.id}</td>
                          <td>${rec.name}</td>
                          <td>${rec.mobile}</td>
                          <td>${rec.emailId}</td>
                          <td><button id="${rec.id}" onclick="delRow(this.id)" class="del">Delete</button></td>
                        </tr>`;
  });
}

function addRow(id, name, mobile, emailId) {
  let row = `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${mobile}</td>
                <td>${emailId}</td>
                <td><button id="${id}" onclick="delRow(this.id)" class="del">Delete</button></td>
            </tr>`;
  tbody.innerHTML += row;

  let myObj = {
    id: id,
    name: name,
    mobile: mobile,
    emailId: emailId,
  };
  getObj();
  recordsObj.push(myObj);
  localStorage.setItem("records", JSON.stringify(recordsObj));
  showRows();
}

function delRow(id) {
  getObj();
  let index = Array.from(recordsObj).findIndex((rec) => {
    rec.id == id;
  });
  recordsObj.splice(index, 1);
  localStorage.setItem("records", JSON.stringify(recordsObj));
  showRows();
}

function validateId(id) {
  if (id.value == 0) {
    document.getElementById("id_error").hidden = false;
    document.getElementById("id_error").innerHTML = "*This field is required.";
    return false;
  }
  return true;
}
function validateName(name) {
  if (name.value.length === 0 || name.value == " ") {
    document.getElementById("name_error").hidden = false;
    document.getElementById("name_error").innerHTML =
      "*This field is required.";
    return false;
  }
  return true;
}
function validateMobile(mobile) {
  if (
    mobile.value.length < 10 ||
    mobile.value.length > 10 ||
    mobile.value.length == 0
  ) {
    document.getElementById("mobile_error").hidden = false;
    document.getElementById("mobile_error").innerHTML =
      "*Mobile number must contain 10 digits.";
    return false;
  }
  var pattern = /^[0-9]+$/;
  if (!mobile.value.match(pattern)) {
    document.getElementById("mobile_error").hidden = false;
    document.getElementById("mobile_error").innerHTML = "*Invalid phone number";
    return false;
  }
  return true;
}
function validateEmail(email) {
  const pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var atpos = email.value.indexOf("@");
  var dotpos = email.value.lastIndexOf(".");

  if (email.value.length == 0) {
    document.getElementById("email_error").hidden = false;
    document.getElementById("email_error").innerHTML = "*Please Enter Email";
    return false;
  } else if (
    !email.value.match(pattern) ||
    dotpos < atpos + 2 ||
    dotpos + 2 >= email.value.length
  ) {
    document.getElementById("email_error").hidden = false;
    document.getElementById("email_error").innerHTML =
      "*Invalid Email. Please enter @ after text and also use . ";
    return false;
  }
  return true;
}
function clearError() {
  let formErrors = document.getElementsByClassName("formError");
  Array.from(formErrors).forEach((item, i) => {
    item.innerHTML = "";
    item.hidden = true;
  });
}
function validateForm() {
  var id = document.forms["recordDetails"]["recId"];
  var name = document.forms["recordDetails"]["recName"];
  var mobile = document.forms["recordDetails"]["recMobile"];
  var email = document.forms["recordDetails"]["recEmailId"];

  clearError();
  var id_valid = validateId(id);
  var name_valid = validateName(name);
  var email_valid = validateEmail(email);
  var mobile_valid = validateMobile(mobile);

  if (id_valid && name_valid && email_valid && mobile_valid) {
    return true;
  }
  return false;
}

let recordDetails = document.getElementById("recordDetails");
recordDetails.addEventListener("submit", recordFormSubmit);

function recordFormSubmit(e) {
  e.preventDefault();
  if (!validateForm()) {
    return
  }
  let id = document.getElementById("recId").value;
  let recName = document.getElementById("recName").value;
  let recMobile = document.getElementById("recMobile").value;
  let recEmailId = document.getElementById("recEmailId").value;

  addRow(id, recName, recMobile, recEmailId);
  recordDetails.reset();
}

function toggleModal() {
  modal.style.display = modal.style.display == "block" ? "none" : "block";
}

window.onclick = function (event) {
  if (
    event.target === document.getElementsByClassName("close")[0].children[0] ||
    event.target === document.getElementsByClassName("close")[0] ||
    (event.target !== document.getElementById("addBtn") &&
      !modal.contains(event.target))
  ) {
    modal.style.display = "none";
    clearError();
  }
  if (event.target === document.getElementById("submit")) {
  }
};
