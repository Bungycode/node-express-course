const os = require("os");
// Console logging the os package.
console.log(os);
// Indicates that the network address is already in use. You may see the "EADDRINUSE" error when you are trying to initiate a second application on the same port as the first application that is currently running. Example, both PORT's are set to 3000 and one is already live on that port.
console.log(os.constants.errno.EADDRINUSE);
// Returns the operating system CPU architecture for which the node.js binary was compiled.
console.log(os.arch());
// Can return information about the network interfaces on your device, including both wired and wireless interfaces.
const myNetworkInfo = os.networkInterfaces();
console.log(myNetworkInfo);
