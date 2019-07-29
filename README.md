# Event Emitter

## Install

The library is available as an npm package. To install the package run:

```
npm install eventemt
```

## Usage

### On

Add an event listener to support chained calls.

```javascript
evnt.on(eventName,...args);
```
* EventName : name of event
* args : listener functions

### once 

Add an event listener that can only be triggered once

```javascript
evnt.on(eventName,...args);
```
* EventName : name of event
* args : listener functions

### remove

Delete an named event Listener

```javascript
evnt.remove(eventName,func);
```

* eventName : name of event
* func : name of function as String

### emit 

Triggers event

```javascript
evnt.emit(eventName,...args);
```

* eventName : name of event
* args : parameters for listeners

## Example Code

```javascript
var core = require('eventemt')

var evnt = new core.CoreObject()
function func1(param){
  console.log(param);
}
var func2=function (param){
  console.log(param);
}
evnt.on("message",func1,func2);
evnt.emit('message', 'Good Bye World')
```


