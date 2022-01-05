import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Form, Button } from 'react-bootstrap';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth, email, password);

  return (
    <Form className="mb-4">
        <h2 className="title">Sign In</h2>
        <Form.Group className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter Email" 
                name = "email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Enter Password" 
                name = "password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button 
                bsPrefix="customButton"
                variant="success" 
                onClick={() => signInWithEmailAndPassword(email, password)}
                >
                Sign In
        </Button>
      {error && <p>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}
      {/* Successful Log-in is being handled in Navbar.js */}
    </Form>
  );
};

export default SignInForm;