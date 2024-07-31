import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import { ListGroup } from 'react-bootstrap';
import { deleteComment, updateComment } from '../api/commentData';
import CommentForm from './Forms/CommentForm';

function CommentCard({ commentObj, onUpdate }) {
  const [cardText, setCardText] = useState(<Card.Text>{commentObj.content}</Card.Text>);

  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(commentObj.id).then(() => onUpdate());
    }
  };

  const handleSubmit = (obj) => {
    updateComment(obj).then((updatedCommentObj) => {
      setCardText(<Card.Text>{updatedCommentObj.content}</Card.Text>);
      onUpdate();
    });
  };

  const editThisComment = () => {
    setCardText(<CommentForm obj={commentObj} commentPostId={commentObj.post} onSubmit={handleSubmit} />);
  };

  return (
    <Card style={{ width: '800px', margin: '15px' }}>
      <Card.Body>
        {cardText}
        <Button variant="primary" onClick={editThisComment} className="m-2">Edit</Button>
        <Button variant="danger" onClick={deleteThisComment} className="m-2">Delete</Button>
        {/* <Card.Footer>Date commented: {commentObj.date_posted}</Card.Footer> */}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    uid: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
    post: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
