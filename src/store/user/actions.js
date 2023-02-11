import { collectionName, collection } from './collection';
import { firestoreAction } from 'vuexfire'
import {Timestamp, docRef, getDocsByCollection, collectionRef} from 'src/services/firebase/db'

import User from "src/models/User";


/**
 * Obtenha TODOS os itens da collection users
 * Utiliza "commit('setUsers', queryResult)" para setar o valor {state.users}
 */
export const getAllUsers = ({ commit }) => {
  commit('setLoadingUsers', true);

  return getDocsByCollection(collectionName)
    .then(queryResult =>
      queryResult.map((doc) => new User(doc))
    )
    .then((queryResult) => {
      commit('setUsers', queryResult);
      commit('setLoadingUsers', false);
      return queryResult
    })
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    });
}

/**
 * Obtenha TODOS os itens da collection users
 * Utiliza binding {state.users}
 *
 * @see: https://vuefire.vuejs.org/api/vuexfire.html#firestoreaction
 */
export const getAllUsersBinding = firestoreAction(({ commit, bindFirestoreRef }) => {
  commit('setLoadingUsers', true);

  return bindFirestoreRef('users', collectionRef(collectionName))
    .then(queryResult =>
      queryResult.map((doc) => new User(doc))
    )
    .then((queryResult) => {
      return queryResult
    })
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    })
    .finally(() => {
      commit('setLoadingUsers', false);
    });
})

/** Get current user from the firestore collection user's
 * via firebase uid
 *
 * @param  {Ojbect} payload.id - Firebase currentUser id
 */
export const getCurrentUser = firestoreAction(({ bindFirestoreRef }, id) => {
  return bindFirestoreRef('currentUser', docRef(collectionName, id))
})

/**
 * @param  {Object} {state}
 * @param  {String} id
 * @param  {Object} payload
 */
export const updateUserData = async function ({ state }, payload) {
  return docRef(collectionName, payload.id).update(payload)
}

export function routeToMeProfile () {
  this.$router.push({
    path: '/me'
  })
}
export function routeToUserProfile (userId) {
  this.$router.push({
    path: `/user/${userId}`
  })
}
