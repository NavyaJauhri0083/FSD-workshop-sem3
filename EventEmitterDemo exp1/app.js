//Program 1 
//emit() on()
// const EventEmitter=require("events");
// const event=new EventEmitter();
// // event.on("greet",()=>{
// //     console.log("this is event emitter");
    
// // })
// event.once("greet",()=>{
//     console.log("event trigger only one time");
    
// })
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
//Program 1:create custom EventEmitter that trigger "greet" or "exit"
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const event = new MyEmitter();

event.on("greet", (name) => {
    console.log(`Hello ${name}`);
});

event.on("exit", () => {
    console.log("Exits my custom event emitter...");
});

event.emit("greet", "cse24");
event.emit("exit");