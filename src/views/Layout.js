import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { colors } from '../constants';
const Layout = ({ children, bgColor }) => {
  return (
    <SafeAreaView
      style={[{ backgroundColor: bgColor || colors.white }, styles.layout]}>
      <StatusBar
        animated
        barStyle="dark-content"
        backgroundColor={colors.white}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

export default Layout;
