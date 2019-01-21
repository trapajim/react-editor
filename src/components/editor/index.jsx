import React, { Suspense } from 'react';
import { EditorContext } from './editor-context';
import { Excerpt, BlogTitle } from './components/static';
// const Test = React.lazy(() => import('./test.jsx'));

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { components: [] };
  }

  render() {
    const { components } = this.state;
    return (
      <EditorContext.Provider value={components}>
        <BlogTitle defaultValue="Title" editor updateCurChar={() => {}} />
        <Excerpt defaultValue="Hello" editor updateCurChar={() => {}} />
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
