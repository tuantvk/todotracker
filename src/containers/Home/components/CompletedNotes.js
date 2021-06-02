import React from 'react';
import { FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { useStore } from '../../../context';
import Item from './Item';

const AllNotes = () => {
  const {
    todosStore: { getTodosCompleted, updateTodoCompleted, removeTask },
    authStore: { isAuth },
  } = useStore();

  const changeStatus = item => {
    updateTodoCompleted(item);
  };

  const deleteTask = item => {
    removeTask(item);
  };

  const _keyExtractor = (item, index) => `${item.id}${index}`;

  const _renderItem = ({ item }) => {
    return <Item {...{ item, changeStatus, isAuth, deleteTask }} />;
  };

  return (
    <FlatList
      data={getTodosCompleted}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
    />
  );
};

export default observer(AllNotes);
