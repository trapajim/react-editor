import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { EditorComponentContext } from '../editor-context';

const style = {
  padding: {
    padding: '8px',
  },
  increasedWidth: {},
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};
class EditorActions extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    size: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.shape),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = { show: false, size: 'small' };

  constructor(props) {
    super(props);
    const { show } = this.props;
    this.state = { showMenu: show };
    this.handleToggleShowMenu = this.handleToggleShowMenu.bind(this);
  }

  handleToggleShowMenu() {
    const { showMenu } = this.state;
    const { show } = this.props;
    if (show) {
      return;
    }
    this.setState({ showMenu: !showMenu });
  }

  renderComponents() {
    const { components } = this.context;
    const { size, classes } = this.props;
    return Object.keys(components).map(key => (
      <Tooltip
        key={components[key].title + key}
        title={components[key].title}
        TransitionComponent={Zoom}
      >
        <IconButton
          aria-label={components[key].title}
          size={size}
          className={classes.padding}
        >
          {components[key].icon}
        </IconButton>
      </Tooltip>
    ));
  }

  render() {
    const { classes, children, show } = this.props;
    const { showMenu } = this.state;
    const events = !show
      ? {
          onMouseEnter: this.handleToggleShowMenu,
          onMouseLeave: this.handleToggleShowMenu,
        }
      : {};
    return (
      <div {...events}>
        {children}
        {showMenu ? (
          <Paper className={classes.flexCenter}>
            <Grow in>
              <div>{this.renderComponents()}</div>
            </Grow>
          </Paper>
        ) : (
          <div> a </div>
        )}
      </div>
    );
  }
}
EditorActions.contextType = EditorComponentContext;
export default withStyles(style)(EditorActions);
