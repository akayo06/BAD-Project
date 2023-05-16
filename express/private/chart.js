async function weightRecord() {
  let res = await fetch("/weightRecord");
  let json = await res.json();
  var weightSet = [];

  json.items.forEach((item) => {
    weightSet.push(item.weight);
  });

  var weightLabels = [];

  json.items.forEach((item) => {
    if (item.date) {
      let weightRecordArr = [];
      let hkt = new Date(item.date);
      weightRecordArr.push(hkt.toString());
      weightLabels.push(
        weightRecordArr[0].split(" ")[2] + weightRecordArr[0].split(" ")[1]
      );
    }
  });

  console.log(weightLabels);

  new Chart(document.getElementById("weightMyChart"), {
    type: "line",
    data: {
      labels: weightLabels.reverse(),
      datasets: [
        {
          label: "My weight progression",
          data: weightSet.reverse(),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  });
}

weightRecord();

async function getTodayCalories() {
  let res = await fetch("/getTodayCalories");
  let json = await res.json();
  console.log(json);
  let caloriesToday = [];

  let dinner = 0;
  let lunch = 0;
  let breakfast = 0;
  //might need to alter
  for (let i = 0; i < json.items.length; i++) {
    if (json.items[i].date.split("T")[0] == utcToday) {
      if (json.items[i].section == "breakfast") {
        breakfast += parseFloat(json.items[i].energy);
      } else if (json.items[i].section == "lunch") {
        lunch += parseFloat(json.items[i].energy);
      } else {
        dinner += parseFloat(json.items[i].energy);
      }
    }
  }
  console.log(utcToday);
  caloriesToday.push(breakfast);
  caloriesToday.push(lunch);
  caloriesToday.push(dinner);
  console.log(caloriesToday);

  let caloriesLabel = ["Breakfast", "Lunch", "Dinner"];
  let caloriesBG = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
  ];

  if (breakfast == 0 && lunch == 0 && dinner == 0) {
    caloriesLabel.push("noRecord");
    caloriesBG.push("grey");
    caloriesToday.push("1");
  }

  new Chart(document.getElementById("dietMyChart"), {
    type: "doughnut",
    data: {
      labels: caloriesLabel,
      datasets: [
        {
          labels: "Calories Today",
          data: caloriesToday,
          backgroundColor: caloriesBG,
          hoverOffset: 4,
        },
      ],
    },
  });

  let total_energy = 0;
  let total_protein = 0;
  let total_saturated_fat = 0;
  let total_sodium = 0;
  let total_sugar = 0;
  let total_total_fat = 0;
  let total_trans_fat = 0;
  let total_carbohydrate = 0;

  for (let i = 0; i < json.items.length; i++) {
    if (json.items[i].date.split("T")[0] == utcToday) {
      total_energy += parseFloat(json.items[i].energy);
      total_protein += parseFloat(json.items[i].protein);
      total_saturated_fat += parseFloat(json.items[i].saturated_fat);
      total_sodium += parseFloat(json.items[i].sodium);
      total_sugar += parseFloat(json.items[i].sugar);
      total_total_fat += parseFloat(json.items[i].total_fat);
      total_trans_fat += parseFloat(json.items[i].trans_fat);
      total_carbohydrate += parseFloat(json.items[i].carbohydrate);
    }
  }

  document.querySelector("#todayEnergy").textContent = total_energy + ` kcal`;
  document.querySelector("#todayProtein").textContent =
    total_protein.toFixed(1) + ` g`;
  document.querySelector("#todayTotal_fat").textContent =
    total_total_fat.toFixed(1) + ` g`;
  document.querySelector("#todaySaturated_fat").textContent =
    total_saturated_fat.toFixed(1) + ` g`;
  document.querySelector("#todayTrans_fat").textContent =
    total_trans_fat.toFixed(1) + ` g`;
  document.querySelector("#todayCarbohydrates").textContent =
    total_carbohydrate.toFixed(1) + ` g`;
  document.querySelector("#todaySugar").textContent =
    total_sugar.toFixed(1) + ` g`;
  document.querySelector("#todaySodium").textContent = total_sodium + ` mg`;
}
getTodayCalories();
