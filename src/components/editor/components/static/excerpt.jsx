import React from 'react';
import PropTypes from 'prop-types';
import Editable from './editable';

const Excerpt = props => {
  const { editor, val, handleChange } = props;
  if (editor) {
    return (
      <textarea
        className="col-sm-12 form-group form-control editor-textarea"
        placeholder="Excerpt"
        id="excerp"
        value={val}
        onChange={handleChange}
      />
    );
  }
  return <p className="excerp">{val}</p>;
};
Excerpt.propTypes = {
  editor: PropTypes.bool,
  val: PropTypes.string,
  handleChange: PropTypes.func,
};
const EditableExcerpt = Editable(Excerpt);

export default EditableExcerpt;
