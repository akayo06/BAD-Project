let tdeeGender = document.querySelector("#tdeeGender")
let tdeeAge = document.querySelector("#tdeeAge")
let tdeeHeight = document.querySelector("#tdeeHeight")
let tdeeWeight = document.querySelector("#tdeeWeight")
let tdeeActivity = document.querySelector("#tdeeActivity")

document.querySelector("#calculateTDEE").addEventListener("click", async function(){
  let activityValue = 0
  let tdeeResult = 0
  if (tdeeActivity.value = 0) {
    activityValue += 1.2
  } else if (tdeeActivity.value = 1) {
    activityValue += 1.375
  }else if (tdeeActivity.value = 2) {
    activityValue += 1.55
  }else if (tdeeActivity.value = 3) {
    activityValue += 1.725
  }else {
    activityValue += 1.9}

  if (tdeeAge.value && tdeeHeight.value && tdeeWeight) { 
     if(tdeeGender.value = "true") {
       tdeeResult += ((10 * tdeeWeight.value) + (6.25 * tdeeHeight.value) - (5 * tdeeAge.value) -161) * activityValue
     } else {
       tdeeResult += ((10 * tdeeWeight.value) + (6.25 * tdeeHeight.value) - (5 * tdeeAge.value) +5) * activityValue
     }
   
     document.querySelector("#tdeeResultItem").style.display = "block"
     document.querySelector("#tdeeResult").textContent = tdeeResult.toFixed(0)
     console.log([tdeeGender.value, tdeeAge.value, tdeeHeight.value, tdeeWeight.value, tdeeActivity.value, activityValue, tdeeResult])
    } else {
      await invalidNumberAlert()}

})

async function invalidNumberAlert(message) {
  const alert = document.createElement("ion-alert");
  alert.header = "Message";
  alert.message = "Value invalid.";
  alert.buttons = [
    {
      text: "Return",
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}