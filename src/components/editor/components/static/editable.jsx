import React from 'react';
import PropTypes from 'prop-types';

const Editable = WrappedComponent => {
  class HOC extends React.Component {
    static propTypes = {
      defaultValue: PropTypes.string,
      updateCurChar: PropTypes.func,
      editor: PropTypes.bool,
    };

    static defaultProps = { defaultValue: '' };

    constructor(props) {
      super(props);
      const { defaultValue } = this.props;
      this.state = { val: defaultValue };

      this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      const { defaultValue } = this.props;
      if (defaultValue !== nextProps.defaultValue) {
        this.setState({ val: nextProps.defaultValue });
      }
    }

    onChange(event) {
      const newText = event.target.value;
      const { updateCurChar } = this.props;
      const { val } = this.state;
      updateCurChar(newText.length - val.length);
      this.setState({ val: newText });
    }

    render() {
      return (
        <WrappedComponent
          handleChange={this.onChange}
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  return HOC;
};

export default Editable;
