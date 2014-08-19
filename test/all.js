var test = require('tape');
var ify = require('ify');

test('module name is correct', function(t) {
  t.plan(1);
  t.equal(require('../package.json').name, ify('shazam'), 'yep - its ok');
});
