import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../constants';
const Layout = ({ children, bgColor }) => {
  return (
    <View style={[{ backgroundColor: bgColor || colors.white }, styles.layout]}>
      <StatusBar
        animated
        barStyle="dark-content"
        backgroundColor={colors.white}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

export default Layout;
