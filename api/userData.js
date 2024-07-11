import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${userId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export default getSingleUser;
