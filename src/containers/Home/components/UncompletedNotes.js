import React from 'react';
import { FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { useStore } from '../../../context';
import Sound from 'react-native-sound';
import Item from './Item';

const sound = new Sound('correct_soundeffect.mp3', Sound.MAIN_BUNDLE);

const AllNotes = () => {
  const {
    todosStore: {
      getTodosUncompleted,
      updateTodoCompleted,
      removeTask,
      updateTask,
    },
    authStore: { isAuth },
  } = useStore();

  const changeStatus = item => {
    updateTodoCompleted(item);
    if (!item.completed) {
      sound.play();
    }
  };

  const deleteTask = item => {
    removeTask(item);
  };

  const _keyExtractor = (item, index) => `${item.id}${index}`;

  const _renderItem = ({ item }) => {
    return <Item {...{ item, changeStatus, isAuth, deleteTask, updateTask }} />;
  };

  return (
    <FlatList
      data={getTodosUncompleted}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
    />
  );
};

export default observer(AllNotes);
