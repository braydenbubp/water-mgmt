import { Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import PostCard from '../../components/PostCard';
import { getPostsForSingleUser } from '../../api/postData';
import { signOut } from '../../utils/auth';

export default function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const userPosts = () => {
    getPostsForSingleUser(user.uid).then(setPosts);
  };
  useEffect(() => {
    userPosts();
  }, []);

  return (
    <>
      <Card style={{ width: '24rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Link href="/profile/new" passHref>
            <Button variant="primary" className="m-2">Edit</Button>
          </Link>
          <p className="card-text bold">Bio {user.bio}</p>
          <div style={{ display: 'flex', justifyContent: 'right' }}><Button variant="danger" onClick={signOut}>Sign Out</Button></div>
        </Card.Body>
      </Card>
      {/* not sure if this works at getting user posts yet need data to test it */}
      <div className="d-flex flex-wrap" style={{ width: '100%' }}>
        <p>POSTS</p>
        {posts.map((post) => (
          <PostCard key={post.uid} postObj={post} onUpdate={userPosts} />
        ))}
      </div>
    </>
  );
}
