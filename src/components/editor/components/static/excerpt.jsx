import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Editable from './editable';

const Excerpt = props => {
  const { val, handleChange } = props;

  return (
    <TextField
      type="text"
      placeholder="excerpt"
      id="outlined-multiline-flexible"
      label="excerpt"
      multiline
      margin="normal"
      helperText="short description of the article"
      variant="outlined"
      value={val}
      fullWidth
      onChange={handleChange}
      rows={4}
    />
  );

  // return <p className="excerp">{val}</p>;
};
Excerpt.propTypes = {
  val: PropTypes.string,
  handleChange: PropTypes.func,
};
const EditableExcerpt = Editable(Excerpt);

export default EditableExcerpt;
