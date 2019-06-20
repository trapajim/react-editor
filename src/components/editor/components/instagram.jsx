import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import ComponentAction from './component-actions';

class Instagram extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape),
    setState: PropTypes.func,
  };

  static defaultProps = {
    content: {
      url: '',
    },
  };

  handleTextChange(evt) {
    const { content, setState } = this.props;
    content.url = evt.target.value;
    setState({ content });
  }

  renderEditor() {
    const { content } = this.props;
    const { url = '' } = content;
    return (
      <div>
        <TextField
          type="text"
          placeholder="url"
          label="video"
          margin="dense"
          fullWidth
          value={url}
          multiline
          rows={1}
          onChange={evt => this.handleTextChange(evt)}
        />
      </div>
    );
  }

  render() {
    return this.renderEditor();
  }
}

export default ComponentAction(Instagram);
