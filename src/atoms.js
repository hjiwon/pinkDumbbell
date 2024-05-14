import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: localStorage.getItem('loggedIn'),
});

export const registeredTodayState = atom({
  key: 'registeredTodayState',
  default: false,
});