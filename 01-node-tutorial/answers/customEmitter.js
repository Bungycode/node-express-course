const EventEmitter = require("events");

const emitter = new EventEmitter();

// synchronus example with setInterval
// setInterval(() => {
//   emitter.emit("timer", "hi there")
// }, 2000)

// emitter.on("timer", (msg) => console.log(msg))

// asynchronus example
// const waitForEvent = () => {
//   return new Promise((resolve) => {
//     emitter.on("happens", (msg) => resolve(msg + 23))
//   })
// }

// const doWait = async () => {
//   const year = await waitForEvent()
//   console.log("What year did I join code the dream?", year)
// }

// doWait()
// emitter.emit("happens", 2000)

// My example:

const currentYear = new Date().getFullYear();
const andrewBirthYear = 1987;

const resolveAge = () => {
  return new Promise((resolve) => {
    emitter.on("age", (birthYear) =>
      resolve(currentYear - birthYear)
    );
  });
};

const asyncEvent = async () => {
  const myAge = await resolveAge();
  console.log("Andrew's current age is: ", myAge);
};

asyncEvent();
emitter.emit("age", andrewBirthYear);
