import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { scale } from '../../../utils/resolutions';

const TimePicker = ({ name, values, setFieldValue }) => {
  const [showClock, _setShowClock] = useState(false);

  const _onChange = (event, date) => {
    handleClock();
    if (date) {
      setFieldValue(name, date);
    }
  };

  const handleClock = () => {
    _setShowClock(prev => !prev);
  };

  return (
    <>
      <Button style={styles.btn} onPress={handleClock}>
        <Text style={styles.time}>{moment(values[name]).format('LT')}</Text>
        <AntDesign name="clockcircleo" size={15} color={colors.black} />
      </Button>
      {showClock && (
        <DateTimePicker value={new Date()} mode="time" onChange={_onChange} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.systemGray1,
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    borderRadius: scale(10),
    marginTop: scale(5),
  },
  time: {
    marginRight: scale(50),
  },
});

export default TimePicker;
