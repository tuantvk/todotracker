import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = ({ bold, style, children, ...rest }) => {
  return (
    <RNText style={[bold ? styles.bold : styles.regular, style]} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'Poppins_Bold',
  },
  regular: {
    fontFamily: 'Poppins_Regular',
  },
});

export default Text;
