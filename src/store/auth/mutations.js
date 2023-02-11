/* eslint-disable no-console */

export function setAuthState (state, data) {
  state.isAuthenticated = data.isAuthenticated
  state.isReady = data.isReady
  state.refreshToken = data.refreshToken
  state.uid = data.uid
}

export const setRefreshToken = (state, refreshToken) => {
  state.refreshToken = refreshToken;
};

export const setLoggingIn = (state, isLoggingIn) => {
  state.isLoggingIn = isLoggingIn;
};
