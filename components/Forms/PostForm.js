import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import getCategories from '../../api/categoryData';
import { createTag, getTags } from '../../api/tagData';

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

  // const handleCreate = (inputValue) => {
  //   setNewTags((prevState) => ({
  //     ...prevState,
  //     inputValue,
  //   }));
  // };

  const handleTagChange = (selectedOption) => {
    // eslint-disable-next-line no-underscore-dangle
    // if (typeof selectedOption[0].value === 'string') {
    //   console.warn('it is string');
    //   const newTagArray = selectedOption.map((option) => (
    //     option.value
    //   ));
    //   setNewTags((prevState) => ({
    //     ...prevState,
    //     newTagArray,
    //   }));
    // } else {
    const tagArray = selectedOption.map((option) => (
      option.value
    ));
    setFormInput((prevState) => ({
      ...prevState,
      tags: tagArray,
    }));
    // }
    console.warn(selectedOption);
    console.warn('formInput.tags', formInput.tags);
    // console.warn('newTags', newTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updatePost(formInput).then(() => router.push(`/post/${obj.id}`));
    } else {
      // const oldTagArray = [];
      // const newTagArray = [];
      // for (let i = 0; i < formInput.tags.length; i++) {
      //   if (tags.find((tag) => tag.id === formInput.tags[i])) {
      //     oldTagArray.push(formInput.tags[i]);
      //   } else {
      //     createTag(formInput.tags[i]).then((newTagObj) => {
      //       newTagArray.push(newTagObj.id);
      //     });
      //   }
      // }

      // for (let i = 0; i < newTags.length; i++) {
      //   createTag(newTags[i]);
      // }
      // const payload = { ...formInput, uid: user.uid };
      // if (newTags.length === 0) {
      //   createPost(payload).then(() => {
      //     router.push('/');
      //   });
      // } else {
      //   createPost(payload).then((newPost) => {
      //     const patchPayload = { ...newPost, tags: newTags };
      //     updatePost(patchPayload).then(() => {
      //       router.push('/');
      //     });
      //   });
      // }
      const newTagArray = [];
      for (let i = 0; i < formInput.tags.length; i++) {
        if (tags.find((tag) => tag.id === formInput.tags[i])) {
          break;
        } else {
          createTag(formInput.tags[i]).then((newTag) => {
            newTagArray.push(newTag);
          });
        }
      }
      const payload = { ...formInput, uid: user.uid };
      createPost(payload).then((newPost) => {
        const patchPayload = { ...newPost, tags: newTagArray };
        updatePost(patchPayload).then(() => {
          router.push('/');
        });
      });
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
      <CreatableSelect
        aria-label="tags"
        name="tags"
        className="mb-3"
        // value={formInput.tags}
        required
        isMulti
        onChange={handleTagChange}
        // onCreateOption={handleCreate}
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
