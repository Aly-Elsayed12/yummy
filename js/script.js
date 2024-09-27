let rowData = document.querySelector("#row-Data");

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let pasInput = document.getElementById("password");
let ageInput = document.getElementById("age");
let phoneInput = document.getElementById("phone");
let rePasInput = document.getElementById("repassword");

let alertName = document.getElementById("alertName");
let alertEmail = document.getElementById("alertEmail");
let alertPas = document.getElementById("alertPas");
let alertAge = document.getElementById("alertage");
let alertPhone = document.getElementById("alertphone");
let alertRePas = document.getElementById("alertRePas");

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.defaultPrevented();
});

// loading screen

$(document).ready(function () {
  getMeals().then(() => {
    $("#loading").fadeOut(500);
  });
});

// open sideBar

$("i.fa-bars").on("click", function () {
  $("nav").animate({ left: "0px" }, 500);
  $("nav .fa-xmark").removeClass("d-none");
  $("i.fa-bars").addClass("d-none");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ bottom: "0px" }, (i + 5) * 100);
  }
});

// close sideBar

function closeSideBar() {
  $("nav").animate({ left: `-${$(".nav-links").innerWidth()}px` }, 500);
  $("nav .fa-xmark").addClass("d-none");
  $("i.fa-bars").removeClass("d-none");
  $(".links li").animate({ bottom: "-400px" }, 500);
}

let finalData = []; // array to put all meal in it

async function getMeals() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let data = await response.json();
  finalData = data.meals.slice(0, 20);
  displayMeals(finalData);
}

getMeals();

function displayMeals(finalData) {
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-3 p-2 d-flex flex-column gap-3 justify-content-center align-items-center">
                ${finalData[i].strMeal}
                <button onClick="Detalis(${finalData[i].idMeal})" class=" btn btn-warning rounded-3 mx-auto">show details</button>
                </figcaption>
              </figure>
            </div>
    `;
  }
  rowData.innerHTML = cartona;
}

function displayDetails(id) {
  closeSideBar();
  let cartona = "";
  // loop to know which meal I click it
  for (let i = 0; i < finalData.length; i++) {
    if (finalData[i].idMeal == id) {
      // get Recipes
      let Ingredient = ``;
      for (let x = 1; x < 20; x++) {
        if (finalData[i][`strIngredient${x}`] != "") {
          Ingredient += `<li class="alert alert-info m-2 p-1">${
            finalData[i][`strIngredient${x}`]
          } ${finalData[i][`strMeasure${x}`]}</li>`;
        }
      }
      // get Tags
      let tags = ``;
      if (finalData[i].strTags != null) {
        let ArrTages = finalData[i].strTags.split(",");
        for (let x = 0; x < ArrTages.length; x++) {
          tags += `<li class="alert alert-danger m-2 p-1">${ArrTages[x]}</li>`;
        }
      } else {
        tags = ``;
      }
      // carton incldue all details about meal
      cartona = `
          <div class="row">
            <div class="col-md-4 position-relative">
              <i class="fa-solid fa-xmark fs-3 position-absolute"></i>
              <div id="img">
              <img src="${finalData[i].strMealThumb}" class="w-100 rounded-3 mx-auto" alt="">
              </div>
              <h3 class="mt-2 d-inline-block w-auto mx-auto">${finalData[i].strMeal}</h3>
            </div>
            <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${finalData[i].strInstructions}</p>
              <h3>Area : ${finalData[i].strArea} </h3>
              <h3>Category : ${finalData[i].strCategory}</h3>
              <h3>Recipes :</h3>
              <div class="Recipes">
                <ul class="list-unstyled d-flex flex-wrap ">
                    ${Ingredient}
                </ul>
              </div>
              <h3>Tags :</h3>
              <div class="tages">
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tags}
                </ul>
              </div>
              <div class="links">
                <button class="btn btn-success me-2"><a class="text-decoration-none text-white" href="${finalData[i].strSource}" target="_blank">socres</a></button>
                <button class="btn btn-danger"><a class="text-decoration-none text-white" href="${finalData[i].strYoutube}" target="_blank">youtype</a></button>
              </div>
            </div>
          </div>
      

      `;
    }
    $("#details .container").html(cartona);
    $("#details").css("display", "block");
    $("#details i.fa-xmark").on("click", function (e) {
      $("#details").css("display", "none");
    });
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        $("#details").css("display", "none");
      }
    });
  }
}

//Categories
let categories = document.querySelector("#Categories");
categories.addEventListener("click", getCategories);

async function getCategories() {
  closeSideBar();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();
  finalData = data.categories.slice(0, 20);
  displayCategories(finalData);
}

function displayCategories(finalData) {
  // $("#details").css("display", "none");

  sectionContact.classList.add("d-none");
  sectionContact.classList.remove("d-block");
  searchInputs.innerHTML = "";
  $(function () {
    $("#loading").fadeOut(1000);
  });
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    let des = finalData[i].strCategoryDescription;
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${
                  finalData[i].strCategoryThumb
                }" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption onClick="getCategoriesMeals('${
                  finalData[i].strCategory
                }')" id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-4 p-2 d-flex flex-column gap-2 justify-content-center align-items-center cursor">
                ${finalData[i].strCategory}
                <span class="fs-6 text-center fw-normal">${des
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</span>
                </figcaption>
              </figure>
            </div>
    `;
  }

  rowData.innerHTML = cartona;
}

