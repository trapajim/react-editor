import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import ComponentAction from './component-actions';

class Quote extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape),
    setState: PropTypes.func,
  };

  static defaultProps = {
    content: {
      url: '',
      quote: '',
    },
  };

  constructor(props) {
    super(props);
    const { content } = this.props;
    const { quote = '' } = content;
    this.timer = false;
    this.state = {
      textLength: quote.length,
    };
  }

  handleTextChange(evt, type) {
    console.log(evt.target);
    const { content, setState } = this.props;
    const text = evt.target.value;
    if (type === 'quote') {
      this.setState({ textLength: text.length });
    }
    content[type] = text;
    setState({ content });
  }

  renderEditor() {
    const { content } = this.props;
    const { textLength } = this.state;
    const { url = '', quote = '' } = content;
    return (
      <div>
        <TextField
          type="text"
          placeholder="quote"
          helperText={textLength}
          label="quote"
          margin="dense"
          fullWidth
          value={quote}
          multiline
          rows={2}
          onChange={evt => this.handleTextChange(evt, 'quote')}
        />
        <TextField
          type="text"
          placeholder="url"
          label="url"
          margin="dense"
          fullWidth
          value={url}
          onChange={evt => this.handleTextChange(evt, 'url')}
        />
      </div>
    );
  }

  render() {
    return this.renderEditor();
  }
}

export default ComponentAction(Quote);
