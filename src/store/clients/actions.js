import { collectionName, collection } from './collection';
import {docRef, generateQuery, formatPayloadToGet, getDocsByCollection} from 'src/services/firebase/db'
import { firestoreAction } from 'vuexfire'

import Client from 'src/models/Client'

/**
 * Obtenha os itens da collection clients
 * Utiliza "commit('setClients', queryResult)" para setar o valor {state.clients}
 */
/*
export const getClients = ({ commit }) => {
  commit('setLoadingClients', true);

  return getDocsByCollection(collectionName)
    .then(queryResult =>
      queryResult.map((doc) => new Client(doc))
    )
    .then((queryResult) => {
      commit('setClients', queryResult);
      return queryResult
    })
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    })
    .finally(() => {
      commit('setLoadingClients', false);
    });
}
*/

/**
 * Obtenha os itens da collection clients
 * Utiliza binding {state.clients}
 *
 * @see: https://vuefire.vuejs.org/api/vuexfire.html#firestoreaction
 */
export const getClients = firestoreAction((
  { commit, bindFirestoreRef, unbindFirestoreRef},
  payload
) => {
  commit('setLoadingClients', true);

  const newPayload = formatPayloadToGet('clients', payload);
  let query = generateQuery(collectionName, newPayload);

  return bindFirestoreRef(newPayload.stateProp, query)
    .then(queryResult =>
      queryResult.map((doc) => new Client(doc))
    )
    .then((queryResult) => {
      return queryResult
    })
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    })
    .finally(() => {
      commit('setLoadingClients', false);

      if (newPayload.hasUnbind)
        unbindFirestoreRef(newPayload.stateProp)
    });
})

export const createClient = ({ commit, state, rootState }, client ) => {
  commit('setSavingClient', true);

  const configuredClientData = {
    ...client,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    groupId: rootState.groups.currentGroup.id,
  };

  return collection()
    .add(configuredClientData)
    .then((document) => {
      commit('addClient', { id: document.id, ...configuredClientData });
      commit('setSavingClient', false);
    });
};

export const updateClient = async function ({ commit }, payload) {
  commit('setSavingClient', true);

  const dataUpdated = {
    ...payload,
    updatedAt: Date.now(),
  };

  return docRef(collectionName, payload.id)
    .update(dataUpdated, {
      merge: true,
    })
    .then(() => {
      commit('setClient', dataUpdated);
      commit('setSavingClient', false);
    });
}

export const deleteClient = ({ commit }, clientId) => {
  commit('setDeletingClient', true);

  return collection()
    .doc(clientId)
    .delete()
    .then(() => {
      commit('setDeletingClient', false);
      commit('deleteClient', clientId);
    });
};
