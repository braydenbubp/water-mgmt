import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateTag, createTag } from '../../api/tagData';

const initialState = {
  id: '',
  post_id: '',
  tag_id: '',
  description: '',
};

export default function TagForm({ obj }, postId) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  // NOT SURE IF THIS IS RIGHT. THE IDEA IS THAT IF WE ARE EDITING A TAG, IT WILL SET THE FORMINPUT STATE TO THE VALUES OF THE TAG, BUT IF WE ARE CREATING A NEW TAG, IT WILL SET THE POST_ID OF THE INITAL STATE TO THE POST_ID ON WHICH WE ARE TAGGING
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
      // ASSUMING WE ARE VIEWING TAGS ON THE POST DETAILS PAGE, SUBMITTING OR EDITING A TAG WILL RELOAD THE VIEW POST DETAILS PAGE FOR THAT POST
      updateTag(formInput).then(() => router.push(`/posts/${obj.post_id}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTag(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateTag(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Tag</h2>

      {/* CONTENT TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Tag" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter your tag"
          style={{ height: '200px' }}
          name="tag"
          value={formInput.description}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON  */}
        <Button type="submit">{obj.id ? 'Update' : 'Create'} Tag</Button>
      </FloatingLabel>

    </Form>
  );
}

TagForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    post_id: PropTypes.string,
    tag_id: PropTypes.string,
    description: PropTypes.string,
  }),
};

TagForm.defaultProps = {
  obj: initialState,
};
