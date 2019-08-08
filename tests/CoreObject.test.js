const assert = require('assert')
const { CoreObject } = require('../src/CoreObject')

describe('CoreObject Testi', function () {
    it('Core Object Oluşturmak', function () {
        const coreObject = new CoreObject()
        assert.ok(coreObject)
        assert.ok(coreObject instanceof CoreObject)
    })

    it('Core Object Emit Testi', function () {
        const coreObject = new CoreObject()
        coreObject.emit('event')
    })

    it('Core Object "on" Async Emit Testi', function (done) {
        const coreObject = new CoreObject()
        coreObject.on('event', function () {
            done()
        })

        setTimeout(() => coreObject.emit('event'), 10)
    })

    it('Core Object "once" Async Emit Testi', function (done) {
        const coreObject = new CoreObject()
        coreObject.once('event', function () {
            done()
        })
        coreObject.emit('event')
    })

    it('Core Object "once" should be called once', function () {
        const coreObject = new CoreObject()
        let counter = 0
        coreObject.once('event', function () {
            counter++
        })
        coreObject.emit('event')
        coreObject.emit('event')
        assert.strictEqual(counter, 1)
    })

    it('Core Object "remove" should work', function () {
        const coreObject = new CoreObject()
        let counter = 0

        function callback () {
            counter++
        }

        coreObject.on('event', callback)
        coreObject.emit('event')
        coreObject.remove('event', callback)
        coreObject.emit('event')
        assert.strictEqual(counter, 1)
    })
})
