import { collectionName } from './collection';
import { collectionRef } from 'src/services/firebase/db'
import { createUserWithEmail, loginWithEmail } from 'src/services/firebase/email'

import Firebase from 'firebase/app';
import 'firebase/auth';

import { firestoreAction } from 'vuexfire'
import User from '../../models/User.js'

export const addUserToUsersCollection = async function (state, docRef) {
  const
    { email } = state,
    user = new User({ email })
  return docRef.set(user)
}

export const createNewUser = async function ($root, data) {
  const $fb = this.$fb
  const { email, password } = data
  const fbAuthResponse = await $fb.createUserWithEmail(email, password)
  const id = fbAuthResponse.user.uid
  const docRef = $fb.docRef(collectionName, id)
  return addUserToUsersCollection({ email }, docRef)
}

export const loginUser = async function ($root, payload) {
  const $fb = this.$fb
  const { email, password } = payload
  return $fb.loginWithEmail(email, password)
}

export const logoutUser = async function ({ state }) {
  await firestoreAction(({ unbindFirestoreRef }) => { unbindFirestoreRef('currentUser') })
  this.$fb.logoutUser()
}

export function routeUserToAuth () {
  this.$router.replace({
    //path: '/auth/login'
    path: '/login'
  })
}

export const loginWithEmailAndPassword = async ({ commit }, credentials) => {
  commit('setLoggingIn', true);

  return loginWithEmail(credentials.email, credentials.password)
    .then((user) => {

      store.commit('auth/setAuthState', {
        isAuthenticated: user !== null,
        isReady: true,
        refreshToken: (user ? user.user.refreshToken : ''),
        uid: (user ? user.user.uid : '')
      })
      commit('setLoggingIn', false);

      return user;
    }).catch((error) => {
      commit('setLoggingIn', false);
      throw error;
    });
};

export const signUpWithEmailAndPassword = async ({ commit }, credentials) => {
  commit('setLoggingIn', true);

  return createUserWithEmail(credentials.email, credentials.password)
    .then((user) => {

      store.commit('auth/setAuthState', {
        isAuthenticated: user !== null,
        isReady: true,
        refreshToken: (user ? user.user.refreshToken : ''),
        uid: (user ? user.user.uid : '')
      })
      commit('setLoggingIn', false);

      return user;
    }).catch((error) => {
      commit('setLoggingIn', false);
      throw error;
    });
};

export const signOut = async ({ commit }) => {
  await auth().signOut()
    .then(() => {
      store.commit('auth/setAuthState', {
        isAuthenticated: false,
        isReady: false,
        refreshToken: null,
        uid: ''
      })
      commit('setLoggingIn', false);
    });
};
