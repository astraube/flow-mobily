import {collectionRef} from 'src/services/firebase/db'

export const collectionName = 'clients';

export const collection = () => {
  return collectionRef(collectionName);
}

export default collection
