const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formObject = {};

  formObject["email"] = loginForm.email.value;
  formObject["password"] = loginForm.password.value;

  const res = await fetch("/login", {
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
    presentAlert(result.message, result.id);
  } else {
    presentAlertFail(result.message);
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
