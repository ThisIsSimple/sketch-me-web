import { makeAutoObservable } from "mobx";

class AppStore {
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const appStore = new AppStore();
