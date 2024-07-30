import { useRouter } from 'next/router';
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

export default function CommentForm({ obj, commentPostId, onSubmit }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  console.warn(commentPostId);

  // NOT SURE IF THIS IS RIGHT. THE IDEA IS THAT IF WE ARE EDITING A COMMENT, IT WILL SET THE FORMINPUT STATE TO THE VALUES OF THE COMMENT, BUT IF WE ARE CREATING A NEW COMMENT, IT WILL SET THE POST_ID OF THE INITAL STATE TO THE POST_ID ON WHICH WE ARE COMMENTING
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
      // ASSUMING WE ARE VIEWING COMMENTS ON THE POST DETAILS PAGE, SUBMITTING OR EDITING A COMMENT WILL RELOAD THE VIEW POST DETAILS PAGE FOR THAT POST
      updateComment(updatedComment).then(() => router.push(`/posts/${obj.post}`));
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
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Comment</h2>

      {/* CONTENT TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Enter your comment" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter your comment"
          style={{ height: '200px', width: '400px' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON  */}
        <Button type="submit">{obj.id ? 'Update' : 'Create'} Comment</Button>
      </FloatingLabel>

    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.string,
    content: PropTypes.string,
    post: PropTypes.string,
    created_on: PropTypes.string,
  }),
  commentPostId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};
