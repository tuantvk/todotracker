import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  BackHandler,
} from 'react-native';
import { Text, Button } from '../../components';
import { colors, fontSize } from '../../constants';
import { Layout } from '../../views';
import { scale, wScale } from '../../utils/resolutions';
import I18n from '../../locales';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { AllNotes, CompletedNotes, UncompletedNotes } from './components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react';
import { useStore } from '../../context';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const {
    todosStore: { fetchTodosLocal },
    authStore: { isAuth },
    localeStore: { locale },
  } = useStore();
  const [user, _setUser] = useState(null);

  const gotoAddTask = () => {
    navigation.navigate('ADD_TASK_SCREEN');
  };

  const gotoSetting = () => {
    navigation.navigate('SETTING_SCREEN');
  };

  const backToLogin = () => {
    navigation.navigate('LOGIN_SCREEN');
  };

  const fetchInit = async () => {
    let resUser = await AsyncStorage.getItem('@user');
    if (resUser) {
      _setUser(JSON.parse(resUser));
    }
  };

  useEffect(() => {
    fetchInit();
    fetchTodosLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sử dụng useForcusEffect để xử lý chuyện back lại trang trước đó chỉ ở tròn trang Home
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [tabs] = useState([
    { key: 'all_notes', title: 'all_notes' },
    { key: 'completed_notes', title: 'completed_notes' },
    { key: 'uncompleted_notes', title: 'uncompleted_notes' },
  ]);

  const renderScene = SceneMap({
    all_notes: AllNotes,
    completed_notes: CompletedNotes,
    uncompleted_notes: UncompletedNotes,
  });

  return (
    <Layout>
      <View style={styles.headerContainer}>
        <Text bold style={styles.headerTitle}>
          {I18n.t('board', { locale })}
        </Text>
        {isAuth ? (
          <Button style={styles.cardAvatar} onPress={gotoSetting}>
            {user?.user && (
              <Image source={{ uri: user.user.photo }} style={styles.avatar} />
            )}
          </Button>
        ) : (
          <Button style={styles.cardAvatar} onPress={backToLogin}>
            {user?.user && (
              <Image source={{ uri: user.user.photo }} style={styles.avatar} />
            )}
          </Button>
        )}
      </View>
      <TabView
        navigationState={{ index, routes: tabs }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicatorStyle}
            style={styles.tabBar}
            renderLabel={({ route }) => (
              <Text style={styles.tabBarTitle}>
                {I18n.t(route.title, { locale })}
              </Text>
            )}
          />
        )}
      />
      <View style={styles.footer}>
        <Button style={styles.btnFooter} onPress={gotoAddTask}>
          <Text style={styles.btnText}>
            {I18n.t('button_add_task', { locale })}
          </Text>
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(8),
    paddingBottom: scale(5),
    paddingHorizontal: scale(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.systemGray2,
  },
  headerTitle: {
    color: colors.black,
    fontSize: fontSize.larger,
  },
  cardAvatar: {
    backgroundColor: colors.systemGray2,
    width: wScale(25),
    height: wScale(25),
    borderRadius: scale(25),
  },
  avatar: {
    width: wScale(25),
    height: wScale(25),
    borderRadius: scale(25),
  },
  tabBar: {
    backgroundColor: colors.white,
  },
  indicatorStyle: {
    backgroundColor: colors.blue,
  },
  tabBarTitle: {
    color: colors.black,
    fontSize: fontSize.small,
  },
  footer: {
    paddingHorizontal: scale(15),
    marginBottom: scale(30),
  },
  btnFooter: {
    backgroundColor: colors.blue,
    paddingVertical: scale(10),
    borderRadius: scale(10),
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
  },
});

export default observer(HomeScreen);
