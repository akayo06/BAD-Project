let utcYear  = new Date().getUTCFullYear();
let utcMonth = new Date().getUTCMonth() + 1;
if (utcMonth <10) {
    utcMonth = "0"+ utcMonth
}
let utcDate = new Date().getUTCDate();
if (utcDate <10) {
    utcDate = "0"+ utcDate
}

let utcToday = utcYear + "-" + utcMonth + "-" + utcDate