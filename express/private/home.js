let tabs = document.querySelector("ion-tabs");

tabs.addEventListener("ionTabsDidChange", (event) => {
  // console.log(event);
});
tabs.addEventListener("ionTabsWillChange", (event) => {
  // console.log(event);
  if (event.detail.tab === "scan") {
    // console.log("reset scan...");
  }
});

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

//get params
let query = new URL(document.location).searchParams;
let idFromURL = query.get("id");

//assign value to label when clicking date time and meal time

let mealDate = document.querySelector("#mealDate");
let selectedMealDate = document.querySelector("#selectedMealDate");
let mealDateTimeAccordion = document.querySelector("#mealDateTimeAccordion");

mealDate.setAttribute("max", today);

mealDate.addEventListener("click", function () {
  let mealDateFormat = mealDate.value.split("T");
  selectedMealDate.textContent = mealDateFormat[0];
  mealDateTimeAccordion.value = undefined;
});

let selectedMealTime = document.querySelector("#selectedMealTime");
let mealOptions = document.querySelectorAll(".mealTimeOption");
let mealTimeAccordion = document.querySelector("#mealTimeAccordion");

mealOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // console.log(option.value);
    selectedMealTime.textContent = option.value;
    mealTimeAccordion.value = undefined;
  });
});

//disable upload button if uploading photo
picInput.addEventListener("change", () => {
  submitPhoto.disabled = false;
  submitFoodPic();
});

