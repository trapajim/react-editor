import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import VertTop from '@material-ui/icons/VerticalAlignTopOutlined';
import VertBottom from '@material-ui/icons/VerticalAlignBottomOutlined';
import Bookmark from '@material-ui/icons/BookmarkOutlined';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownOutlined';
import ArrowUp from '@material-ui/icons/KeyboardArrowUpOutlined';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/ControlPointOutlined';
import { withStyles } from '@material-ui/core/styles';
import { EditorContext } from '../editor-context';

const style = {
  color: {
    color: '#2196F3',
  },
};

class ComponentToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleMoveButtonClicked = this.handleMoveButtonClicked.bind(this);
    this.handleBookmarkButtonClick = this.handleBookmarkButtonClick.bind(this);
    this.handleAddClicked = this.handleAddClicked.bind(this);
  }

  handleSaveButtonClick() {
    const { content, position } = this.props;
    const { updateComponents } = this.context;
    updateComponents(content, position);
  }

  handleCancelButtonClick() {
    const { cancelActionCallBack } = this.props;
    cancelActionCallBack();
  }

  handleDeleteButtonClick() {
    const { deleteComponentAtIndex } = this.context;
    const { position } = this.props;
    deleteComponentAtIndex(position);
  }

  handleMoveButtonClicked(evt) {
    const moveDirection = evt.currentTarget.getAttribute('data-move');
    const { moveComponent } = this.context;
    const { position } = this.props;

    moveComponent(position, this.getNewPositionOfElement(moveDirection));
  }

  handleBookmarkButtonClick() {
    const { updateMarkedComponents } = this.context;
    const { position } = this.props;
    updateMarkedComponents(position);
  }

  handleAddClicked() {
    const { updateShowAddComponentAfterPosition } = this.context;
    const { position } = this.props;
    updateShowAddComponentAfterPosition(position);
  }

  getNewPositionOfElement(direction) {
    const { position } = this.props;
    let newPosition = 0;
    switch (direction) {
      case 'first':
        newPosition = 0;
        break;
      case 'last':
        newPosition = 999999;
        break;
      case 'up':
        newPosition = position - 1;
        break;
      case 'down':
        newPosition = position + 1;
        break;
      default:
        newPosition = 0;
    }
    return newPosition;
  }

  render() {
    const { classes, bordered, slim } = this.props;
    return (
      <div>
        <Toolbar>
          {slim ? (
            <Tooltip title="add component" TransitionComponent={Zoom}>
              <Add onClick={this.handleAddClicked} />
            </Tooltip>
          ) : (
            ''
          )}
          <div style={{ flexGrow: 1 }} />
          <Tooltip title="move 1 up" TransitionComponent={Zoom}>
            <IconButton
              className={classNames({ [classes.color]: bordered })}
              aria-label="move 1 up"
              data-move="up"
              onClick={this.handleMoveButtonClicked}
            >
              <ArrowUp />
            </IconButton>
          </Tooltip>
          <Tooltip title="move 1 down" TransitionComponent={Zoom}>
            <IconButton
              className={classNames({ [classes.color]: bordered })}
              aria-label="move 1 down"
              data-move="down"
              onClick={this.handleMoveButtonClicked}
            >
              <ArrowDown />
            </IconButton>
          </Tooltip>
          {bordered ? (
            <div />
          ) : (
            <div>
              <Tooltip title="move to the top" TransitionComponent={Zoom}>
                <IconButton
                  aria-label="move to the top"
                  data-move="first"
                  onClick={this.handleMoveButtonClicked}
                >
                  <VertTop />
                </IconButton>
              </Tooltip>
              <Tooltip title="move to bottom" TransitionComponent={Zoom}>
                <IconButton
                  aria-label="move to top"
                  data-move="last"
                  onClick={this.handleMoveButtonClicked}
                >
                  <VertBottom />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <Tooltip title="delete" TransitionComponent={Zoom}>
            <IconButton
              className={classNames({ [classes.color]: bordered })}
              aria-label="delete"
              onClick={this.handleDeleteButtonClick}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="mark" TransitionComponent={Zoom}>
            <IconButton
              className={classNames({ [classes.color]: bordered })}
              aria-label="mark"
              onClick={this.handleBookmarkButtonClick}
            >
              <Bookmark />
            </IconButton>
          </Tooltip>
          {!slim ? (
            <Tooltip title="save" TransitionComponent={Zoom}>
              <IconButton
                aria-label="save"
                onClick={this.handleSaveButtonClick}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
          {!slim ? (
            <Tooltip title="Cancel" TransitionComponent={Zoom}>
              <IconButton
                aria-label="cancel"
                onClick={this.handleCancelButtonClick}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
        </Toolbar>
      </div>
    );
  }
}
ComponentToolbar.contextType = EditorContext;
ComponentToolbar.propTypes = {
  content: PropTypes.objectOf(PropTypes.string),
  position: PropTypes.number,
  cancelActionCallBack: PropTypes.func,
  bordered: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.shape),
  slim: PropTypes.bool,
};
export default withStyles(style)(ComponentToolbar);
