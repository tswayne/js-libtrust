const mocha = require('mocha');
const chai = require('chai');
const suite = mocha.suite;
const test = mocha.test;
const assert = chai.assert;
const libtrust = require('../index')
const fs = require('fs')

suite('libtrust', function() {
  test('fingerprint', function() {
    const publicKey = fs.readFileSync(`${process.cwd()}/test/fixtures/example.cert`, 'utf-8')
    const key = libtrust.fingerprint(publicKey)
    assert.equal(key, 'PQ4B:GYWE:ZNOO:YSQH:2CTR:3UJB:EJU2:IUHY:JKDP:7LCV:C3ZY:6J5G')
  })
})
