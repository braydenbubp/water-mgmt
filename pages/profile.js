import { Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import PostCard from '../components/PostCard';
import { getPostsForSingleUser } from '../api/postData';
import { signOut } from '../utils/auth';

export default function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  console.warn(user);
  const getUserPosts = () => {
    getPostsForSingleUser().then(setPosts);
  };

  return (
    <>
      <Card style={{ width: '24rem', margin: '10px' }}>
        <Card.Img variant="top" src={user.photoUrl} alt={user.name} style={{ height: '150px' }} />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Button> edit </Button>
          <p className="card-text bold">Bio {user.bio}</p>
          <div style={{ display: 'flex', justifyContent: 'right' }}><Button variant="danger" onClick={signOut}>Sign Out</Button></div>
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
