import {collectionRef} from 'src/services/firebase/db'

export const collectionName = 'steps';

export const collection = () => {
  return collectionRef(collectionName);
}

//export default collection
