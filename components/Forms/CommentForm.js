import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentData';

const initialState = {
  id: '',
  content: '',
  post: '',
  user: '',
  created_on: '',
};

export default function CommentForm({
  obj, commentPostId, onSubmit, onCancel,
}) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  // IF WE ARE EDITING A COMMENT, THIS WILL SET THE FORMINPUT STATE TO THE VALUES OF THE COMMENT, BUT IF WE ARE CREATING A NEW COMMENT, IT WILL SET THE POST_ID OF THE INITAL STATE TO THE POST_ID ON WHICH WE ARE COMMENTING
  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    } else {
      initialState.post = commentPostId;
      setFormInput(initialState);
    }
  }, [obj, commentPostId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const updatedComment = {
        id: obj.id,
        user: obj.user,
        content: formInput.content,
        created_on: obj.created_on,
        post: obj.post,
      };
      updateComment(updatedComment).then(onSubmit);
    } else {
      const payload = {
        user: user.id,
        content: formInput.content,
        post: commentPostId,
      };
      createComment(user.id, commentPostId, payload).then(() => {
        setFormInput(initialState);
        onSubmit();
      });
    }
  };

  return (
    <Form
      style={
        {
          width: '400px', display: 'flex',
        }
      }
      onSubmit={handleSubmit}
    >

      {/* CONTENT TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label={obj.id ? 'Update your comment' : 'Enter your comment'} className="mb-3">
        <Form.Control
          as="textarea"
          placeholder={obj.id ? 'Update your comment' : 'Enter your comment'}
          style={{ height: '100px', width: '360px' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON  */}
        <Button style={{ marginTop: '10px' }} type="submit">{obj.id ? 'Update' : 'Add'} Comment</Button>
        {obj.id ? <Button style={{ marginTop: '10px' }} onClick={onCancel}>Cancel</Button> : ''}
      </FloatingLabel>

    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
    content: PropTypes.string,
    post: PropTypes.string,
    created_on: PropTypes.string,
  }),
  commentPostId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};
