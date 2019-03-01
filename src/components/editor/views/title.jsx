import React from 'react';
import PropTypes from 'prop-types';

const props = {
  text: PropTypes.string.isRequired,
  compid: PropTypes.string.isRequired,
};

const Heading = ({ text, compid }) => (
  <h2 className="article-heading" id={'hl' + compid}>
    {text}
  </h2>
);
Heading.propTypes = props;

const SubHeading = ({ text, compid }) => <h3 id={'hl' + compid}>{text}</h3>;
SubHeading.propTypes = props;

const TitleView = ({ content, compid }) => {
  const { headingType, text } = content;
  let cont;
  if (headingType === 'heading') {
    cont = <Heading compid={compid} text={text} />;
  } else {
    cont = <SubHeading compid={compid} text={text} />;
  }
  return cont;
};

TitleView.propTypes = {
  content: PropTypes.objectOf(PropTypes.shape),
  compid: PropTypes.string,
};

export default TitleView;
