import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from '../../components';
import { Layout } from '../../views';
import { colors, fontSize } from '../../constants';
import I18n from '../../locales';
import { scale } from '../../utils/resolutions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import routes from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { observer } from 'mobx-react';
import { useStore } from '../../context';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
});

const LoginScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const {
    authStore: { updateAuth },
    localeStore: { locale, updateLocale },
  } = useStore();

  const gotoHome = () => {
    navigation.navigate(routes.HOME_SCREEN);
  };

  const fetchInit = async () => {
    // hàm fetchInit giúp nhớ đã đăng nhập (khi tắt app và vào lại thì ko cần đăng nhập nữa)
    let resUser = await AsyncStorage.getItem('@user');
    let localeLocal = await AsyncStorage.getItem('@locale');
    await new Promise(resolve => {
      updateLocale(localeLocal);
      resolve();
    });
    await new Promise(resolve => {
      setLoading(false);
      resolve();
    });
    if (resUser) {
      // kiểm tra có user thì cập nhật trạng thái user đã xác thực bằng true
      updateAuth(true);
      gotoHome();
    }
  };

  useEffect(() => {
    // mỗi khi mở app lên thì useEffect sẽ hoạt động và gọi đến hàm fetchInit 1 lần duy nhất
    fetchInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSigninWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
      // có thể biến một hàm bình thường thành promise bằng cách như bên dưới
      await new Promise(resolve => {
        // same in `fetchInit`;
        updateAuth(true);
        gotoHome();
        resolve();
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text bold style={styles.appName}>
          ToDoTracker
        </Text>
        <Text style={styles.intro}>
          {I18n.t('login_social_network_account', { locale })}
        </Text>
        <Button style={styles.btn} onPress={handleSigninWithGoogle}>
          <AntDesign name="googleplus" size={27} color={colors.red} />
          <Text style={styles.btnText}>
            {I18n.t('sign_in_with_google', { locale })}
          </Text>
        </Button>
        <Button onPress={gotoHome}>
          <Text style={styles.footerTxt}>
            {I18n.t('different_option', { locale })}
          </Text>
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(15),
    justifyContent: 'center',
  },
  appName: {
    marginBottom: scale(8),
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.biggest,
  },
  intro: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.normal,
    marginBottom: scale(30),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderRadius: scale(7),
    borderColor: colors.red,
    paddingVertical: scale(8),
    paddingHorizontal: scale(15),
    marginBottom: scale(45),
  },
  btnText: {
    marginLeft: scale(10),
    color: colors.red,
    fontSize: fontSize.normal,
  },
  footerTxt: {
    textAlign: 'center',
    fontSize: fontSize.small,
    color: colors.systemGray3,
  },
});

export default observer(LoginScreen);
