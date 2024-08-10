import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { ButtonGroup } from 'react-bootstrap';
import { deletePost } from '../api/postData';
import { useAuth } from '../utils/context/authContext';

function PostCard({ postObj, onUpdate }) {
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };
  const { user } = useAuth();

  return (
    <Card className="post-card" style={{ width: '300px' }}>
      <Card.Body style={{ padding: '10px', color: '#F6F6F6', paddingBottom: '5px' }}>
        <Card.Title>{postObj.title}</Card.Title>
        <div style={{
          height: '280', width: '280', display: 'flex', margin: '10',
        }}
        >
          <Card.Img variant="top" src={postObj.image_url} alt={postObj.title} style={{ height: '280px', width: '280px' }} />
        </div>
        <Card.Subtitle style={
          {
            marginTop: '0', textAlign: 'right', fontSize: '18px', fontWeight: '600', color: '#CDB47B',
          }
            }
        >{postObj.category.label}
        </Card.Subtitle>
        <Card.Text style={{ marginBottom: '10px', fontSize: '16px' }}>{postObj.description}</Card.Text>
        <div style={{ minHeight: '24px', marginBottom: '16px', fontSize: '14px' }}>
          {/* {<p>Likes: {postObj.likes}} */}
          {postObj.tags.length > 0 ? (
            <p className="post-card-list-group">Tags: {postObj.tags?.map((tag) => (
              tag.label
            )).join(', ')}
            </p>
          ) : ''}
        </div>
        <ButtonGroup style={{ width: '100%', display: 'flex', alignItems: 'bottom' }}>
          <Link href={`/post/${postObj.id}`} passHref>
            <Button className="post-card-button">View</Button>
          </Link>
          {user.uid === postObj.user.uid ? (
            <Link href={`/post/edit/${postObj.id}`} passHref>
              <Button className="post-card-button">Edit</Button>
            </Link>
          ) : ''}
          {user.uid === postObj.user.uid ? <Button className="delete-button post-card-button" onClick={deleteThisPost}>Delete</Button> : ''}
        </ButtonGroup>
        <Card.Footer style={{
          fontSize: '12px', textAlign: 'right', padding: '0', marginTop: '5px',
        }}
        >Posted by <Link href={`/profile/${postObj.user?.id}`}>{postObj.user?.name}</Link>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    postDate: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    likes: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
