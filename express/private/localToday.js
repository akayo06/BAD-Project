var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
let today = localISOTime.split("T")[0];

let year = today.split("-")[0]
let month = today.split("-")[1]
let date = today.split("-")[2]

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', { month: 'short' });
  }

let today432Format = year + "-" + getMonthName(month) + "-" + date

function dateToLocal(date) {
 let dateArr = new Date(date).toString().split(" ")
 return dateArr[3] + "-" + dateArr[1] + "-" +dateArr[2]
}
