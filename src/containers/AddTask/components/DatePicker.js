import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from '../../../components';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../../constants';
import { scale } from '../../../utils/resolutions';
import Feather from 'react-native-vector-icons/Feather';

const DatePicker = ({ name, values, setFieldValue }) => {
  const [showCalender, _setShowCalendar] = useState(false);

  const _onChange = (event, selectedDate) => {
    _setShowCalendar(false);
    if (selectedDate) {
      setFieldValue(name, selectedDate);
    }
  };

  return (
    <>
      <Button style={styles.btnCalendar} onPress={() => _setShowCalendar(true)}>
        <Text>{moment(values[name]).format('YYYY-MM-DD')}</Text>
        <Feather name="chevron-down" size={18} color={colors.black} />
      </Button>
      {showCalender && (
        <DateTimePicker value={new Date()} onChange={_onChange} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btnCalendar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.systemGray1,
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    borderRadius: scale(12),
    marginTop: scale(5),
  },
});

export default DatePicker;
