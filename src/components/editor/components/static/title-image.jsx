import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  Card,
  CardMedia,
  CardContent,
  DialogContent,
  DialogTitle,
  Divider,
} from '@material-ui/core/';
import withStyles from '@material-ui/core/styles/withStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImageDownload from '../../../helper/download-images';
import { EditorContext } from '../../editor-context';

const css = () => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    backgroundSize: 'contain',
  },
});
class TitleImage extends React.Component {
  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.object),
    defaultValue: PropTypes.string,
    checkIsMobile: PropTypes.bool,
    maxImageSize: PropTypes.number,
    classes: PropTypes.objectOf(PropTypes.shape),
  };

  static defaultProps = { maxImageSize: 2 };

  constructor(props) {
    super(props);
    let img = '';
    const { defaultValue } = this.props;
    if (defaultValue !== '') {
      img = defaultValue;
    }
    this.state = {
      shouldShowSearchPopup: false,
      imagePreviewUrl: img,
      error: '',
    };

    this.toggleSearchPopup = this.toggleSearchPopup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = this.props;
    if (defaultValue !== nextProps.defaultValue) {
      this.setState({ imagePreviewUrl: defaultValue });
    }
  }

  handleImageChange(e, updateComponents) {
    e.preventDefault();
    const { maxImageSize } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];
    if (e.target.files[0].size / 1024 / 1024 > maxImageSize) {
      this.setState({
        error: 'the images size must be smaller than' + maxImageSize + ' mb',
      });
      return;
    }
    reader.onloadend = () => {
      this.setState({
        error: '',
        imagePreviewUrl: reader.result,
      });
      updateComponents('file', file);
      this.toggleSearchPopup();
    };
    reader.readAsDataURL(file);
  }

  selectedImage(url, updateComponents) {
    ImageDownload(url, file => {
      this.setState({
        error: '',
        imagePreviewUrl: url,
        shouldShowSearchPopup: false,
      });
      updateComponents('file', file);
    });
  }

  handleKeyPress(e, url, updateComponents) {
    if (e.keyCode === 13) {
      this.selectedImage(url, updateComponents);
    }
  }

  toggleSearchPopup() {
    const { shouldShowSearchPopup } = this.state;
    this.setState({ shouldShowSearchPopup: !shouldShowSearchPopup });
  }

  renderModal() {
    const { shouldShowSearchPopup } = this.state;
    const { components } = this.props;
    /*  */
    return (
      <EditorContext.Consumer>
        {context => (
          <Dialog
            fullWidth
            maxWidth="md"
            open={shouldShowSearchPopup}
            onClose={this.toggleSearchPopup}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="File upload"
                onChange={e =>
                  this.handleImageChange(e, context.updateComponents)
                }
                type="file"
                fullWidth
              />
            </DialogContent>
            <Divider variant="middle" />
            <DialogTitle id="form-dialog-title">Select Image</DialogTitle>
            <DialogContent>
              {components.map((c, i) => {
                if (c.type === 'Images' && c.content != null) {
                  return (
                    <div
                      key={c.content.image}
                      tabIndex={i}
                      role="button"
                      onKeyPress={this.handleKeyPress.bind(
                        this,
                        c.content.image,
                        context.updateComponents,
                      )}
                      onClick={this.selectedImage.bind(
                        this,
                        c.content.image,
                        context.updateComponents,
                      )}
                    >
                      <img
                        style={{ width: '200px', marginRight: '10px' }}
                        alt="props"
                        src={c.content.image}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </DialogContent>
          </Dialog>
        )}
      </EditorContext.Consumer>
    );
  }

  renderImageView() {
    const { checkIsMobile, classes } = this.props;
    if (checkIsMobile && !window.matchMedia('(max-width: 480px)').matches) {
      return <div />;
    }
    const { imagePreviewUrl, error } = this.state;

    return (
      <div>
        {this.renderModal()}
        <Card className={classes.card}>
          {imagePreviewUrl && (
            <CardMedia
              className={classes.cover}
              image={imagePreviewUrl}
              title="Live from space album cover"
            />
          )}
          <div className={classes.details}>
            <p>{error}</p>
            <div>
              <CardContent className={classes.content}>
                {!imagePreviewUrl && <span>Please select a title image </span>}
                <Button
                  variant="outlined"
                  color="default"
                  onClick={this.toggleSearchPopup}
                >
                  Upload
                  <CloudUploadIcon />
                </Button>
              </CardContent>
              <div />
            </div>
          </div>
        </Card>
      </div>
    );

    // return <img src={imagePreviewUrl} className="title-image" alt="title" />;
  }

  render() {
    return this.renderImageView();
  }
}
export default withStyles(css, { withTheme: true })(TitleImage);
