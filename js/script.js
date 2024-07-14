let rowData = document.querySelector("#row-Data")

// loading screen

$(document).ready(function () {
  $('#loading').fadeOut(1000,()=>{
      $("body").css('overflow','visible');
  });
});

// open sideBar

$("i.fa-bars").on("click", function(){
    $("nav").animate({"left":"0px"}, 500)
    $("nav .fa-xmark").removeClass("d-none")
    $("i.fa-bars").addClass("d-none")

    for(let i =0 ; i <5; i++){
      $(".links li").eq(i).animate({"bottom" : "0px"} , (i + 5) * 100 )
    }
})

// close sideBar

$("i.fa-xmark").on("click", function(){
    $("nav").animate({"left":`-${$(".nav-links").innerWidth()}px`}, 500)
    $("nav .fa-xmark").addClass("d-none")
    $("i.fa-bars").removeClass("d-none")
    $(".links li").animate({"bottom" : "-400px"} , 500)
})
let finalData = [] // array to put all meal in it

async function getMeals(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    let data = await response.json()
    finalData = data.meals.slice(0,20)
    displayMeals(finalData)
}

getMeals()

function displayMeals(finalData){
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-3 p-2 d-flex flex-column gap-3 justify-content-center align-items-center">
                ${finalData[i].strMeal}
                <button onClick="displayDetails(${finalData[i].idMeal})" class=" btn btn-warning rounded-3 mx-auto">show details</button>
                </figcaption>
              </figure>
            </div>
    `
  }
  rowData.innerHTML = cartona
}

function displayDetails(id){
  let cartona = ""
  // loop to know which meal I click it
  for(let i =0 ; i < finalData.length ; i++){
    if(finalData[i].idMeal == id){
      
      // get Recipes
      let Ingredient =``
      for(let x=1 ; x < 20; x ++){
        if(finalData[i][`strIngredient${x}`] != ""){
          Ingredient += `<li class="alert alert-info m-2 p-1">${finalData[i][`strIngredient${x}`]} ${finalData[i][`strMeasure${x}`]}</li>`
        }
      }
      // get Tags
      let tags = ``
      if(finalData[i].strTags != null){
        let ArrTages = (finalData[i].strTags).split(",")
        console.log(ArrTages);
        for(let x=0 ; x < ArrTages.length; x ++){
            tags += `<li class="alert alert-danger m-2 p-1">${ArrTages[x]}</li>`
        }
      }else{
        tags = ``
      }
          // carton incldue all details about meal
      cartona = `
                  <div class="row">
            <i class="fa-solid fa-xmark fs-3 position-absolute"></i>
            <div class="col-md-4">
              <img src="${finalData[i].strMealThumb}" class="w-100 rounded-3 mx-auto" alt="">
              <h3 class="mt-2">${finalData[i].strMeal}</h3>
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
      

      `

    }
    $("#details .container").html(cartona)
    $("#details").css("display", "block")
    $("#details i.fa-xmark").on("click" , function(e){
      $("#details").css("display", "none")
    })
    $(document).on("keydown", function(e) {
      if (e.key === "Escape") {
        $("#details").css("display", "none");
      }
    });
  }
}




//Categories
let categories = document.querySelector("#Categories")
categories.addEventListener("click", getCategories)



  async function getCategories(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let data = await response.json()
    finalData = data.categories.slice(0,20)
    displayCategories(finalData)
}


function displayCategories(finalData){
  $(function(){
    $("#loading").fadeOut(1000)
  })
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
    let des = finalData[i].strCategoryDescription
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strCategoryThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption onClick="getCategoriesMeals('${finalData[i].strCategory}')" id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-4 p-2 d-flex flex-column gap-2 justify-content-center align-items-center">
                ${finalData[i].strCategory}
                <span class="fs-6 text-center fw-normal">${des.split(" ").slice(0, 20).join(" ")}</span>
                </figcaption>
              </figure>
            </div>
    `
  }
  rowData.innerHTML = cartona
}


async function getCategoriesMeals(catName){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`)
  let data = await response.json()
  finalData = data.meals.slice(0,20)
  displayCategoriesType(finalData)
}

function displayCategoriesType(finalData){
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
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
    `
  }
  rowData.innerHTML = cartona
}


// detalis for categories and Area and Ingredients and screach

async function Detalis(id){ 
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let finalData = await data.json();
  displayDetails(finalData); 
}

// display detalis for categories and Area and Ingredients

