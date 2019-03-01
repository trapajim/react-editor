import React from 'react';
import PropTypes from 'prop-types';

const TextView = ({ content: { text } }) => (
  <div dangerouslySetInnerHTML={{ __html: text }} />
);
TextView.propTypes = {
  content: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default TextView;
