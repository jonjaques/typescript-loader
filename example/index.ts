/// <reference path="typings/tsd.d.ts" />
/// <reference path="vendor/collections.ts" />

require('./index.css');

import React = require('react/addons');
import Button = require('./Button');
/**
 * If we don't use AsyncComponent at the value level, tsc won't emit require
 * statement and so we won't have it bundled. Though type info is acquired and
 * we can load the module later and assign the type to it.
 */
import AsyncComponent = require('./AsyncComponent');

var set = new collections.Set<number>();

set.add(4);
set.add(8);
set.add(15);
set.add(16);
set.add(23);
set.add(42);

console.log(set.toString());


var App = React.createClass({

  render() {
    return React.DOM.div({},
      React.createElement(Button, {}),
      this.state.async ? React.createElement(this.state.async, {}) : null
    );
  },

  getInitialState() {
    return {async: null};
  },

  componentDidMount() {
    require.ensure(['./AsyncComponent'], (require) => {
      var async: typeof AsyncComponent = require('./AsyncComponent');
      this.setState({async: async});
    });
  }
});

React.render(
  React.createElement(App, {}),
  document.getElementById('main'));