async function getCategoriesMeals(catName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
  );
  let data = await response.json();
  finalData = data.meals.slice(0, 20);
  displayCategoriesType(finalData);
}

function displayCategoriesType(finalData) {
  closeSideBar();
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-3 p-2 d-flex flex-column gap-3 justify-content-center align-items-center">
                ${finalData[i].strMeal}
                <button onClick="Detalis('${finalData[i].idMeal}')" class=" btn btn-warning rounded-3 mx-auto">show details</button>
                </figcaption>
              </figure>
            </div>
    `;
  }
  rowData.innerHTML = cartona;
}

// detalis for categories and Area and Ingredients and screach

async function Detalis(id) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let finalData = await data.json();
  displayDetails(finalData);
}

// display detalis for categories and Area and Ingredients

function displayDetails(finalData) {
  closeSideBar();
  // get Recipes
  let Ingredient = ``;
  for (let x = 1; x < 20; x++) {
    if (finalData.meals[0][`strIngredient${x}`] != "") {
      Ingredient += `<li class="alert alert-info m-2 p-1">${
        finalData.meals[0][`strIngredient${x}`]
      } ${finalData.meals[0][`strMeasure${x}`]}</li>`;
    }
  }
  // get Tags
  let tags = ``;
  if (finalData.strTags != null) {
    let ArrTages = finalData.meals[0].strTags.split(",");
    for (let x = 0; x < ArrTages.length; x++) {
      tags += `<li class="alert alert-danger m-2 p-1">${ArrTages[x]}</li>`;
    }
  } else {
    tags = ``;
  }
  // carton incldue all details about meal
  let cartona = `
              <div class="row position-relative pb-5">
        <i class="fa-solid fa-xmark fs-3 position-absolute"></i>
        <div class="col-md-4 col-12">
          <img src="${finalData.meals[0].strMealThumb}" class="w-100 rounded-3 mx-auto" alt="">
          <h3 class="mt-2">${finalData.meals[0].strMeal}</h3>
        </div>
        <div class="col-md-8 col-12">
          <h2>Instructions</h2>
          <p>${finalData.meals[0].strInstructions}</p>
          <h3>Area : ${finalData.meals[0].strArea} </h3>
          <h3>Category : ${finalData.meals[0].strCategory}</h3>
          <h3>Recipes :</h3>
          <div class="Recipes">
            <ul class="list-unstyled d-flex flex-wrap ">
                ${Ingredient}
            </ul>
          </div>
          <h3>Tags :</h3>
          <div class="tages">
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tags}
            </ul>
          </div>
          <div class="links">
            <button class="btn btn-success me-2"><a class="text-decoration-none text-white" href="${finalData.meals[0].strSource}" target="_blank">socres</a></button>
            <button class="btn btn-danger"><a class="text-decoration-none text-white" href="${finalData.meals[0].strYoutube}" target="_blank">youtype</a></button>
          </div>
        </div>
      </div>
  
  `;
  $("#details .container").html(cartona);
  $("#details").css("display", "block");
  rowData.classList.add("d-none");
  $("#details i.fa-xmark").on("click", () => {
    $("#details").css("display", "none");
    rowData.classList.remove("d-none");
  });
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $("#details").css("display", "none");
      rowData.classList.remove("d-none");
    }
  });
}

//Area

let Area = document.querySelector("#Area");
Area.addEventListener("click", getarea);

async function getarea() {
  closeSideBar();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let data = await response.json();
  finalData = data.meals.slice(0, 20);
  displayArea(finalData);
}

function displayArea(finalData) {
  sectionContact.classList.add("d-none");
  sectionContact.classList.remove("d-block");
  searchInputs.innerHTML = "";
  $(function () {
    $("#loading").fadeOut(1000);
  });
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    cartona += `
                <div class="text-center col-md-4 col-lg-3 col-sm-4 text-white cursor" onClick="getAreaMeals('${finalData[i].strArea}')">
              <i class="fa-solid fa-house-laptop fa-8x"></i>
              <p class="fw-bolder fs-5">${finalData[i].strArea}</p>
            </div>
    `;
  }
  rowData.innerHTML = cartona;
}

async function getAreaMeals(Name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Name}`
  );
  let data = await response.json();
  finalData = data.meals.slice(0, 20);
  displayAreaType(finalData);
}

