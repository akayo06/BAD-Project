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
  let json = await res.json();
  console.log(json);
  form.querySelector("img").src = "../uploads/" + json.out_filename;
  form.querySelector(".label").innerHTML = json.labels[0].label;
}
