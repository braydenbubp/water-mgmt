import { Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import PostCard from '../../components/PostCard';
import { getPostsForSingleUser } from '../../api/postData';
import { signOut } from '../../utils/auth';

export default function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const getUserPosts = () => {
    getPostsForSingleUser(user.uid).then(setPosts);
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <>
      <Card style={{ width: '15rem', marginTop: '20px' }}>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          {/* <Link href="/profile/new" passHref>
            <Button variant="primary" className="m-2">Edit</Button>
            </Link> */}
          <p className="card-text bold">Bio: {user.bio}</p>
          <div style={{ display: 'flex', justifyContent: 'right' }}><Button variant="danger" onClick={signOut}>Sign Out</Button></div>
        </Card.Body>
      </Card>
      <h5 style={{ marginTop: '30px' }}>Posts by {user.name}:</h5>
      <div className="d-flex flex-wrap" style={{ width: '100%', gap: '20px' }}>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getUserPosts} />
        ))}
      </div>
    </>
  );
}
