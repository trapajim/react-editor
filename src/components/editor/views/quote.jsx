import React from 'react';
import PropTypes from 'prop-types';

const QuoteView = ({ content: { quote, url } }) => (
  <blockquote>
    <p>{quote}</p>
    <footer>
      Source: <cite title="Source Title">{url}</cite>
    </footer>
  </blockquote>
);
QuoteView.propTypes = {
  content: PropTypes.objectOf(PropTypes.shape).isRequired,
};
export default QuoteView;
