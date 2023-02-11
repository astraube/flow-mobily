import { collectionName, collection } from './collection';
import * as collectionSteps from '../steps/collection';
import {
  docRef,
  storageRef,
  runQueryGetDocs,
  generateQuery, formatPayloadToGet
} from 'src/services/firebase/db'
import { customAlphabet } from 'nanoid';
import {firestoreAction} from "vuexfire";

import Block from "src/models/Block";


function getByQuery(commit, payload) {
  commit('setLoadingBlocks', true);

  const newPayload = formatPayloadToGet('blocks', payload);
  let query = generateQuery(collectionName, newPayload);

  //query = query.orderBy('order', 'asc');

  return runQueryGetDocs(query)
    .then(queryResult =>
      queryResult.map((doc) => new Block(doc))
    )
    .then((queryResult) => {
      commit('setBlocks', queryResult);
      commit('setLoadingBlocks', false);
      return queryResult
    })
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    });
}

export const getBlocks = ({ commit }, payload) => getByQuery(commit, payload);


/**
 * Obtenha os itens da collection blocks
 * Utiliza binding {state.blocks}
 *
 * @see: https://vuefire.vuejs.org/api/vuexfire.html#firestoreaction
 */
export const getBlocksBinding = firestoreAction((
  { commit, bindFirestoreRef, unbindFirestoreRef},
  payload
) => {
  commit('setLoadingBlocks', true);

  const newPayload = formatPayloadToGet('blocks', payload);
  let query = generateQuery(collectionName, newPayload);

  return bindFirestoreRef(newPayload.stateProp, query)
    .then(queryResult =>
      queryResult.map((doc) => new Block(doc))
    )
    .then((queryResult) => {
      return queryResult
    })
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    })
    .finally(() => {
      commit('setLoadingBlocks', false);

      if (newPayload.hasUnbind)
        unbindFirestoreRef(newPayload.stateProp)
    });
})

export const updateBlock = ({ commit }, block) => {
  const newBlockData = {
    ...block,
    updatedAt: Date.now(),
  };

  return docRef(collectionName, newBlockData.id)
    .update(newBlockData, {
      merge: true,
    }).then(() => {
      commit('setBlock', newBlockData);
      return true;
    });
};

export const moveBlock = ({ commit, rootState }, { blockId, amount, currentStep }) => {
  const currentStepIndex = rootState.steps.steps.findIndex(
    ({ id }) => id === currentStep,
  );

  //const newDataForCurrentStep = rootState.steps.steps[currentStepIndex].blocks
    //.filter((id) => id !== blockId);

  //docRef(collectionSteps.collectionName, currentStep)
    //.update( {blocks: newDataForCurrentStep}, { merge: true });

  const relativeStep = rootState.steps.steps[currentStepIndex + amount];
  //const newDataForRelativeStep = [...relativeStep.blocks, blockId];

  //docRef(collectionSteps.collectionName, relativeStep.id)
    //.update({ blocks: newDataForRelativeStep}, { merge: true });


  const blocksByStep = rootState.blocks.blocks.filter((block) => block.stepId === relativeStep.id);

  const newDataForCurrentBlock = {
    //order: relativeStep.blocks.length,
    order: blocksByStep.length,
    stepId: relativeStep.id,
    stepOrder: relativeStep.order,
    dueDays: relativeStep.dueDays,
    updatedAt: Date.now(),
    stepAt: Date.now(),
  };

  docRef(collectionName, blockId)
    .update(newDataForCurrentBlock, {
      merge: true,
    });

  //commit('steps/setStep', { id: currentStep, blocks: newDataForCurrentStep }, { root: true });
  //commit('steps/setStep', { id: relativeStep.id, blocks: newDataForRelativeStep }, { root: true });
  commit('setBlock', { id: blockId, ...newDataForCurrentBlock });
};

export const commentOnABlock = ({ commit, state, rootState }, { blockId, comment }) => {
  const { uid, displayName } = rootState.user.currentUser;

  const blockData = state.blocks.find(({ id }) => id === blockId);
  const commentData = {
    createdAt: Date.now(),
    content: comment,
    commenter: {
      uid,
      name: displayName,
    },
  };
  const blockComments = blockData.comments || [];
  const dataToAdd = { comments: [...blockComments, commentData] };

  docRef(collectionName, blockId)
    .update(dataToAdd, {merge: true})
    .then(() => {
      commit('setBlock', { id: blockId, ...dataToAdd });
    });
};

export const createBlock = ({ commit, rootState }, {
  stepId,
  block,
}) => {

  commit('setSavingBlock', true);

 // const currentStepData = rootState.steps.steps.find((step) => step.id === stepId);
  const blocksByStep = rootState.blocks.blocks.filter((block) => block.stepId === stepId);

  const configuredBlockData = {
    ...block,
    stepId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    stepAt: Date.now(),
    order: blocksByStep.length,
    //order: currentStepData.blocks.length,
  };

  return collection()
    .add(configuredBlockData)
    .then((document) => {

      const newBlocks = [...blocksByStep.blocks, document.id];

      //const newBlocks = [...currentStepData.blocks, document.id];
      //docRef(collectionSteps.collectionName, stepId)
        //.update({ blocks: newBlocks }, { merge: true });

      commit('addBlock', { id: document.id, ...configuredBlockData });
      commit('setSavingBlock', false);
      commit('setLoadingBlocks', false);

      return {
        id: stepId,
        blocks: newBlocks,
      };
  });
};

export const uploadFile = async (_, { MIMEType, name, data }) => {
  const customId = customAlphabet('1234567890abcdef', 10);
  const randomName = customId();

  const currentFileReference = storageRef('')
    .child(`${randomName}.${MIMEType}`);

  return currentFileReference
    .putString(data, 'data_url', { name })
    .then(() => currentFileReference.getDownloadURL());
};
