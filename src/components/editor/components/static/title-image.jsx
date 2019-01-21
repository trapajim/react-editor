import React from 'react';

export default class TitleImage extends React.Component {
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
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = this.props;
    if (defaultValue != nextProps.defaultValue) {
      this.setState({ imagePreviewUrl: defaultValue });
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    if (e.target.files[0].size / 1024 / 1024 > 2) {
      this.setState({ error: 'the images size must be smaller than 2MB' });
      return;
    }
    reader.onloadend = () => {
      this.setState({
        file: file,
        error: '',
        imagePreviewUrl: reader.result,
      });
      this.props.changed('file', file);
      this.toggleSearchPopup();
    };
    reader.readAsDataURL(file);
  }

  selectedImage(url) {
    getImageFormUrl(url, file => {
      this.setState({
        error: '',
        imagePreviewUrl: url,
      });
      this.props.changed('file', file);
      this.toggleSearchPopup();
    });
  }

  toggleSearchPopup() {
    this.setState({ shouldShowSearchPopup: !this.state.shouldShowSearchPopup });
  }

  renderModal() {
    if (!this.state.shouldShowSearchPopup) {
      return <div />;
    }
    return (
      <div
        id="rel-article-modal"
        className="modal fade in"
        role="dialog"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={this.toggleSearchPopup.bind(this)}
              >
                &times;
              </button>
              <div id="custom-search-input" className="col-md-10">
                <label className="file">
                  <input
                    type="file"
                    onChange={e => this.handleImageChange(e)}
                  />
                  <span className="file-custom" />
                </label>
              </div>
            </div>
            <div className="modal-body">
              {this.props.comp.map((c, i) => {
                if (c.type == 'Images' && c.content != null) {
                  return (
                    <img
                      style={{ width: '100px', marginRight: '10px' }}
                      key={i}
                      src={c.content.image}
                      onClick={this.selectedImage.bind(this, c.content.image)}
                    />
                  );
                }
              })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                onClick={this.toggleSearchPopup.bind(this)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderImageView() {
    if (
      this.props.checkIsMobile &&
      !window.matchMedia('(max-width: 480px)').matches
    ) {
      return <div />;
    }
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} className="title-image" />;
    } else {
      $imagePreview = (
        <div className="previewText well">
          Please select an Image for Preview
        </div>
      );
    }
    if (this.props.editor) {
      return (
        <div className="col-xs-12">
          {this.renderModal()}
          <div className="row">
            <p>{this.state.error}</p>
            <div className="col-xs-12 col-sm-4">{$imagePreview}</div>
            <div className="col-xs-12 col-sm-8">
              <div
                className="btn btn-default"
                onClick={this.toggleSearchPopup.bind(this)}
              >
                Add title image
              </div>
            </div>
          </div>
        </div>
      );
    }
    return $imagePreview;
  }

  render() {
    return this.renderImageView();
  }
}