//function when clicking upload food button
async function submitFoodPic(event) {
  // console.log("event.preventDefault()");
  event?.preventDefault();
  let form = foodPicForm;
  let formData = new FormData(form);

  picProgressBar.hidden = false;
  let res = await fetch(form.action, {
    method: form.method,
    body: formData,
  });
  let json = await res.json();
  picProgressBar.hidden = true;
  // console.log(json);
  if (json.error) {
    let toast = document.createElement("ion-toast");
    toast.message = json.error;
    toast.color = "danger";
    toast.duration = 5000;
    toast.buttons = [
      { text: "Dismiss", role: "cancel", handler: () => toast.dismiss() },
    ];
    document.body.appendChild(toast);
    toast.present();
    toast.addEventListener("didDismiss", () => {
      setTimeout(() => {
        toast.remove();
      });
    });
    return;
  }

  submitPhoto.disabled = true;
  // await move();

  // if()

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
    select.classList.add("ion-text-wrap");

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
      option.classList.add("ion-text-wrap");
      select.appendChild(option);
    }

    node.appendChild(label);
    node.appendChild(select);
    items.appendChild(node);
    node.appendChild(delBtn);
  }

  document.querySelector("#calculateCalories").style.display = "inline-block";

  let calculateCalories = document.querySelector("#calculateCalories");
  let selectedAllFood = document.querySelectorAll(".selectedFood");

  calculateCalories.addEventListener("click", async function () {
    let foodItems = [];
    for (let selectedFood of selectedAllFood) {
      // console.log(`select food`, selectedFood);
      if (selectedFood.style.display != "none") {
        let splitArray = selectedFood.getAttribute("aria-label").split(",");
        if (splitArray.length == 1) {
          await confirmAlert(splitArray[0]);
          // console.log(splitArray[0]);
          return;
        }
        foodItems.push(splitArray[0]);
        // document.querySelector("#calculatedNutritionValue").style.display =
        //   "inline";
      }
    }
    // console.log(foodItems);

    let nutrition = [];
    // console.log(json);

    for (let i = 0; i < foodItems.length; i++) {
      const compareArr = json.items[i].suggestions;
      const target = compareArr.filter((v) => v.name === foodItems[i]);

      nutrition.push(target[0]);
    }

    // console.log(nutrition);
    // let result = form.querySelector(".calories-result");
    // for (let food of foodItems) {
    //   console.log(`food`, food);
    //   for (let item of json.items) {
    //     console.log(`json.item`, item);
    //     for (let suggestion of item.suggestions) {
    //       console.log("suggestion", suggestion);
    //       if (food == suggestion.name) {
    //         nutrition.push({
    //           id: suggestion.id,
    //           name: suggestion.name,
    //           energy: suggestion.energy,
    //           protein: suggestion.protein,
    //           saturated_fat: suggestion.saturated_fat,
    //           sodium: suggestion.sodium,
    //           sugar: suggestion.sugar,
    //           total_fat: suggestion.total_fat,
    //           trans_fat: suggestion.trans_fat,
    //           carbohydrate: suggestion.carbohydrate,
    //         });
    //       }
    //     }
    //   }
    // }
    // console.log(nutrition);
    let template = document.querySelector("template");

    let total_energy = 0;
    let total_protein = 0;
    let total_saturated_fat = 0;
    let total_sodium = 0;
    let total_sugar = 0;
    let total_total_fat = 0;
    let total_trans_fat = 0;
    let total_carbohydrate = 0;

    for (let food of nutrition) {
      total_energy += parseFloat(food.energy);
      total_protein += parseFloat(food.protein);
      total_saturated_fat += parseFloat(food.saturated_fat);
      total_sodium += parseFloat(food.sodium);
      total_sugar += parseFloat(food.sugar);
      total_total_fat += parseFloat(food.total_fat);
      total_trans_fat += parseFloat(food.trans_fat);
      total_carbohydrate += parseFloat(food.carbohydrate);
    }

    const result_place = document.querySelector(".total_calculated_result");
    result_place.innerHTML = "";
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
    node.querySelector("#sugar").textContent = total_sugar.toFixed(1) + ` g`;
    node.querySelector("#sodium").textContent = total_sodium + ` mg`;

    result_place.appendChild(node);
    let scrollTo = document.getElementById("confirm-to-insert");
    // scroll to bottom
    setTimeout(() => {
      scrollTo.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 200);

    // confirm to insert data to database
    let confirmToInsert = document.querySelector("#confirm-to-insert");

    confirmToInsert.addEventListener("click", async () => {
      let res = await fetch(`/insert-result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealDate: selectedMealDate.textContent,
          mealTime: selectedMealTime.textContent,
          id: idFromURL,
          food_items: nutrition,
        }),
      });
      let result = await res.json();
      // console.log(`result`, result);

      if (result.status) {
        insertAlert(result.message);
      }
    });
  });
  //confirm to insert date to profile
}

// function move() {
//   return new Promise((resolve, reject) => {
//     document.querySelector("#myProgress").hidden = false;
//     let elem = document.getElementById("myBar");
//     let width = 10;
//     let id = setInterval(frame, 10);
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//         // document.querySelector("#myProgress").hidden = true;
//         resolve();
//       } else {
//         width++;
//         elem.style.width = width + "%";
//         //open.spotify.com/playlist/14TaTmR3N9PGEmdbiRKoJS
//         https: elem.innerHTML = width + "%";
//       }
//     }
//   });
// }

/*
selectMealTime.addEventListener("click", function () {
  console.log(selectMealTime.value);
  selectedMealTime.textContent = selectMealTime.value;
});
*/

//set up alert : insert the data and redirect to diet record
async function insertAlert(message) {
  const alert = document.createElement("ion-alert");
  alert.header = "Message";
  alert.message = message;
  alert.buttons = [
    {
      text: "OK",
      handler: () => {
        // window.location = "/";
        location.reload();
        // setTimeout(() => {
        //   tabs.select("diet");
        // }, 3000);
      },
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}

//set up alert : make sure the food are selected to calculate calories
async function confirmAlert(missingCategory) {
  const alert = document.createElement("ion-alert");
  alert.header = "Error";
  //alert.subHeader = "Important message";
  alert.message = `Missing ${missingCategory} choice input`;
  alert.buttons = [
    {
      text: "OK",
      cssClass: "alert-button-cancel",
    },
    // {
    //   text: "Yes",
    //   cssClass: "alert-button-confirm",
    // },
  ];

  document.body.appendChild(alert);
  await alert.present();
}


//set up alert : logout
async function logoutAlert(message) {
  const alert = document.createElement("ion-alert");
  alert.header = "Message";
  alert.message = message;
  alert.buttons = [
    {
      text: "OK",
      handler: () => {
        window.location = "/";
      },
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}

//logout
document.getElementById("logout").addEventListener("click", async () => {
  let res = await fetch("/logout", { method: "POST" });
  if (res) {
    let message = (await res.json()).message;
    logoutAlert(message);
  }
});
