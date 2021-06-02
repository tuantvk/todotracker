import React from 'react';
import { View, StyleSheet, Switch, Dimensions } from 'react-native';
import { Text, Button } from '../../components';
import I18n from '../../locales';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Layout } from '../../views';
import { scale } from '../../utils/resolutions';
import { colors, fontSize } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import Share from 'react-native-share';
import { observer } from 'mobx-react';
import { useStore } from '../../context';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const SettingScreen = ({ navigation }) => {
  const {
    todosStore: { getTodosCompleted, getStatistics },
    localeStore: { locale, isEnglish, switchLocale },
  } = useStore();

  const goBack = () => {
    navigation.goBack();
  };

  const handleShare = () => {
    // tasks = ['task_name'];
    let tasks = getTodosCompleted.map(t => t.task_name);
    // console.log(tasks.join('\n'))
    // - Task 1
    // - Task 2

    const shareOptions = {
      // string = task_1task_2
      message: tasks.join('\n'),
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <Layout>
      <View style={styles.headerContainer}>
        <Button onPress={goBack}>
          <MCIcons name="chevron-left" size={30} color={colors.black} />
        </Button>
        <Text bold style={styles.header}>
          {I18n.t('setting', { locale })}
        </Text>
      </View>
      <View style={styles.appName}>
        <Text bold style={styles.title}>
          {I18n.t('app_name', { locale })}:
        </Text>
        <Text>{DeviceInfo.getApplicationName()}</Text>
      </View>
      <View style={styles.appVersion}>
        <Text bold style={styles.title}>
          {I18n.t('app_version', { locale })}:
        </Text>
        <Text>{DeviceInfo.getVersion()}</Text>
      </View>
      <View style={styles.switchLanguage}>
        <Text bold style={styles.title}>
          {I18n.t('switch_language', { locale })}:
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnglish ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          value={isEnglish}
          onValueChange={switchLocale}
        />
      </View>
      <Button style={styles.btnShare} onPress={handleShare}>
        <Text bold style={styles.title}>
          {I18n.t('share_completed_task', { locale })}
        </Text>
      </Button>
      <PieChart
        data={getStatistics}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={styles.pieChart}
        accessor={'population'}
        backgroundColor={'transparent'}
      />
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
  appName: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    marginTop: scale(20),
  },
  title: {
    marginRight: scale(20),
    fontSize: fontSize.normal,
  },
  appVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    marginTop: scale(10),
  },
  switchLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginTop: scale(10),
  },
  btnShare: {
    paddingHorizontal: scale(15),
    marginTop: scale(10),
  },
  pieChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default observer(SettingScreen);
