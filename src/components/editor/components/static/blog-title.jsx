import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Editable from './editable';

const BlogTitle = props => {
  const { val, handleChange } = props;

  return (
    <TextField
      type="text"
      placeholder="Title"
      label="Title"
      margin="dense"
      fullWidth
      variant="outlined"
      value={val}
      onChange={handleChange}
    />
  );

  //  return <h1 className="article-title">{val}</h1>;
};
BlogTitle.propTypes = {
  val: PropTypes.string,
  handleChange: PropTypes.func,
};
const Title = Editable(BlogTitle);

export default Title;
