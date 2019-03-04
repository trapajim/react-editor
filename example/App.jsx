import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Editor from '../src/components/editor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ maxWidth: 700, width: '100%', margin: '0 auto' }}>
        <Editor />
      </div>
    );
  }
}

export default hot(module)(App);
