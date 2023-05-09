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
    let button = document.createElement("ion-icon");

    select.classList.add("selectedFood")

    label.textContent = item.label;
    button.name = "close-outline";
    button.style.zIndex= "999";
    
    button.addEventListener("click", function(){
      node.style.display = "none";
      select.style.display = "none";
      button.style.display = "none"})

    for (let suggestion of item.suggestions) {
      let option = document.createElement("ion-select-option");
      option.value = suggestion.id;
      option.textContent = suggestion.name;
      select.appendChild(option);
      
    }
    
    node.appendChild(label);
    node.appendChild(select);
    items.appendChild(node);
    node.appendChild(button);
    
    // form.querySelector(".items").innerHTML += item.label;
  }
  document.querySelector(".confirm-button").style.display = "inline-block";
  let calculateCalories = document.querySelector("#calculateCalories");
  let selectedAllFood = document.querySelectorAll(".selectedFood")
  calculateCalories.addEventListener("click",function(){
    let foodItems = []
    for (selectedFood of selectedAllFood){
      if(selectedFood.style.display != "none"){
        let splitArray = selectedFood.getAttribute("aria-label").split(",")
        if(splitArray.length == 1){
          console.log("Have error")
          return
        }
        foodItems.push(splitArray[0])
      }
    }
    console.log(foodItems)
  })
  
  // form.querySelector("#calculate-calories").hidden = false;

  // let foodLabel = form.querySelector(".label");
  // foodLabel.innerHTML = foodLabel.innerHTML.slice(
  //   0,
  //   foodLabel.innerHTML.length - 2
  // );
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
