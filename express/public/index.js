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
  for (let item of json.labels) {
    form.querySelector(".label").innerHTML += item.label + ", ";
  }
  let foodLabel = form.querySelector(".label");
  foodLabel.innerHTML = foodLabel.innerHTML.slice(
    0,
    foodLabel.innerHTML.length - 2
  );
}

let i = 0;
async function move() {
  document.querySelector("#myProgress").hidden = false;
  if (i == 0) {
    i = 1;
    let elem = document.getElementById("myBar");
    let width = 10;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
  // document.querySelector("#myProgress").hidden = true;
}
