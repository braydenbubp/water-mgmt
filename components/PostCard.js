import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';
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
        <Card.Subtitle>{postObj.category}</Card.Subtitle>
        <Card.Text>{postObj.description}</Card.Text>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Likes: {postObj.likes}</ListGroup.Item>
          <ListGroup.Item>Tags: {postObj.tags}</ListGroup.Item>
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
        <Card.Footer>Date posted:</Card.Footer>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.number,
    category: PropTypes.number,
    likes: PropTypes.number,
    tags: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
