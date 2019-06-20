import React from 'react';
import PropTypes from 'prop-types';

export default class InstagramVideoView extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape).isRequired,
  };

  constructor(props) {
    super(props);
    const { content } = this.props;
    const { url } = content;

    this.state = { instaContent: [], url, timer: null };
  }

  componentDidMount() {
    if (!window.instgrm) {
      const script = document.createElement('script');
      script.src = 'https://platform.instagram.com/en_US/embeds.js';
      script.async = true;
      document.body.appendChild(script);
    }
    this.checkAPI().then(() => this.getInsta());
  }

  componentWillReceiveProps(nextProps) {
    const { edit } = this.state;
    const {
      content: { url },
    } = this.props;
    if (edit) {
      return;
    }

    if (nextProps.content.url !== url) {
      this.setState(
        {
          url: nextProps.content.url,
        },
        () => {
          this.checkAPI().then(() => this.getInsta());
        },
      );
    }
  }

  checkAPI() {
    return new Promise(resolve => {
      const check = () => {
        const timeout = setTimeout(() => {
          if (window.instgrm) {
            const { timer } = this.state;
            clearTimeout(timer);
            resolve();
          } else {
            check(this);
          }
        }, 50);
        this.setState({ timer: timeout });
      };
      check();
    });
  }

  getInsta() {
    const { url } = this.state;
    if (url === '') return;
    fetch('https://api.instagram.com/oembed?url=' + url)
      .then(data => data.json())
      .then(json => {
        this.setState({ instaContent: json }, () => {
          if (window.instgrm.Embeds !== 'undefined') {
            window.instgrm.Embeds.process();
          }
        });
      });
  }

  render() {
    const { instaContent } = this.state;
    return instaContent.length === 0 ? (
      <div />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: instaContent.html }} />
    );
  }
}
