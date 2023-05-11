const fakeData = [
  { confident: 0.9534409642219543, label: "Twisty Pasta" },
  { confident: 0.9178583025932312, label: "Hot Drink" },
  { confident: 0.9933165311813354, label: "salad" },
  { confident: 0.9144174456596375, label: "Cold Drink" },
  { confident: 0.9081364274024963, label: "Fresh Corn Cup" },
  { confident: 0.9933165311813354, label: "salad" },
  { confident: 0.9144174456596375, label: "Cold Drink" },
  { confident: 0.9081364274024963, label: "Fresh Corn Cup" },
  { confident: 0.9178583025932312, label: "Hot Drink" },
  { confident: 0.3343474566936493, label: "Hash Browns" },
  { confident: 0.9534409642219543, label: "Twisty Pasta" },
  { confident: 0.9144174456596375, label: "Cold Drink" },
  { confident: 0.9933165311813354, label: "salad" },
  { confident: 0.9178583025932312, label: "Hot Drink" },
  { confident: 0.9178583025932312, label: "Hot Drink" },
  { confident: 0.9534409642219543, label: "Twisty Pasta" },
  { confident: 0.9933165311813354, label: "salad" },
  { confident: 0.9144174456596375, label: "Cold Drink" },
  { confident: 0.9081364274024963, label: "Fresh Corn Cup" },
  { confident: 0.9534409642219543, label: "Twisty Pasta" },
  { confident: 0.9175458550453186, label: "Hash Browns" },
  { confident: 0.9178583025932312, label: "Hot Drink" },
  { confident: 0.9178583025932312, label: "Hot Drink" },
  { confident: 0.9081364274024963, label: "Fresh Corn Cup" },
];

let foodItemQuantity = {};

for (let food of fakeData) {
  if (foodItemQuantity[food.label] != undefined) {
    foodItemQuantity[food.label]++;
  } else {
    foodItemQuantity[food.label] = 1;
  }
  console.log(foodItemQuantity);
}
console.log(foodItemQuantity);

/*
let outputMap = new Map();
let foodItems = [];
let finalResult = {};

for (let food of fakeData) {
  if (outputMap.get(food.label) == undefined) {
    outputMap.set(food.label, 1);
    foodItems.push(food.label);
  } else {
    let quantity = outputMap.get(food.label);
    quantity++;
    outputMap.set(food.label, quantity);
  }
}

console.log(outputMap);

for (let foodItem of foodItems) {
  finalResult[foodItem] = outputMap.get(foodItem);
}

console.log(finalResult);
*/
