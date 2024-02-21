// Output to linked web page (if it has an #output element)
const output = document.getElementById("output");
function blg(...args) {
    const newOutput = document.createElement("div");
    newOutput.innerText = args;
    output.appendChild(newOutput);
}
// console.log
function clg(...args) {
    console.log(...args);
}
