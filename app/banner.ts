import cowsay from "cowsay";

console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));

export const banner =  `;console.log("Build at ${new Date()}");\n`