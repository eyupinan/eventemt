var core=require("./bundled/coreObject");

function fonk1(param1,param2){
    console.log(param1+param2);
}
function fonk2(param1,param2){
    console.log(param1);
}
function fonk3(param1,param2){
    console.log(param2);
}
function fonk4(param1,param2){
    console.log(param2+"sa");
}
function fonk5(param){
    console.log("merhaba5 "+param);
}
function fonk6(param2){
    console.log("merhaba6 "+param2);
}
var fonk7=function(){
    console.log("fonk7");
}
ornek= new core.coreObject();
params=[fonk1,fonk2,fonk3];
params2=[fonk4,fonk5,fonk6];
ornek.on("click",...params);
ornek.on("click",fonk4);
ornek.on("click",fonk5);


var veri="fonk anonim";
ornek.on("over",...params2);
ornek.on("over",function fonkAn(veri){
    console.log("fonk anonim");
});
//console.log(ornek.listenerFunctionList);
//params3=["parametre1","parametre2","parametre3"]
//ornek.emit("click",...params3);
parametre=["parametre 1 ","parametre 2"];
ornek.emit("click",...parametre);
console.log("-----");
ornek.emit("over",...parametre);
console.log("-----");
console.log("-----");
ornek.emit("click",...parametre);
console.log("-----");
ornek.emit("over",...parametre);
ornek.remove("click","fonk4");
console.log(ornek.listenerList);

console.log("--------");
ornek.once("click",fonk6);
console.log(ornek.listenerList);