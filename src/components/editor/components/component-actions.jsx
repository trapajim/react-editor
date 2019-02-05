import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ComponentToolbar from './component-toolbar';

const style = {
  padding: {
    padding: '10px',
  },
  border: {
    border: '2px solid #2196F3',
  },
};

const ComponentActions = WrappedComponent => {
  class HOC extends React.Component {
    static propTypes = {
      edit: PropTypes.bool,
      position: PropTypes.number,
      updateEditState: PropTypes.func,
      content: PropTypes.objectOf(PropTypes.shape),
      classes: PropTypes.objectOf(PropTypes.shape),
      bordered: PropTypes.bool,
    };

    constructor(props) {
      super(props);
      const { edit, content, position } = this.props;
      this.state = { edit, content, position };
      this.toggleEdit = this.toggleEdit.bind(this);
      this.onHandleSetState = this.onHandleSetState.bind(this);
    }

    toggleEdit() {
      const { position, updateEditState } = this.props;

      updateEditState(position);
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
        content,
        position,
        bordered,
      } = this.props;
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
        <div />
      );
    }
  }

  return withStyles(style)(HOC);
};

export default ComponentActions;
