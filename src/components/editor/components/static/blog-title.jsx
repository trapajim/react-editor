import React from 'react';
import PropTypes from 'prop-types';
import Editable from './editable';

const BlogTitle = props => {
  const { editor, val, handleChange } = props;
  if (editor) {
    return (
      <input
        type="text"
        className="col-sm-12 form-group form-control"
        placeholder="Title"
        id="title"
        value={val}
        onChange={handleChange}
      />
    );
  }
  return <h1 className="article-title">{val}</h1>;
};
BlogTitle.propTypes = {
  editor: PropTypes.bool,
  val: PropTypes.string,
  handleChange: PropTypes.func,
};
const Title = Editable(BlogTitle);

export default Title;
