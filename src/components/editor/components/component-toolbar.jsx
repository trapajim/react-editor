import React from 'react';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import { EditorContext } from '../editor-context';

class ComponentToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }

  handleSaveButtonClick() {
    const { content, position } = this.props;
    // @todo: have to use Object.assign to remove the reference
    // check if there's a better solution
    const c = Object.assign({}, content);
    const { updateComponents } = this.context;
    updateComponents(c, position);
  }

  handleCancelButtonClick() {
    const { cancelActionCallBack } = this.props;
    cancelActionCallBack();
  }

  render() {
    return (
      <Toolbar>
        <div style={{ flexGrow: 1 }} />

        <Tooltip
          title="save"
          TransitionComponent={Zoom}
          onClick={this.handleSaveButtonClick}
        >
          <IconButton aria-label="save">
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Cancel"
          TransitionComponent={Zoom}
          onClick={this.handleCancelButtonClick}
        >
          <IconButton aria-label="cancel">
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  }
}
ComponentToolbar.contextType = EditorContext;
ComponentToolbar.propTypes = {
  content: PropTypes.objectOf(PropTypes.string),
  position: PropTypes.number,
  cancelActionCallBack: PropTypes.func,
};
export default ComponentToolbar;
