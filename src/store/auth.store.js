import { action, makeAutoObservable } from 'mobx';

class AuthStore {
  isAuth = false;

  constructor() {
    makeAutoObservable(this, {
      updateAuth: action.bound,
    });
  }

  updateAuth(value) {
    this.isAuth = value;
  }
}

export default new AuthStore();
