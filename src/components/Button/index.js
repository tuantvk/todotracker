import React from 'react';
import { TouchableOpacity } from 'react-native';

const defaultProps = {
  /* eslint-disable no-alert */
  onPress: () => alert('It works'),
};

const Button = ({ children, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.95} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

Button.defaultProps = defaultProps;
export default Button;
