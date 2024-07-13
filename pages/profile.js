import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import PostCard from '../components/PostCard';
import { getPosts } from '../api/postData';

export default function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const getUserPosts = () => {
    getPosts(user.uid).then(setPosts);
  };

  return (
    <>
      <Card style={{ width: '24rem', margin: '10px' }}>
        <Card.Img variant="top" src={user.photoUrl} alt={user.fbUser.displayName} style={{ height: '150px' }} />
        <Card.Body>
          <Card.Title>{user.fbUser.displayName}</Card.Title>
          <p className="card-text bold">Last Login: {user.lastSignInDate}</p>
          <div style={{ display: 'flex', justifyContent: 'right' }}><signout /></div>
        </Card.Body>
      </Card>
      {/* not sure if this works at getting user posts yet need data to test it */}
      <div className="d-flex flex-wrap" style={{ width: '100%' }}>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getUserPosts} />
        ))}
      </div>
    </>
  );
}
