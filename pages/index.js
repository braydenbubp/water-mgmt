/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getPosts } from '../api/postData';
import PostCard from '../components/PostCard';

function Home() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);

  const getAllThePosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllThePosts();
  }, [posts]);

  // TEST DATA - UNCOMMENT AND THEN COMMENT OUT LINES 10-20, COMMENT OUT THE IMPORTS, AND REMOVE 'onUpdate={getAllThePosts}' ON LINE 50
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
  //   },
  // ];

  return (
    <>
      <div className="d-flex flex-wrap" style={{ width: '100%' }}>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        ))}
      </div>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '20vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.fbUser.displayName}! </h1>
        <p>Click the button below to logout!</p>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}

export default Home;
