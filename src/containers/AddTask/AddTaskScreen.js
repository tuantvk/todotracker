import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input } from '../../components';
import { Layout } from '../../views';
import I18n from '../../locales';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSize } from '../../constants';
import { scale } from '../../utils/resolutions';
import getTomorrow from '../../utils/getTomorrow';
import { DatePicker, TimePicker, SelectModal } from './components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { REMIND_OPTIONS_DATA, REPEAT_OPTIONS_DATA } from './data';
import { observer } from 'mobx-react';
import { useStore } from '../../context';

const schema = yup.object().shape({
  task_name: yup.string().trim().required("It's required"),
});

const initialValues = {
  task_name: '',
  deadline: getTomorrow(),
  start_time: new Date(),
  end_time: new Date(),
  remind: REMIND_OPTIONS_DATA[0].id,
  repeat: REPEAT_OPTIONS_DATA[0].id,
};

const AddTaskScreen = ({ navigation }) => {
  const {
    todosStore: { addTodo },
    localeStore: { locale },
  } = useStore();

  const goBack = () => {
    navigation.goBack();
  };

  const onSubmit = values => {
    // Gọi hàm `addTodo` trong store của Todos chuyền vào giá trị của form
    addTodo({
      ...values,
      completed: false,
    });
    goBack();
  };

  return (
    <Layout>
      <View style={styles.headerContainer}>
        <Button onPress={goBack}>
          <MCIcons name="chevron-left" size={30} color={colors.black} />
        </Button>
        <Text bold style={styles.header}>
          {I18n.t('add_task_header', { locale })}
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View style={styles.inputContainer}>
              <Text bold>{I18n.t('title_header', { locale })}</Text>
              <Input
                name="task_name"
                placeholder="Enter here"
                style={styles.textInput}
                {...{ values, errors, touched, handleChange, handleBlur }}
              />
            </View>
            <View style={styles.deadlineContainer}>
              <Text bold>{I18n.t('deadline', { locale })}</Text>
              <DatePicker name="deadline" {...{ values, setFieldValue }} />
            </View>
            <View style={styles.timeContainer}>
              <View style={styles.startTime}>
                <Text bold>{I18n.t('start_time', { locale })}</Text>
                <TimePicker name="start_time" {...{ values, setFieldValue }} />
              </View>
              <View style={styles.endTime}>
                <Text bold>{I18n.t('end_time', { locale })}</Text>
                <TimePicker name="end_time" {...{ values, setFieldValue }} />
              </View>
            </View>
            <View style={styles.remindContainer}>
              <Text bold>{I18n.t('remind', { locale })}</Text>
              <SelectModal
                data={REMIND_OPTIONS_DATA}
                name="remind"
                {...{ values, setFieldValue }}
              />
            </View>
            <View style={styles.repeatContainer}>
              <Text bold>{I18n.t('repeat', { locale })}</Text>
              <SelectModal
                data={REPEAT_OPTIONS_DATA}
                name="repeat"
                {...{ values, setFieldValue }}
              />
            </View>
            <View style={styles.footer}>
              <Button style={styles.createTaskBtn} onPress={handleSubmit}>
                <Text style={styles.txtCreateTaskBtn}>
                  {I18n.t('button_create_task', { locale })}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    marginTop: scale(8),
    paddingBottom: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: colors.systemGray2,
  },
  header: {
    color: colors.black,
    fontSize: fontSize.larger,
    marginLeft: scale(12),
  },
  inputContainer: {
    marginTop: scale(20),
    marginBottom: scale(20),
    paddingHorizontal: scale(15),
  },
  textInput: {
    backgroundColor: colors.systemGray1,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    marginTop: scale(5),
  },
  deadlineContainer: {
    paddingHorizontal: scale(15),
    marginBottom: scale(20),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginBottom: scale(20),
  },
  remindContainer: {
    paddingHorizontal: scale(15),
    marginBottom: scale(20),
  },
  repeatContainer: {
    paddingHorizontal: scale(15),
  },
  footer: {
    paddingHorizontal: scale(15),
    marginTop: scale(40),
  },
  createTaskBtn: {
    backgroundColor: colors.blue,
    paddingVertical: scale(10),
    borderRadius: scale(10),
  },
  txtCreateTaskBtn: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default observer(AddTaskScreen);
