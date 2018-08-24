import { types as profileTypes, name } from '../../redux/profile';

const LS_KEY = name;

const isServer = typeof window === 'undefined';

export default store => () => {
  if (!isServer) {
    const ls = window.localStorage;
    const state = store.getState();
    const { lastAction } = state.config;
    const {
      FETCH_PROFILE_SUCCESS,
      LOGIN_SUCCESS,
      LOGOUT_SUCCESS,
      REFRESH_ACCESS_TOKEN_SUCCESS,
    } = profileTypes;
    const isProfileDirty = lastAction === FETCH_PROFILE_SUCCESS
      || lastAction === LOGIN_SUCCESS
      || lastAction === LOGOUT_SUCCESS
      || lastAction === REFRESH_ACCESS_TOKEN_SUCCESS;

    if (isProfileDirty) {
      ls.setItem(LS_KEY, JSON.stringify(state.profile));
    }
  }
};

export const getPersistedProfileState = () => {
  let profileState;
  try {
    profileState = JSON.parse(localStorage.getItem(LS_KEY));
  } catch (e) {
    profileState = null;
  }

  return profileState;
};