function displayAreaType(finalData) {
  closeSideBar();
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-3 p-2 d-flex flex-column gap-3 justify-content-center align-items-center">
                ${finalData[i].strMeal}
                <button onClick="Detalis('${finalData[i].idMeal}')" class=" btn btn-warning rounded-3 mx-auto">show details</button>
                </figcaption>
              </figure>
            </div>
    `;
  }
  rowData.innerHTML = cartona;
}

//Ingredients
let Ingredients = document.querySelector("#Ingredients");
Ingredients.addEventListener("click", getIngredients);

async function getIngredients() {
  closeSideBar();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let data = await response.json();
  finalData = data.meals.slice(0, 20);
  displayIngredients(finalData);
}

function displayIngredients(finalData) {
  sectionContact.classList.add("d-none");
  sectionContact.classList.remove("d-block");
  rowData.innerHTML = "";
  searchInputs.innerHTML = "";
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    let des = finalData[i].strDescription;
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4 text-white cursor text-center " onClick="getIngredientMeals('${
                  finalData[i].strIngredient
                }')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h4>${finalData[i].strIngredient}</h4>
                <p>${des.split(" ").slice(0, 20).join(" ")}</p>
            </div>
    `;
  }
  rowData.innerHTML = cartona;
}

async function getIngredientMeals(Name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Name}`
  );
  let data = await response.json();
  finalData = data.meals.slice(0, 20);
  displayIngredientType(finalData);
}

function displayIngredientType(finalData) {
  closeSideBar();
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-3 p-2 d-flex flex-column gap-3 justify-content-center align-items-center">
                ${finalData[i].strMeal}
                <button onClick="Detalis('${finalData[i].idMeal}')" class=" btn btn-warning rounded-3 mx-auto">show details</button>
                </figcaption>
              </figure>
            </div>
    `;
  }
  rowData.innerHTML = cartona;
}

// search
let Search = document.querySelector("#Search");
let searchInputs = document.querySelector("#searchInputs");
Search.addEventListener("click", getSearch);

async function getSearch() {
  sectionContact.classList.add("d-none");
  sectionContact.classList.remove("d-block");
  closeSideBar();
  rowData.innerHTML = "";
  searchInputs.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input type="text" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input type="text" onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" placeholder="Search By First Letter">
      </div>
  </div>
`;
}

// search by name
async function searchByName(name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await response.json();
  finalData = data.meals;
  displaysearchByName(finalData);
}
function displaysearchByName(finalData) {
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption onClick="Detalis('${finalData[i].idMeal}')" id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-4 p-2 d-flex flex-column gap-2 justify-content-center align-items-center cursor">
                ${finalData[i].strMeal}
                </figcaption>
              </figure>
            </div>
    `;
  }
  rowData.innerHTML = cartona;
}

