import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { Tabs, Tab, Button } from 'react-bootstrap';
import styles from '../card.module.css'
import UpdateUser from '../../Subpages/UpdateUser';

const AdminPage = () => {
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  // using user.uid
  useEffect(() => {
    if (!loading && user){
        console.log("logged in as " + user.displayName + " with email " + user.email)
        setUserinfo((info) => ({
            ...info,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        }))
    } else {
        console.log("not logged in")
    }
  },[user])

  const [userinfo, setUserinfo] = useState({
    displayName:'',
    email:'',
    photoURL:'',
  })

  const [key, setKey] = useState('info');
  const [updatingP, setUpdatingP] = useState(false)

  return (
    <div className={styles.tabs}>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="info" title="Profile">
        <div>
            <div className={styles.container}>
                <div className={styles.contentContainer}>

                    {!user? <h2 className={styles.name}> Not Logged In! </h2> : <div>
                    <h2 className={styles.name}> Account Information </h2>
                    <br/>
                    <div className={styles.content}>
                        <p className={styles.headline}>Username: {userinfo.displayName?
                            userinfo.displayName : "Not set yet"}</p>
                        <p className={styles.info}>Email: {userinfo.email}</p>
                        <p className={styles.info}>Role: yet to be implemented</p>
                        
                    </div>
                    <br />
                    {!updatingP && <Button 
                        bsPrefix={styles.updateButton}
                        variant="success" 
                        onClick={() => setUpdatingP(true)}
                        >
                        Update Profile
                    </Button>}
                    {updatingP && <div> 
                        <Button 
                            bsPrefix={styles.deleteButton}
                            variant="success" 
                            onClick={() => setUpdatingP(false)}
                            >
                            Cancel Update
                        </Button> <br/> <br/>
                    <UpdateUser/> </div>}
                    </div>}

                </div>
                <div className={styles.imgContainer}>
                    <p className={styles.info}>Photo: <br/> <br/> {userinfo.photoURL? 
                            <img className={styles.profilepic} src= {userinfo.photoURL}/> : "Not set yet"}</p>

                </div>
            </div>
        </div>
      </Tab>

      <Tab eventKey="emailchange" title="Change Email">
        <div>
            <div className={styles.container}>
                
            </div>
        </div>
      </Tab>
      <Tab eventKey="pwdchange" title="Change Password">
        <div>
            <div className={styles.container}>
                
            </div>
        </div>
      </Tab>
      <Tab eventKey="activities" title="Activities">
        <div>
            <div className={styles.container}>
            <div className={styles.contentContainer}>

            {!user? <h2 className={styles.name}> Not Logged In! </h2> : <div>
                <h2 className={styles.name}> Recents </h2>
                <br/>
                <p className={styles.name}>Comments OR post-following OR changes made by the user</p>
            </div>}

            </div>
            </div>
        </div>
      </Tab>
    </Tabs>
    </div>
    // <Form className="mb-4">
    //     <h2 className="title">Sign In</h2>
    //     <Form.Group className="mb-4">
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control 
    //             type="email" 
    //             placeholder="Enter Email" 
    //             name = "email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}/>
    //     </Form.Group>
    //     <Form.Group className="mb-4">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control 
    //             type="password" 
    //             placeholder="Enter Password" 
    //             name = "password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}/>
    //     </Form.Group>
    //     <Button 
    //             bsPrefix="customButton"
    //             variant="success" 
    //             onClick={() => signInWithEmailAndPassword(email, password)}
    //             >
    //             Sign In
    //     </Button>
    //   {error && <p>Error: {error.message}</p>}
    //   {loading && <p>Loading...</p>}
    // </Form>
  );
};

export default AdminPage;