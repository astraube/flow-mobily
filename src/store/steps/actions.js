import { runQueryGetDocs } from 'src/services/firebase/db'
import { collectionName, collection } from './collection';

function getByQuery(commit, query) {
  commit('setLoadingSteps', true);

  query = query.orderBy('order', 'asc');

  return runQueryGetDocs(query)
    .then((queryResult) => {
      commit('setSteps', queryResult);
      commit('setLoadingSteps', false);
    });
}

export const getSteps = ({ commit }) => getByQuery(commit, collection());

export const getStepsByGroupId = ({ commit }, { groupId }) => {
  const query = collection().where('groupId', '==', groupId);

  return getByQuery(commit, query);
};

export const createStep = ({ commit, state, rootState }, step ) => {
  commit('setSavingStep', true);

  const configuredStepData = {
    ...step,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    groupId: rootState.groups.currentGroup.id,
    order: state.steps.length,
    rules: [],
    //blocks: [],
  };

  return collection()
    .add(configuredStepData)
    .then((document) => {
      commit('addStep', { id: document.id, ...configuredStepData });
      commit('setSavingStep', false);
  });
};

export const updateStep = ({ commit }, step) => {
  commit('setSavingStep', true);

  const dataUpdated = {
    ...step,
    updatedAt: Date.now(),
  };

  return collection()
    .doc(dataUpdated.id)
    .update(dataUpdated, {
      merge: true,
    }).then(() => {
      commit('setStep', dataUpdated);
      commit('setSavingStep', false);
    });
};

export const deleteStep = ({ commit }, stepId) => {
  commit('setDeletingStep', true);

  return collection()
    .doc(stepId)
    .delete()
    .then(() => {
      commit('setDeletingStep', false);
      commit('deleteStep', stepId);
    });
};
