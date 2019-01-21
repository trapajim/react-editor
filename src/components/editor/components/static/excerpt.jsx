import React from 'react';
import PropTypes from 'prop-types';
import Editable from './editable';

const Excerpt = props => {
  const { editor, value, handleChange } = props;
  if (editor) {
    return (
      <textarea
        className="col-sm-12 form-group form-control editor-textarea"
        placeholder="Excerpt"
        id="excerp"
        value={value}
        onChange={handleChange}
      />
    );
  }
  return <p className="excerp">{value}</p>;
};
Excerpt.propTypes = {
  editor: PropTypes.bool,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
const EditableExcerpt = Editable(Excerpt);

export default EditableExcerpt;
