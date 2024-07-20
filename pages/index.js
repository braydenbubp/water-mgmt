/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getPosts } from '../api/postData';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);

  const { user } = useAuth();

  const getAllThePosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, []);

  // TEST DATA - UNCOMMENT AND THEN COMMENT OUT LINES 12-20, COMMENT OUT THE IMPORTS, AND REMOVE 'onUpdate={getAllThePosts}' ON LINE 52
  // const posts = [
  //   {
  //     id: '1',
  //     title: 'Post 1',
  //     img: 'https://cisp.cachefly.net/assets/articles/images/resized/0000794271_resized_slimlinebatterypack0420191022.jpg',
  //     description: 'Idk what this thing is',
  //     user_id: 'user-1',
  //     category: 'Business',
  //     likes: 0,
  //     tags: 'water-management',
  //     comments: '',
  //   },
  //   {
  //     id: '2',
  //     title: 'Post 2',
  //     img: 'https://cisp.cachefly.net/assets/articles/images/resized/0000794271_resized_slimlinebatterypack0420191022.jpg',
  //     description: 'Idk what this thing is',
  //     user_id: 'user-2',
  //     category: 'Personal',
  //     likes: 1,
  //     tags: 'water-management',
  //     comments: '',
  //   },
  // ];

  return (
    <>
      <h1>Hello {user.name}! Check out these posts!</h1>
      <div className="d-flex flex-wrap" style={{ width: '100%' }}>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        ))}
      </div>
    </>
  );
}

export default Home;
