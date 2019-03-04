import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const style = {
  responsive: {
    width: '100%',
    height: 'auto',
  },
};
const Img = props => {
  const { classes, ...rest } = props;
  return <img className={classes.responsive} {...rest} alt="" />;
};
Img.propTypes = {
  classes: PropTypes.objectOf(PropTypes.shape),
};
export default withStyles(style)(Img);
