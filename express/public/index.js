const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formObject = {};

  formObject["email"] = loginForm.email.value;
  formObject["password"] = loginForm.password.value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });

  const result = await response.json(); // { success: true }
  alert(result.message);
  console.log(`result`, result);
  if (result.status === true) {
    // window.location = `profile/profile.html?id=${result.id}`;
    window.location = `/home/home.html`;
  }
});
