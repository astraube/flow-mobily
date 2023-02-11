import { collectionName, collection } from './collection';
import {formatPayloadToGet, generateQuery, runQueryGetDocs} from 'src/services/firebase/db'
import {firestoreAction} from "vuexfire";

import Group from "src/models/Group";


export const createGroup = ({ commit, state }, { groupData }) => {
  commit('setSavingGroup', true);

  const configuredGroupData = {
    ...groupData,
    createdAt: Date.now(),
    order: state.groups.length,
  };

  // TODO - transportar query para queryFirebase.js
  return collection().add(configuredGroupData).then((something) => {
    commit('addGroup', { id: something.id, ...configuredGroupData });
    commit('setSavingGroup', false);
    return true;
  });
};

/*
function getGroupsByQuery(commit, query) {
  commit('setLoadingGroups', true);

  query = query.orderBy('order', 'asc');

  return runQueryGetDocs(query)
    .then((queryResult) => {
      commit('setGroups', queryResult);
      commit('setCurrentGroup', queryResult[0]); // TODO - CurrentGroup deve ser dinamico
      commit('setLoadingGroups', false);
    });
}

export const getGroups = ({ commit }) => getGroupsByQuery(commit, collection() );
*/

/**
 * Obtenha os itens da collection groups
 * Utiliza binding {state.groups}
 *
 * @see: https://vuefire.vuejs.org/api/vuexfire.html#firestoreaction
 */
export const getGroups = firestoreAction((
  { commit, bindFirestoreRef, unbindFirestoreRef},
  payload
) => {
  commit('setLoadingGroups', true);

  const newPayload = formatPayloadToGet('groups', payload);
  let query = generateQuery(collectionName, newPayload);
  query = query.orderBy('order', 'asc');

  return bindFirestoreRef(newPayload.stateProp, query)
    .then(queryResult =>
      queryResult.map((doc) => new Group(doc))
    )
    .then((queryResult) => {
      commit('setCurrentGroup', queryResult[0]); // TODO - CurrentGroup deve ser dinamico

      return queryResult
    })
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    })
    .finally(() => {
      commit('setLoadingGroups', false);

      if (newPayload.hasUnbind)
        unbindFirestoreRef(newPayload.stateProp)
    });
})
