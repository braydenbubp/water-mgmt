import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useRouter } from 'next/router';
// import { FloatingLabel } from 'react-bootstrap';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
// import { useAuth } from '../utils/context/authContext';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    bio: '',
    uid: user.uid,
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>name</Form.Label>
        <Form.Control as="textarea" name="name" required placeholder="Enter your Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>bio</Form.Label>
        <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
