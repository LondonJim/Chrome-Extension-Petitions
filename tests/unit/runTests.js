var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('tests/unit/support/jasmine.json');

jasmine.execute();
