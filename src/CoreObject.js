class CoreObject {
    constructor () {
        this.listenerList = {}
        this.onceListeners = {}
    }

    listenerCount (event) {
        let listenerCountVar = 0
        try {
            for (let i = 0; i < this.listenerList[event].length; i++) {
                if (this.listenerList[event][i] !== undefined) {
                    listenerCountVar++
                }
            }
        } catch (err) {
            //
        }
        return listenerCountVar
    }

    on (event, ...params) {
        // her bir parametre bir fonksiyondur. event hangi aksiyon olduğunu belirtir.
        params.forEach(function (func) {
            // listenin içerisinde undefined değer varmı kontrolü yapılıyor . varsa yeni fonksiyon o adrese yazılıyor.
            let checkUndefined = false
            let indexUndefined
            try {
                checkUndefined = this.listenerList[event].includes(undefined)
                if (checkUndefined) {
                    indexUndefined = this.listenerList[event].indexOf(undefined)
                }
            } catch (err) {
                //
            }
            if (event in this.listenerList) {
                if (!checkUndefined) {
                    this.listenerList[event].push(func)
                } else {
                    // undefined içeren adrese ekleniyor.
                    this.listenerList[event][indexUndefined] = func
                }
            } else {
                this.listenerList[event] = [func]
            }
        }, this)
    }

    emit (event, ...params) {
        // bu kısımda evente verilmiş olan fonksiyonlara göre parametreler alınır
        // mutualParams değişkeni bütün fonksiyonlara gönderilecek olan değişkenleri içerir liste haline parametre olarak alınır
        // params bir dictionary'dir. her bir fonksiyonun ismine göre parametre listeleri içerir.
        try {
            this.listenerList[event].forEach(function (func) {
                const indexFunc = this.listenerList[event].indexOf(func)
                if (typeof (func) === 'function') {
                    func(...params)
                }
                // bir onceListener listesi var bir kez çağırılacak fonksiyonların listenerList deki index değerleri bu listede tutuluyor
                // bu listedeki indexlerden biri çalıştırıldı ise fonksiyon siliniyor
                try {
                    if (this.onceListeners[event].includes(indexFunc)) {
                        this.listenerList[event][indexFunc] = undefined
                        var veri = this.onceListeners[event].indexOf(indexFunc)
                        this.onceListeners[event] = this.onceListeners[event].filter(function (index) {
                            return index > veri || index < veri
                        })
                    }
                } catch (err) {
                    //
                }
            }, this)
        } catch (err) {
            //
        }
    }

    remove (event, fonk) {
        // bir event verilir ve fonksiyon isimleri içeren bir liste verilir.
        for (let i = 0; i < this.listenerList[event].length; i++) {
            if (fonk === this.listenerList[event][i]) {
                this.listenerList[event][i] = undefined
            }
        }
    }

    once (event, ...params) {
        params.forEach(function (func) {
            if (event in this.listenerList) {
                // listenin içerisinde undefined değer varmı kontrolü yapılıyor . varsa yeni fonksiyon o adrese yazılıyor.
                let checkUndefined = false
                let indexUndefined
                try {
                    checkUndefined = this.listenerList[event].includes(undefined)
                    if (checkUndefined) {
                        indexUndefined = this.listenerList[event].indexOf(undefined)
                    }
                } catch (err) {
                    //
                }
                if (!checkUndefined) {
                    this.listenerList[event].push(func)
                } else {
                    this.listenerList[event][indexUndefined] = func
                }
                // onceListeners listesine ekleniyor.
                if (event in this.onceListeners) {
                    this.onceListeners[event].push(this.listenerList[event].indexOf(func))
                } else {
                    this.onceListeners[event] = [this.listenerList[event].indexOf(func)]
                }
            } else {
                this.listenerList[event] = [func]
                this.onceListeners[event] = [0]
            }
        }, this)
    }
}

module.exports = {
    CoreObject: CoreObject
}
