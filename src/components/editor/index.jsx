import React from 'react';
import PropTypes from 'prop-types';
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

    const editorComponents = props.editorComponents || DefaultComponents;
    this.state = {
      setState: this.handleSetState.bind(this),
      markedComponent: {},
      editorComponents,
      components: [],
    };
    this.onComponentUpdate = this.onComponentUpdate.bind(this);
    this.updateEditStateOfComponent = this.updateEditStateOfComponent.bind(
      this,
    );
    this.deleteComponentAtIndex = this.deleteComponentAtIndex.bind(this);
    this.moveComponent = this.moveComponent.bind(this);
    this.updateMarkedComponents = this.updateMarkedComponents.bind(this);
  }

  handleSetState(fn) {
    this.setState(fn);
  }

  updateMarkedComponents(pos) {
    const { markedComponent } = this.state;
    if (typeof markedComponent[pos] === 'undefined') {
      markedComponent[pos] = true;
    } else {
      delete markedComponent[pos];
    }

    this.setState({ markedComponent });
  }

  onComponentUpdate(content, position) {
    const { components } = this.state;
    components[position].content = content;
    components[position].edit = false;
    this.setComponents(components);
  }

  isMultiAction(position) {
    const { markedComponent } = this.state;
    return typeof markedComponent[position] !== 'undefined';
  }

  resetMarkedComponents() {
    this.setState({ markedComponent: {} });
  }

  deleteComponentAtIndex(position) {
    const { components } = this.state;
    let deleteIndexes = [position];

    if (this.isMultiAction(position)) {
      const { markedComponent } = this.state;
      deleteIndexes = markedComponent;
      this.resetMarkedComponents();
    }
    let newComponentState = [];
    components.forEach(el => {
      if (typeof deleteIndexes[el.position] === 'undefined') {
        newComponentState.push(el);
      }
    });
    newComponentState = Editor.resetComponentPosition(newComponentState);
    this.setComponents(newComponentState);
  }

  moveComponent(oldIndex, newIndex) {
    let { components } = this.state;
    let index = newIndex;

    if (this.isMultiAction(oldIndex)) {
      components = this.moveMultipleElementsToPosition(oldIndex > newIndex);
    } else {
      if (index >= components.length) {
        index = components.length - 1;
      }
      components.splice(index, 0, components.splice(oldIndex, 1)[0]);
    }
    components = Editor.resetComponentPosition(components);
    this.setComponents(components);
  }

  moveMultipleElementsToPosition(shouldMoveUp) {
    // @todo rework this mess
    const { markedComponent } = { ...this.state };
    const keys = Object.keys(markedComponent);
    keys.sort((a, b) => (shouldMoveUp ? a - b : b - a));
    const { components } = this.state;
    keys.forEach(k => {
      const key = parseInt(k, 10);
      let newPosition = key + 1;
      if (shouldMoveUp) {
        newPosition = key - 1;
      }
      delete markedComponent[key];
      markedComponent[newPosition] = true;
      const oldIndex = key;
      let newIndex = newPosition;
      if (newIndex >= components.length) {
        newIndex = components.length - 1;
      }

      components[oldIndex].position = newIndex;
      components[newIndex].position = oldIndex;
      components.splice(newIndex, 0, components.splice(oldIndex, 1)[0]);
    });
    return components;
  }

  updateEditStateOfComponent(position) {
    const { components } = this.state;
    components[position].edit = !components[position].edit;
    this.setComponents(components);
  }

  setComponents(components) {
    const { onContentUpdate } = this.props;
    if (typeof onContentUpdate === 'function') {
      onContentUpdate(components);
    }
    this.setState({ components });
    localStorage.setItem(this.localStorageName, JSON.stringify(components));
  }

  renderComponents() {
    const { components, markedComponent, editorComponents } = this.state;
    const addedComponents = [...components];
    return addedComponents.map(comp => {
      if (typeof comp.type === 'undefined') {
        return <div />;
      }
      const { component, props = {} } = editorComponents[
        comp.type.toLowerCase()
      ];
      const Component = component;

      return (
        <Component
          {...props}
          bordered={markedComponent[comp.position]}
          key={'component' + comp.id}
          edit={comp.edit}
          position={comp.position}
          content={Object.assign({}, comp.content)}
          updateEditState={this.updateEditStateOfComponent}
        />
      );
    });
  }

  render() {
    const { components, setState, editorComponents } = this.state;
    return (
      <div>
        <EditorContext.Provider
          value={{
            updateComponents: this.onComponentUpdate,
            deleteComponentAtIndex: this.deleteComponentAtIndex,
            moveComponent: this.moveComponent,
            updateMarkedComponents: this.updateMarkedComponents,
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
              components: editorComponents,
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

Editor.propTypes = {
  editorComponents: PropTypes.objectOf(PropTypes.shape),
  onContentUpdate: PropTypes.func,
};
export default Editor;
