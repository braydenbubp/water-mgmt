import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categorys`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export default getCategories;
