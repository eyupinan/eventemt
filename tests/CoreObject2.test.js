var assert = require('assert');
var {CoreObject} = require('../es6/CoreObject');
class Test{
    constructor(randomVariable){
        this.randomVariable=randomVariable;
    }
    setRandomVariable(randomVariable){
        this.randomVariable=randomVariable;
    }
    getRandomVariable(){
        return this.randomVariable;
    }
}
describe("event objesi",function(){
    it("obje oluşturuldu ise",function(){
        var event = new CoreObject();
    });
});
describe("emit parametre gönderme",function(){
    var event =new CoreObject();
    var testObject=new Test("variable 1");
    before(function(done){
        event.on("message",function func(param){
            param.setRandomVariable("variable 2");
        });
        event.emit("message",testObject);
        done();
    });
    it ("randomVariable doğru ise",function(){
        assert.equal(testObject.getRandomVariable(),"variable 2");
    });
});
describe("emit çoklu fonksiyon",function(){
    var event =new CoreObject();
    var testObject1=new Test(0);
    var testObject2=new Test(0);
    var testObject3=new Test(0);
    before(function(done){
        event.on("click",function(){
            testObject1.setRandomVariable(1);
        });
        event.on("click",function(){
            testObject2.setRandomVariable(2);
        });
        event.on("click",function(){
            testObject3.setRandomVariable(3);
        });
        event.emit("click");
        done();
    });
    it("her bir randomVariable doğru ise",function(){
        assert.equal(testObject1.getRandomVariable(),1);
        assert.equal(testObject2.getRandomVariable(),2);
        assert.equal(testObject3.getRandomVariable(),3);
    });
});
describe("remove işlemi",function(){
    var event =new CoreObject();
    var countAfter=0;
    var countBefore=0;
    before(function(done){
        event.on("click",function fonk(){
            console.log("hello world");
        });
        countBefore=event.listenerCount("click");
        event.remove("click","fonk");
        countAfter=event.listenerCount("click");
        done();
    });
    it("fonksiyon sayısı eşit",function(){
        assert.equal((countBefore-1),countAfter);
    })
});
describe("on ve once",function(){
    var event =new CoreObject();
    var testObject1=new Test(0);
    var testObject2=new Test(0);
    before(function(done){
        event.on("click",function fonk(){
            testObject1.setRandomVariable(testObject1.getRandomVariable()+1);
        });
        event.once("click",function fonk2(){
            testObject2.setRandomVariable(testObject2.getRandomVariable()+1);
        });
        event.emit("click");
        event.emit("click");
        done();
    });
    it("randomVariable değerleri kontrolü",function(){
        assert.equal(testObject1.getRandomVariable(),2);
        assert.equal(testObject2.getRandomVariable(),1);
    });
});
describe("emit callback",function(){
    var event =new CoreObject();
    var testObject=new Test(0);
    before(async function(){
        event.on("click",function fonk(param){
            setTimeout(function(){
                testObject.setRandomVariable(testObject.getRandomVariable()+1);
                param();  
            },2000);
        });
        await event.emit("click",function(){
            testObject.setRandomVariable(testObject.getRandomVariable()+1);
        });
       
    })
    it ("emit'e callback parametresi verildi",function(done){
        done();
        assert.equal(testObject.getRandomVariable(),2);
        
    });
});