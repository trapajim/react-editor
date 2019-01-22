import React, { Suspense } from 'react';
import { EditorContext } from './editor-context';
import { Excerpt, BlogTitle, TitleImage } from './components/static';
// const Test = React.lazy(() => import('./test.jsx'));

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [
        {
          type: 'Images',
          content: {
            image: 'https://www.tsunagujapan.com/assets/logo.png',
          },
        },
      ],
    };
    //
  }

  render() {
    return (
      <EditorContext.Provider
        value={{ state: this.state, updateComponents: () => {} }}
      >
        <BlogTitle defaultValue="Title" editor updateCurChar={() => {}} />
        <Excerpt defaultValue="Hello" editor updateCurChar={() => {}} />
        <TitleImage
          defaultValue=""
          editor
          changed={() => {}}
          updateCurChar={() => {}}
        />
        <Suspense fallback={<div>Loading...</div>} />
      </EditorContext.Provider>
    );
  }
}
/*
Editor.propTypes = {
  components: PropTypes.arrayOf(PropTypes.String),
};

Editor.defaultProps = {
  components: DefaultComponents,
};
*/
export default Editor;
