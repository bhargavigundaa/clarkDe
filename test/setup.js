process.env.NODE_ENV = 'test';

function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;

require('babel-register')();

var jsdom = require('jsdom').jsdom;
var documentRef;
var exposedProperties = ['window', 'navigator', 'document', '__DEV__'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
documentRef = document;
