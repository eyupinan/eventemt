"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var coreObject = function () {
    function coreObject(element) {
        _classCallCheck(this, coreObject);

        this.element = element;
        this.listenerCount = 0;
        this.listenerList = {};
        this.onceListeners = {};
    }

    _createClass(coreObject, [{
        key: "on",
        value: function on(event) {
            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            // her bir parametre bir fonksiyondur. event hangi aksiyon olduğunu belirtir.
            params.forEach(function (func) {
                //listenin içerisinde undefined değer varmı kontrolü yapılıyor . varsa yeni fonksiyon o adrese yazılıyor.
                var checkUndefined = false;
                try {
                    checkUndefined = this.listenerList[event].includes(undefined);
                    if (checkUndefined) {
                        var indexUndefined = this.listenerList[event].indexOf(undefined);
                    }
                } catch (err) {} //

                // anonim fonksiyonların silme işlemi gerçekleşemeyeceği için tek seferlik olarak tanımlanır.
                if (func.name === "") {
                    this.once(event, func);
                } else {
                    if (event in this.listenerList) {
                        if (!checkUndefined) {
                            this.listenerList[event].push(func);
                        } else {
                            //undefined içeren adrese ekleniyor.
                            this.listenerList[event][indexUndefined] = func;
                        }
                    } else {
                        this.listenerList[event] = [func];
                    }
                }
            }, this);
        }
    }, {
        key: "emit",
        value: function emit(event) {
            for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                params[_key2 - 1] = arguments[_key2];
            }

            // bu kısımda evente verilmiş olan fonksiyonlara göre parametreler alınır
            // mutualParams değişkeni bütün fonksiyonlara gönderilecek olan değişkenleri içerir liste haline parametre olarak alınır
            // params bir dictionary'dir. her bir fonksiyonun ismine göre parametre listeleri içerir.
            this.listenerList[event].forEach(function (func) {
                var indexFunc = this.listenerList[event].indexOf(func);
                if (typeof func === "function") {
                    func.apply(undefined, params);
                }
                // bir onceListener listesi var bir kez çağırılacak fonksiyonların listenerList deki index değerleri bu listede tutuluyor
                //bu listedeki indexlerden biri çalıştırıldı ise fonksiyon siliniyor  
                try {
                    if (this.onceListeners[event].includes(indexFunc)) {
                        this.listenerList[event][indexFunc] = undefined;
                        var veri = this.onceListeners[event].indexOf(indexFunc);
                        this.onceListeners[event] = this.onceListeners[event].filter(function (value, index, arr) {
                            return index > veri || index < veri;
                        });
                    }
                } catch (err) {
                    //
                }
            }, this);
        }
    }, {
        key: "remove",
        value: function remove(event, fonk) {
            //bir event verilir ve fonksiyon isimleri içeren bir liste verilir.
            for (var i = 0; i < this.listenerList[event].length; i++) {
                if (fonk === this.listenerList[event][i].name) {
                    this.listenerList[event][i] = undefined;
                }
            }
        }
    }, {
        key: "once",
        value: function once(event) {
            for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                params[_key3 - 1] = arguments[_key3];
            }

            params.forEach(function (func) {
                if (event in this.listenerList) {
                    //listenin içerisinde undefined değer varmı kontrolü yapılıyor . varsa yeni fonksiyon o adrese yazılıyor.
                    var checkUndefined = false;
                    try {
                        checkUndefined = this.listenerList[event].includes(undefined);
                        if (checkUndefined) {
                            var indexUndefined = this.listenerList[event].indexOf(undefined);
                        }
                    } catch (err) {//
                    }
                    if (!checkUndefined) {
                        this.listenerList[event].push(func);
                    } else {
                        this.listenerList[event][indexUndefined] = func;
                    }
                    //onceListeners listesine ekleniyor.
                    if (event in this.onceListeners) {
                        this.onceListeners[event].push(this.listenerList[event].indexOf(func));
                    } else {
                        this.onceListeners[event] = [this.listenerList[event].indexOf(func)];
                    }
                } else {
                    this.listenerList[event] = [func];
                    this.onceListeners[event] = [0];
                }
            }, this);
        }
    }]);

    return coreObject;
}();

module.exports = {
    coreObject: coreObject
};