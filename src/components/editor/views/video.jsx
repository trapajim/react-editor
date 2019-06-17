import React from 'react';
import PropTypes from 'prop-types';

const VideoView = ({ content: { video } }) => (
  <div className="video-wrapper">
    <iframe
      width="560"
      height="315"
      src={video}
      title={video}
      frameBorder="0"
      allowFullscreen
    />
  </div>
);
VideoView.propTypes = {
  content: PropTypes.objectOf(PropTypes.shape).isRequired,
};
export default VideoView;
