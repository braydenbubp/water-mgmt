/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { ImSearch } from 'react-icons/im';
import { useAuth } from '../utils/context/authContext';
import { getPosts, searchPosts } from '../api/postData';
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

  const searchForPosts = (e) => {
    searchPosts(e.target.value).then((filteredPosts) => {
      if (filteredPosts.length === 0 && !e) {
        getAllThePosts();
      } else {
        setPosts(filteredPosts);
      }
    });
  };

  return (
    <>
      <h1 style={{ width: '100%', textAlign: 'center', margin: '20px' }}>Hello, {user.name}! Check out these posts!</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', marginBottom: '30px', width: '75%' }}>
          <ImSearch style={{ marginTop: '10px', marginRight: '5px' }} />
          <Form style={{ width: '100%' }}>
            <Form.Control
              type="text"
              placeholder="Filter by post title or category"
              name="search"
              // value={searchValue}
              onChange={searchForPosts}
              required
            />
          </Form>
        </div>
      </div>
      <div
        className="d-flex flex-wrap"
        style={{
          width: '100%', height: '100%', gap: '20px', justifyContent: 'space-evenly', paddingBottom: '20px',
        }}
      >
        {(posts.length > 0) ? posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllThePosts} />
        )) : <div style={{ display: 'flex', width: '800px', justifyContent: 'center' }}><h5 style={{ marginRight: '5px' }}>No posts match your search.</h5><Link passHref href="/post/edit/new"><h5 className="clickableLink">Create a Post?</h5></Link></div>}
      </div>
    </>
  );
}

export default Home;
