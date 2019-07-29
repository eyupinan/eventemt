var assert = require('assert');
var {CoreObject} = require('../es6/CoreObject');


function testEt() {
    return true
}


describe('ilk testim', function() {

    it('bu birinci deneme, hiç bir şey yok', () => {
        assert.ok(testEt())
    })

});