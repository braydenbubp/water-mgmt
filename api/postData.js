import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL POSTS
const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET ALL POSTS MADE BY A SINGLE USER
const getPostsForSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE POST
const getSinglePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${postId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// CREATE POST
const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts.json`, {
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

// UPDATE POST
const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${payload.id}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE POST
const deletePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${postId}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPosts, getPostsForSingleUser, getSinglePost, createPost, updatePost, deletePost,
};
