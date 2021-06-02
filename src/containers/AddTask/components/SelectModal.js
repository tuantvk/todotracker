import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '../../../components';
import Modal from 'react-native-modal';
import { colors, fontSize } from '../../../constants';
import I18n from '../../../locales';
import { scale } from '../../../utils/resolutions';
import Feather from 'react-native-vector-icons/Feather';
import { useStore } from '../../../context';
import { observer } from 'mobx-react';

const SelectModal = ({ data, name, values, setFieldValue }) => {
  const [showModal, _setShowModal] = useState(false);
  const {
    localeStore: { locale },
  } = useStore();

  const handleModal = () => {
    _setShowModal(prev => !prev);
  };

  const _onChangeValue = id => {
    handleModal();
    setFieldValue(name, id);
  };

  const selected = data.find(d => d.id === values[name]);

  return (
    <>
      <Button style={styles.btnShowModal} onPress={handleModal}>
        <Text>{selected?.value}</Text>
        <Feather name="chevron-down" size={20} color={colors.black} />
      </Button>
      <Modal
        isVisible={showModal}
        onBackButtonPress={handleModal}
        onBackdropPress={handleModal}
        useNativeDriver>
        <View style={styles.modalContainer}>
          <Text bold style={styles.modalHeader}>
            {I18n.t('select_category', { locale })}
          </Text>
          <View>
            {data.map(item => (
              <Button
                key={item.id}
                onPress={() => _onChangeValue(item.id)}
                style={styles.selectItem}>
                <Text>{item.value}</Text>
              </Button>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  btnShowModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.systemGray1,
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    borderRadius: scale(12),
    marginTop: scale(5),
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: scale(15),
    paddingHorizontal: scale(20),
  },
  modalHeader: {
    fontSize: fontSize.large,
  },
  selectItem: {
    marginTop: scale(8),
  },
});

export default observer(SelectModal);
