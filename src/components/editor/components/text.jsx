import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import ComponentAction from './component-actions';

class Text extends React.Component {
  static propTypes = {
    content: PropTypes.objectOf(PropTypes.shape),
    setState: PropTypes.func,
  };

  static defaultProps = {
    content: {
      text: '',
    },
  };

  constructor(props) {
    super(props);
    const { content } = this.props;
    const { text = '' } = content;
    content.text = text;

    this.state = {
      textLength: text.length,
    };
  }

  saveText(html, text) {
    const { content, setState } = this.props;
    const val = html;
    const editContent = content;
    editContent.text = val;
    const textLength = text.length;
    this.setState({ textLength });
    setState({ content: editContent });
  }

  renderEditor() {
    const { content } = this.props;
    const { textLength } = this.state;
    const { text = '' } = content;
    return (
      <div>
        <CKEditor
          data={text}
          config={{
            extraAllowedContent: [
              'div(*)',
              'span(*)',
              'address(*)',
              'br(*)',
              '*{*}',
              '*[id]',
              'iframe[*]',
            ],
          }}
          onChange={event => {
            this.saveText(
              event.editor.getData(),
              event.editor.document.getBody().getText(),
            );
          }}
        />

        {textLength}
      </div>
    );
  }

  render() {
    return this.renderEditor();
  }
}

export default ComponentAction(Text);
