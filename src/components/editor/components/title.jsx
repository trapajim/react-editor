import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import ComponentAction from './component-actions';

class Title extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape),
    edit: PropTypes.bool,
    setState: PropTypes.func,
  };

  static defaultProps = {
    content: {
      headingType: 'heading',
      text: '',
      handleToggleEdit: () => {},
    },
  };

  constructor(props) {
    super(props);
    const { content, edit } = this.props;
    const { text = '', headingType = 'heading' } = content;
    content.text = text;
    content.headingType = headingType;

    this.state = {
      edit,
      textLength: text.length,
    };

    this.handleOnChangeHeading = this.handleOnChangeHeading.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleOnChangeHeading(event) {
    const { content, setState } = this.props;
    content.headingType = event.target.value;
    setState({ content });
  }

  handleTextChange(ev) {
    const { content, setState } = this.props;
    const val = ev.target.value;
    content.text = val;
    this.setState({ textLength: val.length });
    setState({ content });
  }

  renderEditor() {
    const { content } = this.props;
    const { edit, textLength } = this.state;
    const { headingType = 'heading', text = '' } = content;
    if (!edit) return '';
    return (
      <div>
        <FormControl>
          <InputLabel>Heading type</InputLabel>
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
          helperText={textLength}
          value={text}
          onChange={this.handleTextChange}
        />
      </div>
    );
  }

  render() {
    return this.renderEditor();
  }
}

export default ComponentAction(Title);
