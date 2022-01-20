import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { UserNameContext } from '../context/UserNameContext';

const Login = (props) => {
  const [show, setShow] = useState(false);
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userName, setUserName] = useContext(UserNameContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/auth/login', {
        params: {
          username: username,
          password: password
        }
      });
      localStorage.setItem('userData', JSON.stringify(response.data));
      setUserName(response.data.name);

      props.history.push('/');
    } catch (err) {
      console.error('error in login user', err.message);
    }
  };

  return (
    <>
      <Button
        size='lg'
        onClick={handleShow}
        className='btn '
        style={{ backgroundColor: '#343a40', border: 'none' }}
      >
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Form onSubmit={loginUser}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter user name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='secondary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default withRouter(Login);
