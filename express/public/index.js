const homeNav = document.querySelector("#home-nav");
const homePage = document.querySelector("#home-page");
homeNav.root = homePage;

const scanNav = document.querySelector("#scan-nav");
const scanPage = document.querySelector("#scan-page");
scanNav.root = scanPage;

const healthNav = document.querySelector("#health-nav");
const healthPage = document.querySelector("#health-page");
healthNav.root = healthPage;

const dietNav = document.querySelector("#diet-nav");
const dietPage = document.querySelector("#diet-page");
dietNav.root = dietPage;

async function submitFoodPic(event) {
  console.log("event.preventDefault()");
  event.preventDefault();
  let form = event.target;
  let res = await fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  });
  await move();
  let json = await res.json();
  console.log(json);
  form.querySelector("img").hidden = false;
  form.querySelector("img").src = "../uploads/" + json.out_filename;

  let items = form.querySelector(".food-items");
  items.textContent = "";

  for (let item of json.items) {
    let node = document.createElement("ion-item");
    let label = document.createElement("ion-label");
    let select = document.createElement("ion-select");
    let delBtn = document.createElement("ion-icon");

    select.classList.add("selectedFood");

    label.textContent = item.label;
    delBtn.name = "close-outline";
    delBtn.style.zIndex = "999";

    delBtn.addEventListener("click", function () {
      node.style.display = "none";
      select.style.display = "none";
      delBtn.style.display = "none";
    });

    for (let suggestion of item.suggestions) {
      let option = document.createElement("ion-select-option");
      option.value = suggestion.id;
      option.textContent = suggestion.name;
      select.appendChild(option);
    }

    node.appendChild(label);
    node.appendChild(select);
    items.appendChild(node);
    node.appendChild(delBtn);

    // form.querySelector(".items").innerHTML += item.label;
  }

  document.querySelector("#calculateCalories").style.display = "inline-block";

  let calculateCalories = document.querySelector("#calculateCalories");
  let selectedAllFood = document.querySelectorAll(".selectedFood");
  calculateCalories.addEventListener("click", function () {
    let foodItems = [];
    for (selectedFood of selectedAllFood) {
      console.log(`select food`, selectedFood);
      if (selectedFood.style.display != "none") {
        let splitArray = selectedFood.getAttribute("aria-label").split(",");
        if (splitArray.length == 1) {
          console.log("Have error");
          return;
        }
        foodItems.push(splitArray[0]);
        // document.querySelector("#calculatedNutritionValue").style.display =
        //   "inline";
      }
    }
    console.log(foodItems);

    let nutrition = [];
    // let result = form.querySelector(".calories-result");
    for (let food of foodItems) {
      for (let item of json.items) {
        for (let suggestion of item.suggestions) {
          if (food == suggestion.name) {
            nutrition.push({
              id: suggestion.id,
              name: suggestion.name,
              energy: suggestion.energy,
              protein: suggestion.protein,
              saturated_fat: suggestion.saturated_fat,
              sodium: suggestion.sodium,
              sugars: suggestion.sugars,
              total_fat: suggestion.total_fat,
              trans_fat: suggestion.trans_fat,
              carbohydrate: suggestion.carbonhydrate,
            });
          }
        }
      }
    }
    console.log(nutrition);
    let template = document.querySelector("template");
    let total_energy = 0;
    let total_protein = 0;
    let total_saturated_fat = 0;
    let total_sodium = 0;
    let total_sugars = 0;
    let total_total_fat = 0;
    let total_trans_fat = 0;
    let total_carbohydrate = 0;

    for (let food of nutrition) {
      total_energy += parseFloat(food.energy);
      total_protein += parseFloat(food.protein);
      total_saturated_fat += parseFloat(food.saturated_fat);
      total_sodium += parseFloat(food.sodium);
      total_sugars += parseFloat(food.sugars);
      total_total_fat += parseFloat(food.total_fat);
      total_trans_fat += parseFloat(food.trans_fat);
      total_carbohydrate += parseFloat(food.carbohydrate);
    }
    let node = template.content
      .querySelector("#calculatedNutritionValue")
      .cloneNode(true);

    node.querySelector("#energy").textContent = total_energy + ` kcal`;
    node.querySelector("#protein").textContent =
      total_protein.toFixed(1) + ` g`;
    node.querySelector("#total_fat").textContent =
      total_total_fat.toFixed(1) + ` g`;
    node.querySelector("#saturated_fat").textContent =
      total_saturated_fat.toFixed(1) + ` g`;
    node.querySelector("#trans_fat").textContent =
      total_trans_fat.toFixed(1) + ` g`;
    node.querySelector("#carbohydrates").textContent =
      total_carbohydrate.toFixed(1) + ` g`;
    node.querySelector("#sugar").textContent = total_sugars.toFixed(1) + ` g`;
    node.querySelector("#sodium").textContent = total_sodium + ` mg`;

    document.querySelector(".total_calculated_result").appendChild(node);
  });
}

function move() {
  return new Promise((resolve, reject) => {
    document.querySelector("#myProgress").hidden = false;
    let elem = document.getElementById("myBar");
    let width = 10;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        // document.querySelector("#myProgress").hidden = true;
        resolve();
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  });
}

let dateTime = document.querySelector("ion-dateTime")
let selectedDate = document.querySelector("#selectedDate")
let dateTimeAccordion = document.querySelector("#dateTimeAccordion")
dateTime.addEventListener("click", function() {
  let dateTimeFormat = dateTime.value.toString().split("T")
  console.log(dateTimeFormat)
  selectedDate.textContent = dateTimeFormat[0];
  dateTimeAccordion.onClick
})
