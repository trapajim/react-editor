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
      const { edit } = this.state;
      if (!edit) {
        updateEditState(
          {
            edit: true,
          },
          position,
        );
      }
      this.setState({ edit });
    }

    render() {
      const { classes, edit } = this.props;
      return edit ? (
        <Paper elevation={10} className={classes.padding}>
          <WrappedComponent
            handleToggleEdit={this.toggleEdit}
            {...this.props}
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
