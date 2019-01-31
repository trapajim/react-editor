import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import ComponentAction from './component-actions';
import ComponentToolbar from './component-toolbar';

class Title extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape),
    edit: PropTypes.bool,
    position: PropTypes.number,
  };

  static defaultProps = {
    content: {
      headingType: 'heading',
      text: '',
    },
  };

  constructor(props) {
    super(props);
    const { content, edit } = this.props;
    const { text = '' } = content;
    this.state = {
      content,
      edit,
      textLength: text.length,
    };

    this.handleOnChangeHeading = this.handleOnChangeHeading.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleOnChangeHeading(event) {
    const { content } = this.state;
    content.headingType = event.target.value;
    this.setState({ content });
  }

  handleTextChange(ev) {
    const { textLength, content } = this.state;
    const val = ev.target.value;
    const length = val.length - textLength;
    content.text = val;
    this.setState({
      textLength: textLength + length,
      content,
    });
  }

  renderEditor() {
    const { position } = this.props;
    const { edit, content } = this.state;
    const { headingType, text } = content;
    if (!edit) return '';
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="age-simple">Heading type</InputLabel>
          <Select
            style={{ width: 150 }}
            value={headingType}
            onChange={this.handleOnChangeHeading}
            inputProps={{
              name: 'heading',
            }}
          >
            <MenuItem value="heading">heading</MenuItem>
            <MenuItem value="subheading">subheading</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          placeholder="Title"
          label="Title"
          margin="dense"
          fullWidth
          value={text}
          onChange={this.handleTextChange}
          ref={ref => {
            this.heading = ref;
          }}
        />
        <ComponentToolbar content={content} position={position} />
      </div>
    );
  }

  render() {
    return this.renderEditor();
  }
}

export default ComponentAction(Title);
