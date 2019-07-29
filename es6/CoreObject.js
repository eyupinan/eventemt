class coreObject{
    
    constructor(element){
        this.element=element;
        this.listenerCount=0;
        this.listenerList={};
        this.onceListeners={};
       
    }
    
    on(event,...params){
        // her bir parametre bir fonksiyondur. event hangi aksiyon olduğunu belirtir.
        params.forEach(function(func){
            //listenin içerisinde undefined değer varmı kontrolü yapılıyor . varsa yeni fonksiyon o adrese yazılıyor.
            var checkUndefined=false;
            try{
                checkUndefined=this.listenerList[event].includes(undefined);
                if (checkUndefined){
                    var indexUndefined=this.listenerList[event].indexOf(undefined);
                }
            }catch(err){//
            }
            // anonim fonksiyonların silme işlemi gerçekleşemeyeceği için tek seferlik olarak tanımlanır.
            if (func.name===""){
                this.once(event,func);
            }
            else{
                if (event in this.listenerList){
                    if(!checkUndefined){
                        this.listenerList[event].push(func);
                    }
                    else{
                        //undefined içeren adrese ekleniyor.
                        this.listenerList[event][indexUndefined]=func;
                    }
                }
                else{
                    this.listenerList[event]=[func];
                }
            }
        },this);
    }
    emit(event,...params){
        // bu kısımda evente verilmiş olan fonksiyonlara göre parametreler alınır
        // mutualParams değişkeni bütün fonksiyonlara gönderilecek olan değişkenleri içerir liste haline parametre olarak alınır
        // params bir dictionary'dir. her bir fonksiyonun ismine göre parametre listeleri içerir.
        this.listenerList[event].forEach (function(func){
            var indexFunc=this.listenerList[event].indexOf(func);
            if (typeof(func)==="function"){
                func(...params);
            }
            // bir onceListener listesi var bir kez çağırılacak fonksiyonların listenerList deki index değerleri bu listede tutuluyor
            //bu listedeki indexlerden biri çalıştırıldı ise fonksiyon siliniyor  
            try{   
                if (this.onceListeners[event].includes(indexFunc)){
                    this.listenerList[event][indexFunc]=undefined;
                    var veri=this.onceListeners[event].indexOf(indexFunc);
                    this.onceListeners[event] = this.onceListeners[event].filter(function(value, index, arr){
                        return index > veri|| index<veri;                
                    });
                }
            }
            catch(err){
                //
            }
        },this);
    }
    remove(event,fonk){
        //bir event verilir ve fonksiyon isimleri içeren bir liste verilir.
        for (let i=0;i<this.listenerList[event].length;i++){
            if(fonk===this.listenerList[event][i].name){                
                this.listenerList[event][i]=undefined;    
            }
        }
    }
    once(event,...params){
        params.forEach(function(func){
            if (event in this.listenerList){
                //listenin içerisinde undefined değer varmı kontrolü yapılıyor . varsa yeni fonksiyon o adrese yazılıyor.
                var checkUndefined=false;
                try{
                    checkUndefined=this.listenerList[event].includes(undefined);
                    if (checkUndefined){
                        var indexUndefined=this.listenerList[event].indexOf(undefined);
                    }
                }catch(err){//
                }
                if (!checkUndefined){
                    this.listenerList[event].push(func);
                }
                else{
                    this.listenerList[event][indexUndefined]=func;
                }
                //onceListeners listesine ekleniyor.
                if (event in this.onceListeners){
                    this.onceListeners[event].push(this.listenerList[event].indexOf(func));
                }
                else{
                    this.onceListeners[event]=[this.listenerList[event].indexOf(func)];
                }   
            }
            else{   
                this.listenerList[event]=[func];
                this.onceListeners[event]=[0];
            }
        },this);
    }
}
module.exports={
    coreObject:coreObject,
}
