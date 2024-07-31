import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getLikes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/likes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const createPostLike = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const deletePostLike = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
export { getLikes, deletePostLike, createPostLike };
