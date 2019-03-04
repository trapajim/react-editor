import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ComponentToolbar from './component-toolbar';

const style = {
  padding: {
    padding: '10px',
  },
  border: {
    border: '2px solid #2196F3',
  },
  pointer: {
    cursor: 'pointer',
  },
};

const ComponentActions = WrappedComponent => {
  class HOC extends React.Component {
    static propTypes = {
      edit: PropTypes.bool,
      position: PropTypes.number,
      updateEditState: PropTypes.func,
      updateShowAddComponentAfterPosition: PropTypes.func,
      content: PropTypes.objectOf(PropTypes.shape),
      classes: PropTypes.objectOf(PropTypes.shape),
      bordered: PropTypes.bool,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
    };

    constructor(props) {
      super(props);
      const { edit, content, position } = this.props;
      this.state = { edit, content, position, showBar: false };
      this.toggleEdit = this.toggleEdit.bind(this);
      this.onHandleSetState = this.onHandleSetState.bind(this);
      this.handleSwitchEditMode = this.handleSwitchEditMode.bind(this);
      this.handleMouseOver = this.handleMouseOver.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    toggleEdit() {
      const { position, updateEditState } = this.props;

      updateEditState(position);
    }

    handleSwitchEditMode(evt) {
      if (evt.type === 'keydown' && evt.keyCode !== 13) {
        return;
      }
      console.log(evt.target);
      console.log(evt.currentTarget);
      this.toggleEdit();
    }

    handleMouseOver() {
      this.setState({ showBar: true });
    }

    handleMouseLeave() {
      const { updateShowAddComponentAfterPosition } = this.props;
      this.setState({ showBar: false });
      updateShowAddComponentAfterPosition(-1);
    }

    onHandleSetState(fn) {
      this.setState(fn);
    }

    render() {
      // @todo figure out why I have to use Object assign
      const {
        classes,
        edit,
        updateEditState,
        position,
        children,
        bordered,
      } = this.props;
      const { showBar, content } = this.state;
      const paperClass = {};
      paperClass.padding = classes.padding;
      if (bordered) {
        paperClass.border = classes.border;
      }

      return edit ? (
        <Paper
          elevation={10}
          className={classNames(classes.padding, {
            [classes.border]: bordered,
          })}
        >
          <WrappedComponent
            updateEditState={updateEditState}
            handleToggleEdit={this.toggleEdit}
            content={Object.assign({}, content)}
            position={position}
            setState={this.onHandleSetState}
            {...this.state}
          />

          <ComponentToolbar
            content={content}
            position={position}
            bordered={bordered}
            cancelActionCallBack={this.toggleEdit}
          />
        </Paper>
      ) : (
        <div
          className={classNames(classes.pointer)}
          onMouseOver={this.handleMouseOver}
          onFocus={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
          role="button"
          tabIndex={position}
        >
          <div
            onClick={this.handleSwitchEditMode}
            onKeyDown={this.handleSwitchEditMode}
            role="button"
            tabIndex={position}
          >
            {children}
          </div>
          {showBar ? (
            <ComponentToolbar
              content={content}
              position={position}
              bordered={bordered}
              cancelActionCallBack={this.toggleEdit}
              slim
            />
          ) : (
            ''
          )}
        </div>
      );
    }
  }

  return withStyles(style)(HOC);
};

export default ComponentActions;
