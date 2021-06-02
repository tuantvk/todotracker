import { action, makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocaleStore {
  locale = 'en';

  constructor() {
    makeAutoObservable(this, {
      switchLocale: action.bound,
      updateLocale: action.bound,
    });
  }

  switchLocale() {
    let newLocale = this.locale === 'vi' ? 'en' : 'vi';
    this.locale = newLocale;
    AsyncStorage.setItem('@locale', newLocale);
  }

  updateLocale(locale) {
    this.locale = locale;
  }

  get isEnglish() {
    return this.locale === 'en';
  }
}

export default new LocaleStore();
