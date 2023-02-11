import { collectionName, collection } from './collection';
import {Timestamp, docRef, getDocsByCollection, formatPayloadToGet, generateQuery} from 'src/services/firebase/db'
import {firestoreAction} from "vuexfire";

import Project from 'src/models/Project'


/**
 * Obtenha os itens da collection projects
 * Utiliza binding {state.projects}
 *
 * @see: https://vuefire.vuejs.org/api/vuexfire.html#firestoreaction
 */
export const getProjects = firestoreAction((
  { commit, bindFirestoreRef, unbindFirestoreRef},
  payload
) => {
  commit('setLoadingProjects', true);

  const newPayload = formatPayloadToGet('projects', payload);
  let query = generateQuery(collectionName, newPayload);

  return bindFirestoreRef(newPayload.stateProp, query)
    .then(queryResult =>
      queryResult.map((doc) => new Project(doc))
    )
    .then((queryResult) => {
      return queryResult
    })
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    })
    .finally(() => {
      commit('setLoadingProjects', false);

      if (newPayload.hasUnbind)
        unbindFirestoreRef(newPayload.stateProp)
    });
})
/*
export const getProjects = function() {
  return getDocsByCollection(collectionName)
    .then(queryResult =>
      queryResult.map((doc) => new Project(doc))
    )
}
*/

export const updateProject = ({ commit }, project) => {
  commit('setSavingProject', true);

  const newProjectData = {
    ...project,
    updatedAt: Date.now(),
  };

  return docRef(collectionName, newProjectData.id)
    .update(newProjectData, { merge: true })
    .then(() => {
      commit('setProject', newProjectData);
      commit('setSavingProject', false);
      return true;
    });
}

export const deleteProject = ({ commit }, projectId) => {
  commit('setDeletingProject', true);

  return collection()
    .doc(projectId)
    .delete()
    .then(() => {
      commit('setDeletingProject', false);
      commit('deleteProject', projectId);
    });
};

