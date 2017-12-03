const fetch = require("node-fetch");
var now = require("performance-now");

const URL = "https://swapi.co/api/people/";

function fetchPerson(url) {
    return fetch(url)
        .then(res => res.json())
        
}

async function printNames() {
    var start = now();
    console.log("Before");
    const p1 = fetchPerson(URL.concat(1)); // put await to make the run sequentially
    const p2 = fetchPerson(URL.concat(2)); // conclusion it's much faster when they run parallel
    const person1 = await p1;
    const person2 = await p2;
    console.log(person1.name);
    console.log(person2.name)
    console.log("After all");
    var end = now();
    console.log("start: " + start.toFixed(3)); // the number of milliseconds the current node process is running 
    console.log("stop: " + (end - start).toFixed(3));

}

printNames();