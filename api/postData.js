import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL POSTS
const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts`, {
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
const getPostsForSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts?user.id=${id}`, {
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
// const getPostsForSingleUser = (id) => new Promise((resolve, reject) => {
//   getPosts().then((posts) => {
//     const filteredPosts = posts.filter((post) => post.user_id === id);
//     resolve(filteredPosts);
//   })
//     .catch(reject);
// });

// GET A SINGLE POST
const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE POST
const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts`, {
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
  fetch(`${endpoint}/posts/${payload.id}`, {
    method: 'PUT',
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
const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// SEARCH POSTS
const searchPosts = (searchValue) => new Promise((resolve, reject) => {
  getPosts().then((posts) => {
    const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()) || post.category.label.toLowerCase().includes(searchValue.toLowerCase()));
    resolve(filteredPosts);
  })
    .catch(reject);
});

// FILTER POSTS BY CATEGORY
const filterPostsByCategory = (category) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts?category.label="${category}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getPosts, getPostsForSingleUser, getSinglePost, createPost, updatePost, deletePost, searchPosts, filterPostsByCategory,
};
