import { Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import Link from 'next/link';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import PostCard from '../../components/PostCard';
import { getPostsForSingleUser } from '../../api/postData';
import { getSingleUser } from '../../api/userData';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const getUserPosts = () => {
    getPostsForSingleUser(user.uid).then(setPosts);
  };

  const getTheUser = () => {
    getSingleUser(user.uid).then((theUser) => {
      setUserDetails(theUser);
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  useEffect(() => {
    getTheUser();
  }, []);

  return (
    <>
      <Card style={{ width: '15rem', marginTop: '20px' }}>
        <Card.Body>
          <Card.Title>{userDetails.name}</Card.Title>
          {/* <Link href="/profile/new" passHref>
            <Button variant="primary" className="m-2">Edit</Button>
          </Link> */}
          <p className="card-text bold">Bio: {userDetails.bio}</p>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            {userDetails.uid === user.uid ? <Link href={`/profile/edit/${id}`} passHref><Button variant="secondary">Edit</Button></Link> : ''}
          </div>
        </Card.Body>
      </Card>
      <h5 style={{ marginTop: '30px' }}>Posts by {user.name}:</h5>
      <div className="d-flex flex-wrap" style={{ width: '100%', gap: '20px' }}>
        {posts.length === 0 && 'You have not posted yet...'}
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getUserPosts} />
        ))}
      </div>
    </>
  );
}
