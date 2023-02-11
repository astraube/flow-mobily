import {isInitialized} from './base'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import {collectionName} from "src/store/clients/collection";

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

/**
 * Firestore
 * https: //firebase.google.com/docs/reference/js/firebase.firestore.Firestore.html
 *
 * @return {firebase.firestore.Firestore} returns Firestore
 */
export const firestore = () => {
  return isInitialized() ? firebase.firestore() : null
}

export const storage = () => {
  return firebase.storage()
}

/**
 * @param  {String} storageLocation - Location on Firebase Storage
 */
export const storageRef = (storageLocation) => {
  return storage().ref(storageLocation)
}

/**
 * @param  {String} collectionName - Firestore collection name
 *
 * @return {CollectionReference} returns CollectionReference<DocumentData>
 */
export const collectionRef = (collectionName) => {
  return isInitialized() ? firestore().collection(collectionName) : null
}

/**
 * @param  {String} collectionName - Firestore collection name
 * @param  {String} id - Uid to assign to a doc in firestore collection
 *
 * @return {Document} returns Firebase Document
 */
export const docRef = (collectionName, id) => {
  return isInitialized() ? firestore().collection(collectionName).doc(id) : null
}

/**
 * Executa query do tipo get sem ordenação
 * @param query
 * @returns {Promise<*>}
 */
export async function runQueryGetDocs(query) {
  return query.get()
    .then(querySnapshot => querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
    )
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    });
}

/**
 * Recupera os documentos de uma collection
 * @param  {String} collectionName - Firestore collection name
 *
 * @return {Document} returns Firebase Document List
 */
export async function getDocsByCollection(collectionName) {
  return runQueryGetDocs(collectionRef(collectionName))
}

export const formatPayloadToGet = (stateProp, payload) => {
  return Object.assign({
    stateProp: stateProp,
    hasUnbind: false,
    docId: null,
    where: [
      {
        fieldPath: null,
        opStr: '==',
        value: null
      }
    ]
  }, payload);
}

export const generateQuery = (collectionName, payload) => {
  let query;
  if (payload.docId != null && payload.docId.length > 0)
    query = docRef(collectionName, payload.docId);
  else
    query = collectionRef(collectionName);

  if (payload.where != null && payload.where.length > 0)
    query = generateWhere(query, payload);

  return query;
}

/**
 * Cria as clausulas where, com base na seguinte estrutur:
 *
 * @param payload =>
 where: [
    {
      fieldPath: null,
      opStr: '==',
      value: null
    }
 ]
 * @returns {number}
 */
export const generateWhere = (query, payload) => {
  const node = (payload.where != null && payload.where.length > 0) ? payload.where : payload
  let newQuery = query;

  node.forEach((where) => {
    if (
      where.fieldPath != null && where.fieldPath.length > 0 &&
      where.opStr != null && where.opStr.length > 0 &&
      where.value != null && where.value.length > 0)
    {
      newQuery = newQuery.where(where.fieldPath, where.opStr, where.value);
    }
  })
  return newQuery;
}

// TODO - verificar necessidarde desse metodo. se nao for mais utilizado, remover...
export const sortByOrder = (first, second) => {
  if (first.order < second.order) return -1;
  if (first.order > second.order) return 1;
  return 0;
}


/**
 * Recupera os documentos de uma collection ordenados pelo parametro 'order'
 * @param  {String} collectionName - Firestore collection name
 *
 * @return {Document} returns Firebase Document List
 */
export async function getDocsByCollectionSortByOrder(collectionName) {
  return collectionRef(collectionName).get()
    .then(querySnapshot => querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort(sortByOrder)
    )
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    });
}

/**
 * Executa query do tipo get com ordenação pelo parametro 'order'
 * @param query
 * @returns {Promise<*>}
 */
export async function runQueryGetDocsSortByOrder(query) {
  return query.get()
    .then(querySnapshot => querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort(sortByOrder)
    )
    .catch(err => {
      console.log('Error getting document', err);
      return [];
    });
}

