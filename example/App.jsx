import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Editor from '../src/components/editor';

class App extends Component {
  constructor(props) {
    super(props);
    this.ws = new WebSocket('ws://' + window.location.host + '/ws');

    this.componentsUpdated = this.componentsUpdated.bind(this);
    this.state = {
      comp: [],
      updateFromParent: Date.now(),
      userId: `uid_${new Date().getTime()}`,
    };
    this.ws.addEventListener('message', e => {
      const msg = JSON.parse(e.data);
      this.setState({
        comp: msg,
        updateFromParent: Date.now(),
      });
    });
  }

  componentsUpdated(comp) {
    this.ws.send(JSON.stringify(comp));
  }

  render() {
    const { comp, updateFromParent, userId } = this.state;
    return (
      <div style={{ maxWidth: 700, width: '100%', margin: '0 auto' }}>
        <Editor
          onContentUpdate={this.componentsUpdated}
          updateFromParent={updateFromParent}
          components={comp}
          userId={userId}
        />
      </div>
    );
  }
}

export default hot(module)(App);
