import React from 'react';
import { EditorContext } from './editor-context';
import {
  EditorComponentContext,
  DefaultComponents,
} from './editor-component-context';
import { Excerpt, BlogTitle, TitleImage } from './components/static';
import EditorActions from './components/editor-actions';

// const Test = React.lazy(() => import('./test.jsx'));

class Editor extends React.Component {
  static resetComponentPosition(components) {
    const returnValue = components.map((element, index) => {
      const el = element;
      el.position = index;
      return el;
    });
    return returnValue;
  }

  constructor(props) {
    super(props);
    this.state = {
      setState: this.handleSetState.bind(this),
      components: [],
    };
    this.onComponentUpdate = this.onComponentUpdate.bind(this);
    this.updateEditStateOfComponent = this.updateEditStateOfComponent.bind(
      this,
    );
    this.deleteComponentAtIndex = this.deleteComponentAtIndex.bind(this);
    this.moveComponent = this.moveComponent.bind(this);
  }

  handleSetState(fn) {
    this.setState(fn);
  }

  onComponentUpdate(content, position) {
    const { components } = this.state;
    components[position].content = content;
    components[position].edit = false;
    this.setComponents(components);
    /* if (components[position].type === 'Legacy') {
      return;
    }
    */
  }

  deleteComponentAtIndex(position) {
    let { components } = this.state;
    components.splice(position, 1);
    components = Editor.resetComponentPosition(components);
    this.setComponents(components);
  }

  moveComponent(oldIndex, newIndex) {
    let { components } = this.state;
    let index = newIndex;
    if (index >= components.length) {
      index = components.length - 1;
    }

    components.splice(index, 0, components.splice(oldIndex, 1)[0]);
    components = Editor.resetComponentPosition(components);
    this.setComponents(components);
    return components;
  }

  updateEditStateOfComponent(position) {
    const { components } = this.state;
    components[position].edit = !components[position].edit;
    this.setComponents(components);
  }

  setComponents(components) {
    this.setState({ components });
    localStorage.setItem(this.localStorageName, JSON.stringify(components));
  }

  renderComponents() {
    const { components } = this.state;
    const component = [...components];
    return component.map(comp => {
      if (typeof comp.type === 'undefined') {
        return <div />;
      }
      const Component = DefaultComponents[comp.type.toLowerCase()].component;

      return (
        <Component
          key={'component' + comp.id}
          edit={comp.edit}
          position={comp.position}
          content={comp.content}
          updateEditState={this.updateEditStateOfComponent}
        />
      );
    });
  }

  render() {
    const { components, setState } = this.state;
    return (
      <div>
        <EditorContext.Provider
          value={{
            updateComponents: this.onComponentUpdate,
            deleteComponentAtIndex: this.deleteComponentAtIndex,
            moveComponent: this.moveComponent,
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
            value={{
              components: DefaultComponents,
              addedComponents: components,
              setState,
            }}
          >
            <EditorActions show={true} />
          </EditorComponentContext.Provider>
          {this.renderComponents()}
        </EditorContext.Provider>
      </div>
    );
  }
}
export default Editor;
