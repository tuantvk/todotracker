import React from 'react';
import { Text as RNText, StyleSheet, Platform } from 'react-native';

const Text = ({ bold, style, children, ...rest }) => {
  return (
    <RNText style={[bold ? styles.bold : styles.regular, style]} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: Platform.OS === 'android' ? 'Poppins_Bold' : 'Poppins Bold',
  },
  regular: {
    fontFamily:
      Platform.OS === 'android' ? 'Poppins_Regular' : 'Poppins Regular',
  },
});

export default Text;
