import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import getCategories from '../../api/categoryData';

const initialState = {
  title: '',
  image_url: '',
  description: '',
  category: {},
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);

    if (obj.id) setFormInput(obj);
  }, [obj]);

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
      updatePost(formInput).then(() => router.push(`/post/${obj.id}`));
    } else {
      // This only works if the user exists - will need to create a user in the database when somebody logs in for the first time"
      const payload = { ...formInput, uid: user.uid };
      createPost(payload).then(() => router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* category SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="category">
        <Form.Select
          // aria-label="category"
          name="category"
          onChange={handleChange}
          className="mb-3"
          value={formInput.category.id}
          required
        >
          <option value="" selected disabled>Select a category</option>
          {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={obj.description || formInput.description}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON  */}
        <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
      </FloatingLabel>

    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
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
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