//search By litter

async function searchByLetter(letter) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let data = await response.json();
  finalData = data.meals;
  displaysearchByLetter(finalData);
}
function displaysearchByLetter(finalData) {
  let cartona = "";
  for (let i = 0; i < finalData.length; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption onClick="Detalis('${finalData[i].idMeal}')" id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-4 p-2 d-flex flex-column gap-2 justify-content-center align-items-center cursor">
                ${finalData[i].strMeal}
                </figcaption>
              </figure>
            </div>
    `;
  }
  rowData.innerHTML = cartona;
}

// contact us

let contact = document.querySelector("#contact-us");

let sectionContact = document.querySelector("#contact");

contact.addEventListener("click", function () {
  closeSideBar();
  searchInputs.innerHTML = "";
  rowData.innerHTML = "";
  sectionContact.classList.remove("d-none");
  sectionContact.classList.add("d-block");
});

//   validition

function validName() {
  return /^[a-z]{3,15}$/i.test(nameInput.value);
}

function validAge() {
  return /^(1[4-9]|[2-9][0-9]|100)$/.test(ageInput.value);
}

function validEmail() {
  return /^\w{3,}@(gmail||yahoo).com$/i.test(emailInput.value);
}

function validPas() {
  return /^\w{5,20}$/i.test(pasInput.value);
}
function validRePas() {
  return rePasInput.value == pasInput.value;
}
function validPhone() {
  return /^(010|011|012|015)\d{8}$/.test(phoneInput.value);
}

let submitBtn = document.querySelector("#submitBtn");
submitBtn.disabled = true;

function checkValidation(e) {
  if (validName() && e.target.id == "name") {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    alertName.classList.replace("d-block", "d-none");
  } else if (!validName() && e.target.id == "name") {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    alertName.classList.replace("d-none", "d-block");
  }
  if (validAge() && e.target.id == "age") {
    ageInput.classList.add("is-valid");
    ageInput.classList.remove("is-invalid");
    alertAge.classList.replace("d-block", "d-none");
  } else if (!validAge() && e.target.id == "age") {
    ageInput.classList.add("is-invalid");
    ageInput.classList.remove("is-valid");
    alertAge.classList.replace("d-none", "d-block");
  }
  if (validEmail() && e.target.id == "email") {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    alertEmail.classList.replace("d-block", "d-none");
  } else if (!validEmail() && e.target.id == "email") {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    alertEmail.classList.replace("d-none", "d-block");
  }
  if (validPas() && e.target.id == "password") {
    pasInput.classList.add("is-valid");
    pasInput.classList.remove("is-invalid");
    alertPas.classList.replace("d-block", "d-none");
  } else if (!validPas() && e.target.id == "password") {
    pasInput.classList.add("is-invalid");
    pasInput.classList.remove("is-valid");
    alertPas.classList.replace("d-none", "d-block");
  }
  if (validRePas() && e.target.id == "repassword") {
    rePasInput.classList.add("is-valid");
    rePasInput.classList.remove("is-invalid");
    alertRePas.classList.replace("d-block", "d-none");
  } else if (!validRePas() && e.target.id == "repassword") {
    rePasInput.classList.add("is-invalid");
    rePasInput.classList.remove("is-valid");
    alertRePas.classList.replace("d-none", "d-block");
  }
  if (validPhone() && e.target.id == "phone") {
    phoneInput.classList.add("is-valid");
    phoneInput.classList.remove("is-invalid");
    alertPhone.classList.replace("d-block", "d-none");
  } else if (!validPhone() && e.target.id == "phone") {
    phoneInput.classList.add("is-invalid");
    phoneInput.classList.remove("is-valid");
    alertPhone.classList.replace("d-none", "d-block");
  }

  if (
    validName() &&
    validAge() &&
    validEmail() &&
    validPas() &&
    validRePas() &&
    validPhone()
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

nameInput.addEventListener("input", checkValidation);
emailInput.addEventListener("input", checkValidation);
pasInput.addEventListener("input", checkValidation);
ageInput.addEventListener("input", checkValidation);
phoneInput.addEventListener("input", checkValidation);
rePasInput.addEventListener("input", checkValidation);
