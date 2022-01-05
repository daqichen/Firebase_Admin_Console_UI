import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
    
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const SignUpForm = () => {
  
    const [signupinfo, setSignupinfo] = useState({
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
    })
      
    const isInvalid =
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '' ||
          username === '';

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    return (
        <Form className="form">
            <h2 className="title">Sign Up</h2>
            <Form.Group className="mb-3">
                <Form.Label>Username or User ID</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter User Name" 
                    name = "username"
                    value={signupinfo.username}
                    onChange={e => setSignupinfo((info) => ({
                        ...info,
                        username: e.target.value,
                    }))}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Email" 
                    name = "email"
                    value={signupinfo.email}
                    onChange={e => setSignupinfo((info) => ({
                        ...info,
                        email: e.target.value,
                    }))}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Set a password" 
                    name = "passwordOne"
                    value={signupinfo.passwordOne}
                    onChange={e => setSignupinfo((info) => ({
                        ...info,
                        passwordOne: e.target.value,
                    }))}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Re-enter the password" 
                    name = "passwordTwo"
                    value={signupinfo.passwordTwo}
                    onChange={e => setSignupinfo((info) => ({
                        ...info,
                        passwordTwo: e.target.value,
                    }))}/>
            </Form.Group>
            {isInvalid && <Button 
                    bsPrefix="customButton"
                    variant="success" 
                    onClick={() => createUserWithEmailAndPassword(signupinfo.email, signupinfo.passwordOne)}
                    >
                    Sign Up
            </Button>}
            {error && <div>
                            <p>Error: {error.message}</p>
                        </div>}
            {loading && <p>Loading...</p>}
            {user && <div>
                        <p>Signed In User: {user.email}</p>
                    </div>}
        </Form>
    );

}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };