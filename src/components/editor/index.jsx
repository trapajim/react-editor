import React from 'react';
import {
  EditorContext,
  EditorComponentContext,
  DefaultComponents,
} from './editor-context';
import { Excerpt, BlogTitle, TitleImage } from './components/static';
import EditorActions from './components/editor-actions';
import Title from './components/title';

// const Test = React.lazy(() => import('./test.jsx'));

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [
        {
          type: 'Title',
          edit: true,
          content: {
            headingType: 'heading',
            text: 'hello',
          },
        },
        {
          type: 'Title',
          edit: false,
          content: {
            headingType: 'heading',
            text:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Tokyo_Tower_and_around_Skyscrapers.jpg/238px-Tokyo_Tower_and_around_Skyscrapers.jpg',
          },
        },
      ],
    };
    //
    this.onComponentUpdate = this.onComponentUpdate.bind(this);
  }

  onComponentUpdate(content, position) {
    const { components } = this.state;
    components[position].content = content;
    components[position].edit = false;
    this.setState({ components });
    if (components[position].type === 'Legacy') {
      return;
    }
    localStorage.setItem(this.localStorageName, JSON.stringify(components));
  }

  render() {
    const { components } = this.state;
    return (
      <div>
        <EditorContext.Provider
          value={{
            updateComponents: this.onComponentUpdate,
          }}
        >
          <BlogTitle defaultValue="Title" updateCurChar={() => {}} />
          <Excerpt defaultValue="Hello" updateCurChar={() => {}} />
          <TitleImage
            components={components}
            defaultValue=""
            changed={() => {}}
            updateCurChar={() => {}}
          />
          <EditorComponentContext.Provider
            value={{ components: DefaultComponents }}
          >
            <EditorActions show={true} />
          </EditorComponentContext.Provider>
          <Title
            edit={components[0].edit}
            position={0}
            content={components[0].content}
          />
          <Title
            edit={components[1].edit}
            position={1}
            content={components[1].content}
          />
        </EditorContext.Provider>
      </div>
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
