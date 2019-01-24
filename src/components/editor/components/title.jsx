import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import ComponentAction from './component-actions';

const style = {
  bigSelect: {
    width: '150px',
  },
};
class Title extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape),
    edit: PropTypes.bool,
    editor: PropTypes.bool,
    position: PropTypes.number,
    updateEditState: PropTypes.func,
    classes: PropTypes.objectOf(PropTypes.shape),
  };

  static defaultProps = {
    content: {
      headingType: 'heading',
      text: '',
    },
  };

  constructor(props) {
    super(props);
    let heading = 'heading';
    let contentText = '';
    const { content, edit } = this.props;
    if (content != null) {
      const { headingType, text } = content;
      heading = headingType;
      contentText = text;
    }
    this.state = {
      content,
      edit,
      textLength: contentText.length,
    };

    this.handleOnChangeHeading = this.handleOnChangeHeading.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleOnChangeHeading(event) {
    const { content } = this.state;
    content.headingType = event.target.value;
    this.setState({ content });
  }

  saveText() {
    /* this.setState({
      content: {
        text: this.heading.value,
      },
    });
    this.props.updateState(
      {
        text: this._heading.value,
        headingType: this.state.headingType,
      },
      this.props.position,
    );
    */
    this.toggleEdit();
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
    const { editor, classes } = this.props;
    const {
      edit,
      content: { headingType, text },
    } = this.state;
    if (!editor || !edit) return '';
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="age-simple">Heading type</InputLabel>
          <Select
            className={classes.bigSelect}
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
      </div>
    );
  }

  render() {
    return this.renderEditor();
  }
}

export default withStyles(style)(ComponentAction(Title));
