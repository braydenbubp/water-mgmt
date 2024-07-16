import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import { ListGroup } from 'react-bootstrap';
import { deleteComment } from '../api/commentData';

function CommentCard({ commentObj, onUpdate }) {
  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(commentObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '800px', margin: '15px' }}>
      <Card.Body>
        <Card.Title>{commentObj.id.first_name} {commentObj.id.last_name}</Card.Title>
        <Card.Text>{commentObj.content}</Card.Text>
        <Button variant="primary" className="m-2">Edit</Button>
        <Button variant="danger" onClick={deleteThisComment} className="m-2">Delete</Button>
        <Card.Footer>Date commented: {commentObj.date_posted}</Card.Footer>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    uid: PropTypes.string,
    post_id: PropTypes.string,
    date_posted: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
