import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import CreatableSelect from 'react-select/creatable';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import getCategories from '../../api/categoryData';
import { getTags } from '../../api/tagData';

const initialState = {
  title: '',
  image_url: '',
  description: '',
  category: 0,
  tags: [],
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        ...obj,
        category: obj.category.id,
      });
    }
  }, [obj]);

  useEffect(() => {
    const prevTags = [];
    if (obj?.id) {
      obj.tags.forEach((tag) => {
        prevTags.push({ value: tag.id, label: tag.label });
      });
      setSelectedTags(prevTags);
    }
  }, [obj]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTagChange = (selectedOption) => {
    const newTagArray = [];
    const tagArray = [];
    selectedOption.forEach((option) => {
      // eslint-disable-next-line no-underscore-dangle
      if (option.__isNew__) {
        newTagArray.push({ value: option.value, label: option.label });
      } else {
        tagArray.push({ value: option.value, label: option.label });
      }
    });
    setSelectedTags(tagArray);
    setNewTags(newTagArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagIds = selectedTags.map((tag) => tag.value);
    const newTagLabels = newTags.map((tag) => tag.value);

    const payload = {
      ...formInput,
      uid: user.uid,
      tags: tagIds,
      newTags: newTagLabels,
    };

    if (obj?.id) {
      updatePost(payload).then(() => router.push('/'));
    } else {
      createPost(payload).then(router.push('/'));
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
          value={formInput.category}
          required
        >
          <option value="">Select a category</option>
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
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* tag SELECT  */}
      <CreatableSelect
        aria-label="tags"
        name="tags"
        className="mb-3"
        value={[...selectedTags, ...newTags]}
        required
        isMulti
        onChange={handleTagChange}
        options={
          tags.map((tag) => (
            {
              value: parseInt(tag.id, 10), label: tag.label,
            }
          ))
        }
      />
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>

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
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
