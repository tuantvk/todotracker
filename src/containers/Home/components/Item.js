import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button } from '../../../components';
import { colors, fontSize } from '../../../constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { scale, wScale } from '../../../utils/resolutions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Markdown from 'react-native-markdown-display';

const getBackground = day => {
  if (day <= 1) {
    return colors.red;
  }
  if (day === 2) {
    return colors.yellow;
  }
  return colors.white;
};

const Item = ({ item, changeStatus, isAuth, deleteTask, updateTask }) => {
  const taskName = item.task_name;
  const [isEdit, _setEdit] = useState(false);
  const [text, onChangeText] = useState(taskName);

  const handleEditBtn = () => {
    _setEdit(prev => !prev);
  };

  const handleCancelBtn = () => {
    onChangeText(taskName);
    _setEdit(prev => !prev);
  };

  const handleSaveBtn = () => {
    updateTask(item.id, text);
    _setEdit(prev => !prev);
  };

  const dateToDeadline =
    parseInt(moment(item.deadline).format('D'), 10) -
    parseInt(moment(new Date()).format('D'), 10);

  return (
    <View style={styles.container}>
      {isEdit ? (
        <View>
          <View style={styles.content}>
            <TextInput
              defaultValue={taskName}
              onChangeText={t => onChangeText(t)}
              value={text}
            />
            <View style={styles.editDeleteBtn}>
              <Button style={styles.editBtn} onPress={handleSaveBtn}>
                <Ionicons name="save-sharp" size={16} color={colors.black} />
              </Button>
              <Button style={styles.btnDelete} onPress={handleCancelBtn}>
                <Ionicons name="trash-sharp" size={18} color={colors.black} />
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.content}>
            <Button
              style={styles.btnCheckbox}
              onPress={() => changeStatus(item)}>
              {item.completed ? (
                <Fontisto
                  name="checkbox-active"
                  size={14}
                  color={colors.black}
                />
              ) : (
                <Fontisto
                  name="checkbox-passive"
                  size={14}
                  color={colors.black}
                />
              )}
              <Text style={styles.taskName}>
                <Markdown>{taskName}</Markdown>
              </Text>
            </Button>
            <View style={styles.editDeleteBtn}>
              {!item.completed && (
                <Button style={styles.editBtn} onPress={handleEditBtn}>
                  <Entypo name="edit" size={16} color={colors.black} />
                </Button>
              )}
              {isAuth && (
                <Button
                  style={styles.btnDelete}
                  onPress={() => deleteTask(item)}>
                  <Ionicons name="close" size={18} color={colors.black} />
                </Button>
              )}
            </View>
          </View>
          <View
            style={[
              { backgroundColor: getBackground(dateToDeadline) },
              styles.deadlineContainer,
            ]}>
            <Text
              style={[
                styles.deadline,
                { color: dateToDeadline <= 2 ? colors.white : colors.black },
              ]}>
              {moment(item.deadline).format('YYYY-MM-DD')}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(10),
    paddingHorizontal: scale(15),
    borderBottomWidth: wScale(1),
    borderBottomColor: colors.systemGray1,
    paddingVertical: scale(8),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskName: {
    marginLeft: scale(10),
  },
  deadlineContainer: {
    marginLeft: scale(25),
    alignSelf: 'flex-start',
    paddingTop: scale(2),
    paddingHorizontal: scale(10),
    borderRadius: 5,
  },
  deadline: {
    fontSize: fontSize.tiny,
  },
  editDeleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    paddingHorizontal: scale(5),
  },
  btnDelete: {
    paddingHorizontal: scale(5),
  },
});

export default Item;
