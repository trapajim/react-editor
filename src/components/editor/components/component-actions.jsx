import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const style = {
  padding: {
    padding: '10px',
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
    };

    constructor(props) {
      super(props);
      const { edit } = this.props;
      this.state = { edit };
      this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
      const { position, updateEditState } = this.props;

      updateEditState(position);
    }

    render() {
      // @todo figure out why I have to use Object assign
      const { classes, edit, updateEditState, content, position } = this.props;
      return edit ? (
        <Paper elevation={10} className={classes.padding}>
          <WrappedComponent
            updateEditState={updateEditState}
            handleToggleEdit={this.toggleEdit}
            content={Object.assign({}, content)}
            position={position}
            {...this.state}
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
