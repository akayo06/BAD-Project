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
  presentAlert(result.message);
  // if (result.status === true) {
  //   window.location = `/index.html`;
  // }
});

async function presentAlert(message) {
  const alert = document.createElement("ion-alert");
  alert.header = "Message";
  alert.message = message;
  alert.buttons = ["OK"];

  document.body.appendChild(alert);
  await alert.present();
}
