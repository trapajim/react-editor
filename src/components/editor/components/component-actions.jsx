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
  disabled: {
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
};

const ComponentActions = WrappedComponent => {
  class HOC extends React.Component {
    static propTypes = {
      edit: PropTypes.bool,
      position: PropTypes.number,
      userId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
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

    isAllowedToEdit() {
      const { edit } = this.props;
      return edit === '';
    }

    handleSwitchEditMode(evt) {
      if (!this.isAllowedToEdit()) {
        return;
      }
      if (evt.type === 'keydown' && evt.keyCode !== 13) {
        return;
      }
      this.toggleEdit();
    }

    handleMouseOver() {
      if (!this.isAllowedToEdit()) {
        return;
      }
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
        userId,
      } = this.props;
      const { showBar, content } = this.state;
      const paperClass = {};
      paperClass.padding = classes.padding;
      if (bordered) {
        paperClass.border = classes.border;
      }
      let editing = false;
      if (edit !== '' && edit !== userId) {
        editing = true;
      }

      return edit === userId ? (
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
          className={classNames(classes.pointer, {
            [classes.border]: bordered,
            [classes.disabled]: editing,
          })}
          onMouseOver={this.handleMouseOver}
          onFocus={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
          role="button"
          tabIndex={position}
        >
          {editing ? <small>{userId} is editing</small> : ''}
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
