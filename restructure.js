"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
let currentList = [];
let student;

function start() {
  const background = document.querySelector(".modal-background");
  const modal = document.querySelector(".modal-content");
  background.addEventListener("click", function() {
    background.classList.add("hide");
    modal.classList.remove(whatHouse);
  });
  fetch("https://petlatkea.dk/2020/hogwarts/students.json")
    .then(res => res.json())
    .then(split);
  //console.log("start");
  //function createFilteredList(){//
  const searchBar = document.getElementById("searchBar");
  let hpCharacters = [];
  console.log(searchBar);
  searchBar.addEventListener("keyup", e => {
    console.log(e.target.value);
    const filteredStudents = allStudents.filter(singleStudent => {
      return (
        singleStudent.name.includes(searchString) ||
        singleStudent.house.includes(searchString)
      );
    });
    console.log(filteredStudents);
    searchString();
  });

  //selecting buttons-------------
  document
    .querySelector("[data-filter='Gryffindor']")
    .addEventListener("click", filterGryffindor);
  document
    .querySelector("[data-filter='Hufflepuff']")
    .addEventListener("click", filterHufflepuff);
  document
    .querySelector("[data-filter='Ravenclaw']")
    .addEventListener("click", filterRavenclaw);
  document
    .querySelector("[data-filter='Slytherin']")
    .addEventListener("click", filterSlytherin);
  document
    .querySelector("[data-filter='all']")
    .addEventListener("click", showAll);
}
//filtering------------
function displayList(currentList) {
  document.querySelector("ul").innerHTML = "";
  currentList.forEach(create);
}

function filterGryffindor() {
  currentList = allStudents.filter(Gryffindor);
  displayList(currentList);
}

function filterHufflepuff() {
  currentList = allStudents.filter(Hufflepuff);
  displayList(currentList);
}
function filterRavenclaw() {
  currentList = allStudents.filter(Ravenclaw);
  displayList(currentList);
}
function filterSlytherin() {
  currentList = allStudents.filter(Slytherin);
  displayList(currentList);
}
function showAll() {
  currentList = allStudents.filter(All);
  displayList(currentList);
}

function Gryffindor(singleStudent) {
  return singleStudent.house === "Gryffindor";
}
function Hufflepuff(singleStudent) {
  return singleStudent.house === "Hufflepuff";
}
function Ravenclaw(singleStudent) {
  return singleStudent.house === "Ravenclaw";
}
function Slytherin(singleStudent) {
  return singleStudent.house === "Slytherin";
}

function All(singleStudent) {
  return singleStudent;
}

function split(list) {
  list.forEach(makeAllStudents);
  allStudents.forEach(create);
  // console.log("split");
}
/*-----------Object Template-------------*/
function makeAllStudents(theStudent) {
  let singleStudent = {
    firstName: "",
    middleName: undefined,
    lastName: undefined,
    nickName: undefined,
    image: null,
    house: "",
    prefect: "☆"
  };
  console.log("makeAllStudents");

  theStudent.fullname = theStudent.fullname.trim();
  //
  if (theStudent.fullname.indexOf(" ") > 0) {
    singleStudent.firstName = theStudent.fullname.substring(
      0,
      theStudent.fullname.indexOf(" ")
    );
  } else {
    singleStudent.firstName = theStudent.fullname;
  }
  singleStudent.firstName =
    singleStudent.firstName.charAt(0).toUpperCase() +
    singleStudent.firstName.substring(1).toLowerCase();

  //
  if (theStudent.fullname.indexOf(" ") > 0) {
    singleStudent.lastName = theStudent.fullname.substring(
      theStudent.fullname.lastIndexOf(" ") + 1
    );
    singleStudent.lastName =
      singleStudent.lastName.charAt(0).toUpperCase() +
      singleStudent.lastName.substring(1).toLowerCase();

    //console.log(singleStudent.firstName + " " + singleStudent.lastName);
  }

  if (
    theStudent.fullname.indexOf(" ") != theStudent.fullname.lastIndexOf(" ")
  ) {
    if (theStudent.fullname.indexOf(`"`) > 0) {
      singleStudent.nickName = theStudent.fullname.substring(
        theStudent.fullname.indexOf(`"`),
        theStudent.fullname.lastIndexOf(`"`) + 1
      );
      singleStudent.nickName =
        singleStudent.nickName.charAt(0) +
        singleStudent.nickName.charAt(1).toUpperCase() +
        singleStudent.nickName.substring(2).toLowerCase();
    } else {
      singleStudent.middleName = theStudent.fullname.substring(
        theStudent.fullname.indexOf(" ") + 1,
        theStudent.fullname.lastIndexOf(" ")
      );
      singleStudent.middleName =
        singleStudent.middleName.charAt(0).toUpperCase() +
        singleStudent.middleName.substring(1).toLowerCase();
    }
  }
  theStudent.house = theStudent.house.trim();
  singleStudent.house = theStudent.house;
  singleStudent.house =
    singleStudent.house.charAt(0).toUpperCase() +
    singleStudent.house.substring(1).toLowerCase();

  allStudents.push(singleStudent);
}

//-----create CORRECTED-NAME ------
let whatHouse;
function create(name) {
  console.log(name);
  const template = document.querySelector("template").content;
  const templateCopy = template.cloneNode(true);
  const studentName = templateCopy.querySelector(".name");
  if (name.middleName) {
    if (name.nickName) {
      if (name.lastName) {
        studentName.textContent = `${name.firstName} ${name.middleName} ${name.nickName} ${name.lastName}`;
      } else {
        studentName.textContent = `${name.firstName} ${name.middleName} ${name.nickName}`;
      }
    } else if (name.lastName) {
      studentName.textContent = `${name.firstName} ${name.middleName} ${name.lastName}`;
    } else {
      studentName.textContent = `${name.firstName} ${name.middleName}`;
    }
  } else if (name.nickName) {
    if (name.lastName) {
      studentName.textContent = `${name.firstName} ${name.nickName} ${name.lastName}`;
    } else {
      studentName.textContent = `${name.firstName} ${name.nickName}`;
    }
  } else if (name.lastName) {
    studentName.textContent = `${name.firstName} ${name.lastName}`;
  } else {
    studentName.textContent = `${name.firstName}`;
  }

  /*---------MODAL POP-UP----------*/
  templateCopy.querySelector(".name").addEventListener("click", function() {
    const background = document.querySelector(".modal-background");
    background.classList.remove("hide");
    const modalName = document.querySelector(".modal-description");
    const house = document.querySelector("h3");
    const modal = document.querySelector(".modal-content");
    const avatar = document.querySelector(".modal-image");
    const prefect = document.querySelector(".prefect");

    /*const griffindor = allStudents.map(theStudent => `${theStudent.house}`);
     */
    modalName.textContent = studentName.textContent;
    house.textContent = name.house;
    prefect.textContent = "Prefect!⭐";
    modal
      .querySelector("[data-field=prefect]")
      .addEventListener("click", showPrefect);
    //crest.setAttribute("src", `images/${name.house}.png`);
    whatHouse = name.house;
    modal.classList.add(whatHouse);
    // console.log(whatHouse);
    modal.dataset.theme = name.house;
  });

  document.querySelector(".wrapper").appendChild(templateCopy);
  //§~~~~~~~ Prefect

  function showPrefect() {
    if (name.prefect == "⭐") {
      name.prefect = "☆";
    } else {
      name.prefect = "⭐";
    }
  }
}
