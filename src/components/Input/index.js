import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, fontSize } from '../../constants';
import { scale } from '../../utils/resolutions';
import Text from '../Text';

const Input = ({
  name,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  ...rest
}) => {
  return (
    <View>
      <TextInput
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        {...rest}
      />
      {errors && touched && errors[name] && touched[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    fontSize: fontSize.tiny,
    marginTop: scale(3),
    paddingLeft: scale(10),
  },
});

export default Input;
