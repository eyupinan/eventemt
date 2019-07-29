var core=require("../es5/CoreObject");
ornek=new core.coreObject();
ornek.on("click",function fonk(){
    console.log("merhaba");
});
ornek.once("click",function fonk2(){
    console.log("merhaba 2");
})
ornek.emit("click");
ornek.emit("click");