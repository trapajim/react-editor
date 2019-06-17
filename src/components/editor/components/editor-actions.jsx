import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { EditorComponentContext } from '../editor-component-context';

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
    afterPos: PropTypes.number,
    classes: PropTypes.objectOf(PropTypes.shape),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  static defaultProps = { show: false, size: 'small', afterPos: -1 };

  static generateId(pre) {
    return `${pre}_${new Date().getTime()}`;
  }

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

  addComponents(type, position, evt) {
    evt.stopPropagation();
    const { addedComponents, setState, userId } = this.context;
    const currentState = [...addedComponents];
    currentState.splice(position + 1, 0, {
      type,
      position,
      id: EditorActions.generateId(type),
      content: {},
      edit: userId,
    });

    for (let i = 0; i < currentState.length; i += 1) {
      currentState[i].position = i;
    }
    setState({ components: currentState });
  }

  renderComponents() {
    const { components, addedComponents = {} } = this.context;
    const { size, classes, afterPos } = this.props;
    const len = afterPos === -1 ? addedComponents.length : afterPos;
    return Object.keys(components).map(key => (
      <Tooltip
        key={components[key].title + key}
        title={components[key].title}
        TransitionComponent={Zoom}
        onClick={evt => {
          this.addComponents(key, len, evt);
        }}
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
    let events = {};
    if (!show) {
      events = {
        onMouseEnter: this.handleToggleShowMenu,
        onMouseLeave: this.handleToggleShowMenu,
      };
    }
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
