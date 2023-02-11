import {collectionRef} from 'src/services/firebase/db'

export const collectionName = 'projects';

export const collection = () => {
  return collectionRef(collectionName);
}

export default collection
