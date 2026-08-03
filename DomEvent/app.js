const EventEmitter = require("events");

class DOM extends EventEmitter {}

const dom = new DOM();

dom.on("click", () => {
    console.log("Button clicked!");
});

dom.on("mouseover", () => {
    console.log("Mouse is over the button!");
});

dom.emit("click");
dom.emit("mouseover");