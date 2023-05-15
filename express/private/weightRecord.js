let weightDate = document.querySelector("#weightDate");
let selectedWeightDate = document.querySelector("#selectedWeightDate");
let weightDateTimeAccordion = document.querySelector("#weightDateTimeAccordion");

weightDate.setAttribute("max", today);

weightDate.addEventListener("click", function () {
  let weightDateFormat = weightDate.value.split("T");
  selectedWeightDate.textContent = weightDateFormat[0];
  weightDateTimeAccordion.value = undefined;
});

const addWeight = document.querySelector("#addWeight");
const weightAddValue = document.querySelector("#weightAddValue")
addWeight.addEventListener("click", async function (event) {
  event.preventDefault();

  const formObject = {};

  formObject["weight"] = weightAddValue.value;
  formObject["date"] = weightDate.value;

  const res = await fetch("/addWeight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });

  const result = await res.json(); // { success: true }
  
  await presentAlert(result.message);
  
});

// async function presentAlertFail(message) {
//   const alert = document.createElement("ion-alert");
//   alert.header = "Message";
//   alert.message = "Please enter valid number.";

//   alert.buttons = [
//     {
//       text: "Return",
//     },
//   ];

//   document.body.appendChild(alert);
//   await alert.present();
// }

async function presentAlert(message, id) {
  const alert = document.createElement("ion-alert");
  alert.header = "Message";
  alert.message = "Weight added";
  alert.buttons = [
    {
      text: "OK",
      handler: () => {
        window.location = `/app/home.html?id=${id}`;
      },
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}

