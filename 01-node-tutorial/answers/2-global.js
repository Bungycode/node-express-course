// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

console.log(global);
console.log(__dirname);
console.log(__filename);
console.log(global.require);
console.log(global.module);
console.log(global.process);
setInterval(() => {
  console.log(__dirname);
  console.log(global.process.env.MY_VAR);
}, 1000);
