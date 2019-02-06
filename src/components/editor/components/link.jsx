import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ComponentAction from './component-actions';
import Img from '../../helper/Img';

class Link extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape),
    edit: PropTypes.bool,
    setState: PropTypes.func,
  };

  static defaultProps = {
    content: {
      url: '',
      title: '',
      desc: '',
    },
  };

  constructor(props) {
    super(props);
    const { content, edit } = this.props;
    const { desc = '', title = '' } = content;
    this.timer = false;
    this.state = {
      edit,
      textLength: desc.length + title.length,
    };
  }

  getOgp(link) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(async () => {
      const url = encodeURIComponent(link);
      const response = await fetch('https://api.urlmeta.org/?url=' + url);
      const data = await response.json();
      console.log(data);
    }, 500);
  }

  handleTextChange(evt, type) {
    const { content, setState } = this.props;
    if (type === 'url') {
      this.getOgp(evt.target.value);
    }
    content[type] = evt.target.value;
    setState({ content });
  }

  renderEditor() {
    const { content } = this.props;
    const { edit, textLength } = this.state;
    const { url = '', title = '', desc = '', img = '' } = content;
    if (!edit) return '';
    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item xs={4}>
          <Img
            alt="ogp"
            src="https://tsunagujapan.com/assets/og-6d8bf6e51ba0996748d15b65c1356b50fbbd60e0ae0e6dd82f3781b8d4766b93.jpg"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="text"
            placeholder="Url"
            label="Url"
            margin="dense"
            fullWidth
            value={url}
            onChange={evt => this.handleTextChange(evt, 'url')}
          />
          <TextField
            type="text"
            placeholder="Title"
            label="Title"
            margin="dense"
            fullWidth
            value={title}
            onChange={evt => this.handleTextChange(evt, 'title')}
          />
          <TextField
            type="text"
            placeholder="description"
            label="description"
            margin="dense"
            fullWidth
            value={desc}
            rows={4}
            onChange={evt => this.handleTextChange(evt, 'desc')}
          />
        </Grid>
      </Grid>
    );
  }

  render() {
    return this.renderEditor();
  }
}

export default ComponentAction(Link);
