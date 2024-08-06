import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { deletePost } from '../api/postData';

function PostCard({ postObj, onUpdate }) {
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '300px', margin: '15px' }}>
      <Card.Img variant="top" src={postObj.image_url} alt={postObj.title} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        {/* <Card.Subtitle>{postObj.category.label}</Card.Subtitle> */}
        <Card.Text>{postObj.description}</Card.Text>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Likes: {postObj.likes}</ListGroupItem>
          <ListGroupItem>Tags: {postObj.tags?.map((tag) => (
            tag.label
          )).join(', ')}
          </ListGroupItem>
        </ListGroup>
        {/* DYNAMIC LINK TO VIEW THE POST DETAILS */}
        <Link href={`/post/${postObj.id}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE POST DETAILS */}
        <Link href={`/post/edit/${postObj.id}`} passHref>
          <Button variant="primary" className="m-2">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPost} className="m-2">Delete</Button>
        {/* <Card.Footer>Date posted: </Card.Footer> */}
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
