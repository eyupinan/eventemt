const EventEmitter=require('events');

const emt=new EventEmitter();
emt.on("click",function (merhaba){
    console.log(merhaba);
});
emt.emit("click","marabayın");