function displayDetails(finalData){
  console.log(finalData.meals);
  // get Recipes
  let Ingredient =``
  for(let x=1 ; x < 20; x ++){
    if(finalData.meals[0][`strIngredient${x}`] != ""){
      Ingredient += `<li class="alert alert-info m-2 p-1">${finalData.meals[0][`strIngredient${x}`]} ${finalData.meals[0][`strMeasure${x}`]}</li>`
    }
  }
  // get Tags
  let tags = ``
  if(finalData.strTags != null){
    let ArrTages = (finalData.meals[0].strTags).split(",")
    console.log(ArrTages);
    for(let x=0 ; x < ArrTages.length; x ++){
        tags += `<li class="alert alert-danger m-2 p-1">${ArrTages[x]}</li>`
    }
  }else{
    tags = ``
  }
      // carton incldue all details about meal
  let cartona = `
              <div class="row">
        <i class="fa-solid fa-xmark fs-3 position-absolute"></i>
        <div class="col-md-4">
          <img src="${finalData.meals[0].strMealThumb}" class="w-100 rounded-3 mx-auto" alt="">
          <h3 class="mt-2">${finalData.meals[0].strMeal}</h3>
        </div>
        <div class="col-md-8">
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
  

  `
  $("#details .container").html(cartona)
  $("#details").css("display", "block")
  $("#details i.fa-xmark").on("click" , function(e){
    $("#details").css("display", "none")
  })
  $(document).on("keydown", function(e) {
    if (e.key === "Escape") {
      $("#details").css("display", "none");
    }
  });

}

//Area

let Area = document.querySelector("#Area")
Area.addEventListener("click", getarea)


async function getarea(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let data = await response.json()
    finalData = data.meals.slice(0,20)
    displayArea(finalData)
}

function displayArea(finalData){
  $(function(){
    $("#loading").fadeOut(1000)
  })
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
    cartona += `
                <div class="text-center col-md-4 col-lg-3 col-sm-4 text-white cursor" onClick="getAreaMeals('${finalData[i].strArea}')">
              <i class="fa-solid fa-house-laptop fa-8x"></i>
              <p class="fw-bolder fs-5">${finalData[i].strArea}</p>
            </div>
    `
  }
  rowData.innerHTML = cartona
}

async function getAreaMeals(Name){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Name}`)
  let data = await response.json()
  finalData = data.meals.slice(0,20)
  displayAreaType(finalData)
}

function displayAreaType(finalData){
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
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
    `
  }
  rowData.innerHTML = cartona
}


//Ingredients
let Ingredients = document.querySelector("#Ingredients")
Ingredients.addEventListener("click", getIngredients)


async function getIngredients(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let data = await response.json()
    finalData = data.meals.slice(0,20)
    displayIngredients(finalData)
}


function displayIngredients(finalData){
  $(function(){
    $("#loading").fadeOut(1000)
  })
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
    let des = finalData[i].strDescription
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4 text-white cursor text-center " onClick="getIngredientMeals('${finalData[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h4>${finalData[i].strIngredient}</h4>
                <p>${des.split(" ").slice(0, 20).join(" ")}</p>
            </div>
    `
  }
  rowData.innerHTML = cartona
}


async function getIngredientMeals(Name){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Name}`)
  let data = await response.json()
  finalData = data.meals.slice(0,20)
  displayIngredientType(finalData)
}

function displayIngredientType(finalData){
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
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
    `
  }
  rowData.innerHTML = cartona
}

// search
let Search = document.querySelector("#Search")
let searchInputs = document.querySelector("#searchInputs")
Search.addEventListener("click", getSearch)


async function getSearch() {
  rowData.innerHTML=""
  searchInputs.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input type="text" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input type="text" onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" placeholder="Search By First Letter">
      </div>
  </div>
`

}

// search by name
async function searchByName(name){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let data = await response.json()
  finalData = data.meals
  displaysearchByName(finalData)
}
function displaysearchByName(finalData){
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption onClick="Detalis('${finalData[i].idMeal}')" id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-4 p-2 d-flex flex-column gap-2 justify-content-center align-items-center cursor">
                ${finalData[i].strMeal}
                </figcaption>
              </figure>
            </div>
    `
  }
  rowData.innerHTML = cartona
}


//search By litter

async function searchByLetter(letter){
  let response = await fetch(`www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let data = await response.json()
  finalData = data.meals
  displaysearchByLetter(finalData)
}
function displaysearchByLetter(finalData){
  let cartona = ""
  for (let i = 0; i < finalData.length ; i++) {
    cartona += `
                <div class="col-md-4 col-lg-3 col-sm-4">
              <figure id="figure" class="position-relative rounded-3 overflow-hidden">
                <img src="${finalData[i].strMealThumb}" id="mealsImg" class="w-100 rounded-3 " alt="">
                <figcaption onClick="Detalis('${finalData[i].idMeal}')" id="figcaption" class="rounded-3 position-absolute start-0 w-100 h-100 text-black fw-medium fs-4 p-2 d-flex flex-column gap-2 justify-content-center align-items-center cursor">
                ${finalData[i].strMeal}
                </figcaption>
              </figure>
            </div>
    `
  }
  rowData.innerHTML = cartona
}

