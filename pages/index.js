/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import Link from 'next/link';
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

  return (
    <>
      <h1 style={{ width: '100%', textAlign: 'center', margin: '20px' }}>Hello, {user.name}! Check out these posts!</h1>
      <div
        className="d-flex flex-wrap"
        style={{
          width: '100%', height: '100%', justifyContent: 'center',
        }}
      >
        {posts.length > 0 ? posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        )) : <h5>There are no posts yet! <Link href="/post/edit/new">Create a Post!</Link></h5>}
      </div>
    </>
  );
}

export default Home;
