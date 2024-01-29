const cowsay = require("cowsay");

console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));

module.exports = {
    banner: `;console.log("Build at ${new Date()}");\n`
}