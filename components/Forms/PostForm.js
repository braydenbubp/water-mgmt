import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
// import Select from 'react-select';
// import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';
// import AsyncSelect from 'react-select/async';
// import AsyncCreatableSelect from 'react-select/async-creatable';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import getCategories from '../../api/categoryData';
import { getTags } from '../../api/tagData';

const initialState = {
  title: '',
  image_url: '',
  description: '',
  category: {},
  tags: [],
};

export default function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  // const [newTags, setNewTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        ...obj,
        category: obj.category.id,
        tags: obj.tags.id,
      });
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
    // setNewTags((prevTags) => [...prevTags, selectedOption]);
    const tagArray = selectedOption.map((option) => (
      option.value
    ));
    setFormInput((prevState) => ({
      ...prevState,
      tags: tagArray,
    }));
  };

  // const loadOptions = (searchValue, callback) => {
  //   setTimeout(() => {
  //     const filteredOptions = tags.filter((tag) => tag.label.toLowerCase().includes(searchValue.toLowerCase()));
  //     callback(filteredOptions);
  //   }, 2000);
  // };

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
      {/* {tags.map((tag) => (
        <p>{tag.label}</p>
      ))} */}
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
      {/* <FloatingLabel controlId="floatingSelect" label="tags">
        <Form.Select
          aria-label="tags"
          name="tags"
          onChange={handleTagChange}
          className="mb-3"
          value={[formInput.tags]}
          required
          multiple
        >
          {
            tags.map((tag) => (
              <option
                key={tag.id}
                value={tag.id}
              >
                {tag.label}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel> */}
      <CreatableSelect
        aria-label="tags"
        name="tags"
        className="mb-3"
        // value={formInput.tags}
        required
        isMulti
        onChange={handleTagChange}
        // loadOptions={loadOptions}
        options={
          tags.map((tag) => (
            {
              value: tag.id, label: tag.label,
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
