import { useState } from 'react';
import styles from './styles.module.css';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Button, Offcanvas} from 'react-bootstrap'
import SignInForm from './Auth/SignIn';
import * as ROUTES from '../constants/routes';

const Navbar = () => {

  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const handleClose = () => setLoginPrompt(false);

  const handleClick = () => {
    setLoginPrompt(true)
    if (!loading){
      if (user != null) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        console.log(email);
      }
    }
  }
  
  const logout = () => {
    signOut(auth)
  };
  
  return (
    
    <nav className={styles.navContainer}>
      <div className={styles.navContainer}>
      
        <ul className={styles.navLinks}>
          <a className={styles.typewriter} href={"/Firebase_Admin_Console_UI"+ROUTES.HOME}>Poor Frontend</a>
          <a className={styles.navItem} href={"/Firebase_Admin_Console_UI"+ROUTES.ORIGAMI}>Origami</a>
          <a className={styles.navItem} href={"/Firebase_Admin_Console_UI"+ROUTES.ADD}>POST/Add</a>
          <a className={styles.navItem} href={"/Firebase_Admin_Console_UI"+ROUTES.TVMAZE}>TVmaze&nbsp;Demo</a>
          {user && <a className={styles.navItem} href={"/Firebase_Admin_Console_UI"+ROUTES.ADMIN}>Account</a>}
          {/* <a className={styles.navItem} href="/subredditcool">SubredditAPI</a> */}
        </ul>
        <ul className={styles.navAuth}>
        {user? <Button bsPrefix={styles.navButton} onClick={logout}>Log&nbsp;out</Button> : 
                <Button bsPrefix={styles.navButton} onClick={handleClick}>Log&nbsp;in/Sign&nbsp;Up</Button>}
        
        <Offcanvas show={loginPrompt} onHide={handleClose}>
            <Offcanvas.Header closeButton>

            </Offcanvas.Header>
            <Offcanvas.Body>
              {!user && <SignInForm/>}
              {user && <div><h2 className="title"> Signed in as: </h2><a className="customButton" href={ROUTES.ADMIN}> {user.email} </a></div>}
            </Offcanvas.Body>
        </Offcanvas>
        </ul>
        </div>
    </nav>
  );
}

export default Navbar;