import React, { Suspense } from 'react';
import {
  EditorContext,
  EditorComponentContext,
  DefaultComponents,
} from './editor-context';
import { Excerpt, BlogTitle, TitleImage } from './components/static';
import EditorActions from './components/editor-actions';
// const Test = React.lazy(() => import('./test.jsx'));

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [
        {
          type: 'Images',
          content: {
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Tokyo_Tower_and_around_Skyscrapers.jpg/238px-Tokyo_Tower_and_around_Skyscrapers.jpg',
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
        <EditorComponentContext.Provider
          value={{ components: DefaultComponents }}
        >
          <EditorActions show={true} />
        </EditorComponentContext.Provider>
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
