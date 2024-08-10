import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import { ListGroup } from 'react-bootstrap';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { deleteComment, updateComment } from '../api/commentData';
import CommentForm from './Forms/CommentForm';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';

function CommentCard({ commentObj, onUpdate }) {
  const [cardText, setCardText] = useState(<Card.Text>{commentObj.content}</Card.Text>);
  const [commentUser, setCommentUser] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getSingleUser(commentObj.user).then((obj) => {
      setCommentUser(obj);
    });
  }, [commentObj]);

  const { user } = useAuth();

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
    setEdit(false);
  };

  const handleCancel = () => {
    setCardText(<Card.Text>{commentObj.content}</Card.Text>);
    setEdit(false);
  };

  const editThisComment = () => {
    setCardText(<CommentForm obj={commentObj} commentPostId={commentObj.post} onSubmit={handleSubmit} onCancel={handleCancel} />);
    setEdit(true);
  };

  return (
    <Card style={
      {
        width: '400px', margin: '15px', background: 'none', display: 'flex', border: '1px solid black', radius: '5px', padding: '5px',
      }
    }
    >
      <Card.Body style={{ display: 'flex', wrap: 'wrap', justify: 'space-between' }}>
        {cardText}
        {user.uid === commentUser.uid && edit === false ? [DropdownButton].map((DropdownType, idx) => (
          <DropdownType
            as={ButtonGroup}
            style={
              {
                display: 'flex', marginLeft: 'auto', height: '25px', alignItems: 'center',
              }
            }
            // key={idx}
            id={`dropdown-button-drop-${idx}`}
            size="sm"
            variant="secondary"
            title="Options"
          >
            <Dropdown.Item onClick={editThisComment}>Edit</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={deleteThisComment}>Delete</Dropdown.Item>
          </DropdownType>
        )) : ''}
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    uid: PropTypes.string,
    user: PropTypes.number,
    post: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
