const exportsProperties = require("./6-alternative-flavor");
const myFunction = require("./7-mind-grenade");
const { andrew, jane, joe } = require("./4-name");
const moreFunctions = require("./5-utils");

console.log(exportsProperties);
console.log(moreFunctions);
moreFunctions.sayBye(joe);
moreFunctions.sayBye(jane);
moreFunctions.seeYouNextWeek(andrew);