// contact us 

let contact = document.querySelector("#contact-us")

let sectionContact = document.querySelector("#contact")

contact.addEventListener("click", function(){
  rowData.innerHTML = ""
  sectionContact.classList.remove("d-none")
  sectionContact.classList.add("d-block")
})


let nameInput = document.getElementById("name")
let emailInput = document.getElementById("email")
let pasInput = document.getElementById("password")
let ageInput = document.getElementById("age")
let phoInput = document.getElementById("phone")



let alertName = document.getElementById("alertName")
let alertEmail = document.getElementById("alertEmail")
let alertPas = document.getElementById("alertPas")
let alertage = document.getElementById("alertage")
let alertphone = document.getElementById("alertphone")



nameInput.addEventListener('input',validName)
emailInput.addEventListener('input',validEmail)
pasInput.addEventListener('input', validPas)
ageInput.addEventListener('input', validage)
phoInput.addEventListener('input' , phonevalid)
//   validition

function validName(){
  var regex = /^[a-z]{3,15}$/i
  if(regex.test(nameInput.value)){
    nameInput.classList.add("is-valid")
    nameInput.classList.remove("is-invalid")
    alertName.classList.add("d-none")
    alertName.classList.remove("d-block")
    return true
  }else{
    nameInput.classList.add("is-invalid")
    nameInput.classList.remove("is-valid")
    alertName.classList.remove("d-none")
    alertName.classList.add("d-block")
    return false
  }
}
function validage(){
  if(ageInput.value > 13){
    ageInput.classList.add("is-valid")
    ageInput.classList.remove("is-invalid")
    alertage.classList.add("d-none")
    alertage.classList.remove("d-block")
    return true
  }else{
    ageInput.classList.add("is-invalid")
    ageInput.classList.remove("is-valid")
    alertage.classList.remove("d-none")
    alertage.classList.add("d-block")
    return false
  }
}
function validEmail(){
  var regex = /^\w{3,}@(gmail||yahoo).com$/i
  if(regex.test(emailInput.value)){
    emailInput.classList.add("is-valid")
    emailInput.classList.remove("is-invalid")
    alertEmail.classList.add("d-none")
    alertEmail.classList.remove("d-block")
    return true
  }else{
    emailInput.classList.add("is-invalid")
    emailInput.classList.remove("is-valid")
    alertEmail.classList.remove("d-none")
    alertEmail.classList.add("d-block")
    return false
  }
}
function validPas(){
  var regex = /^\w{5,20}$/i
  if(regex.test(pasInput.value)){
    pasInput.classList.add("is-valid")
    pasInput.classList.remove("is-invalid")
    alertPas.classList.add("d-none")
    alertPas.classList.remove("d-block")
    return true
  }else{
    pasInput.classList.add("is-invalid")
    pasInput.classList.remove("is-valid")
    alertPas.classList.remove("d-none")
    alertPas.classList.add("d-block")
    return false
  }
}

function phonevalid(){
  var regex = /^(010|011|012|015)\d{8}$/
  if(regex.test(phoInput.value)){
    phoInputInput.classList.add("is-valid")
    phoInputInput.classList.remove("is-invalid")
    alertphone.classList.add("d-none")
    alertphone.classList.remove("d-block")
    return true
  }else{
    phoInput.classList.add("is-invalid")
    phoInput.classList.remove("is-valid")
    alertphone.classList.remove("d-none")
    alertphone.classList.add("d-block")
    return false
  }
}


let submitBtn = document.querySelector("#submitBtn")
submitBtn.addEventListener('click', validateAll);


function validateAll(){
  if (validName() == true && ValidAge() == true && validEmail() == true && validPas() == true && phonevalid() ==true) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled");
  }

}

























































$("#contact-us").on("click", function(){
  console.log("hi");
  $("#meals").css("display" , "none")
  $("#contact").removeClass("d-none")

})








