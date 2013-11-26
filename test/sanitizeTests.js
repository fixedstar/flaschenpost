'use strict';

var assert = require('node-assertthat');

var sanitize = require('../lib/sanitize');

suite('sanitize', function () {
  test('does nothing to normal objects.', function () {
    var actual = sanitize({
      foo: 'bar'
    });

    assert.that(actual, is.equalTo({
      foo: 'bar'
    }));
  });

  test('converts error objects to normal ones.', function () {
    var actual = sanitize(new Error('foo'));

    assert.that(actual, is.ofType('object'));
    assert.that(actual.name, is.equalTo('Error'));
    assert.that(actual.code, is.undefined());
    assert.that(actual.message, is.equalTo('foo'));
    assert.that(actual.stack, is.ofType('string'));
  });

  test('converts recursive objects.', function () {
    var actual = sanitize({
      error: new Error('foo'),
      data: 'bar'
    });

    assert.that(actual, is.ofType('object'));
    assert.that(actual.error, is.ofType('object'));
    assert.that(actual.error.name, is.equalTo('Error'));
    assert.that(actual.error.code, is.undefined());
    assert.that(actual.error.message, is.equalTo('foo'));
    assert.that(actual.error.stack, is.ofType('string'));
    assert.that(actual.data, is.equalTo('bar'));
  });
});