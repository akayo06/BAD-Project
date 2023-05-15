const addWeight = document.querySelector("#addWeight");
const weightAddValue = document.querySelector("#weightAddValue")
addWeight.addEventListener("click", async function (event) {
  event.preventDefault();

  const formObject = {};

  formObject["weight"] = weightAddValue.value;

  const res = await fetch("/addWeight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });
  console.log(formObject);
  const result = await res.json(); // { success: true }
  console.log(result);

  if (result.status === true) {
    await presentAlert(result.message);
  } else {
    await presentAlertFail(result.message);
  }
});

async function presentAlertFail(message) {
  const alert = document.createElement("ion-alert");
  alert.header = "Message";
  alert.message = message;

  alert.buttons = [
    {
      text: "Return",
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}

async function presentAlert(message, id) {
  const alert = document.createElement("ion-alert");
  alert.header = "Message";
  alert.message = message;
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
