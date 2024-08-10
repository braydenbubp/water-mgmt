import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useRouter } from 'next/router';
// import { FloatingLabel } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { registerUser } from '../../utils/auth'; // Update with path to registerUser
import { updateUserProfile } from '../../api/userData';
// import { useAuth } from '../utils/context/authContext';

function RegisterForm({ obj, user, updateUser }) {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!obj.id) {
      setFormData({
        bio: '',
        uid: user.uid,
        name: '',
      });
    } else {
      setFormData({ ...obj, id: obj.id });
    }
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!obj.id) {
      registerUser(formData).then(() => updateUser(user.uid));
    } else {
      updateUserProfile(formData).then(() => router.push(`/profile/${obj.id}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>name</Form.Label>
        <Form.Control as="textarea" name="name" required placeholder="Enter your Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData.name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData.bio} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
  updateUser: PropTypes.func.isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    bio: PropTypes.string,
    uid: PropTypes.string,
  }),
};

RegisterForm.defaultProps = {
  obj: {
    name: '',
    bio: '',
    uid: '',
  },
  user: {
    uid: '',
  },
};

export default RegisterForm;
