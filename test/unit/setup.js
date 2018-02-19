// setup JSDOM
require("jsdom-global")();

// make expect available globally
// global.expect = require("expect");
global.sinon = require("sinon");
global.expect = require("chai").expect;
