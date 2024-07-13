import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentData';

const initialState = {
  id: '',
  content: '',
  post_id: '',
  uid: '',
  date_posted: '',
};

export default function CommentForm({ obj }, postId) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  // NOT SURE IF THIS IS RIGHT. THE IDEA IS THAT IF WE ARE EDITING A COMMENT, IT WILL SET THE FORMINPUT STATE TO THE VALUES OF THE COMMENT, BUT IF WE ARE CREATING A NEW COMMENT, IT WILL SET THE POST_ID OF THE INITAL STATE TO THE POST_ID ON WHICH WE ARE COMMENTING
  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    } else {
      initialState.post_id = postId;
      setFormInput(initialState);
    }
  }, [obj, postId]);

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
      // ASSUMING WE ARE VIEWING COMMENTS ON THE POST DETAILS PAGE, SUBMITTING OR EDITING A COMMENT WILL RELOAD THE VIEW POST DETAILS PAGE FOR THAT POST
      updateComment(formInput).then(() => router.push(`/posts/${obj.post_id}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createComment(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateComment(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Comment</h2>

      {/* CONTENT TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Comment" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter your comment"
          style={{ height: '200px' }}
          name="content"
          value={formInput.description}
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
    content: PropTypes.string,
    uid: PropTypes.string,
    post_id: PropTypes.string,
    date_posted: PropTypes.string,
  }),
};

CommentForm.defaultProps = {
  obj: initialState,
};
