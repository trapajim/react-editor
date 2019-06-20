import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import ComponentAction from './component-actions';

export const parseUrl = url => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return '//www.youtube.com/embed/' + match[2];
  }
  const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const parsed = url.match(vimeoRegex);
  if (parsed) {
    return '//player.vimeo.com/video/' + parsed[1];
  }

  return url;
};

class Video extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape),
    setState: PropTypes.func,
  };

  static defaultProps = {
    content: {
      video: '',
    },
  };

  handleTextChange(evt) {
    console.log('hello');
    const { content, setState } = this.props;
    const text = evt.target.value;
    content.video = parseUrl(text);
    setState({ content });
  }

  saveText(url) {
    this.toggleEdit();
    const { setState } = this.props;
    const editContent = { video: url, videoType: 'url' };
    setState({ content: editContent });
  }

  renderEditor() {
    const { content } = this.props;
    const { video = '' } = content;
    return (
      <div>
        <TextField
          type="text"
          placeholder="url"
          label="video"
          margin="dense"
          fullWidth
          value={video}
          multiline
          rows={1}
          onChange={evt => this.handleTextChange(evt)}
        />
      </div>
    );
  }

  render() {
    return this.renderEditor();
  }
}

export default ComponentAction(Video);
