var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
let today = localISOTime.split("T")[0];
