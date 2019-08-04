const { CoreObject } = require('../src/CoreObject');
let coreObject = new CoreObject()
let counter = 0

function callback(params) {
    counter++
}

coreObject.on("event", callback)
console.log(coreObject.listenerCount("event"));
coreObject.emit('event')
coreObject.remove("event", callback)
console.log(coreObject.listenerCount("event"));
coreObject.emit('event')
console.log(counter);