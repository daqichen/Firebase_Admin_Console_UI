import { useState, useEffect} from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { Form, Button, Offcanvas } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';


const UpdateUser = () => {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const [status, setStatus] = useState("unknown")

    const [userinfo, setUserinfo] = useState({
        displayName:'',
        email:'',
        photoURL:'',
    })

    useEffect(() => {
        if (!loading && user){
            console.log("logged in! ")
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


    const handleClick = () => {
        if (user) {
            console.log("in handleClick")
            updateProfile(auth.currentUser, {
                displayName: userinfo.displayName, photoURL: userinfo.photoURL
            }).then(() => {
                setStatus("success")
                console.log("success" + user)
                setShow(true)
            }).catch((error) => {
                setStatus(error)
                console.log(error)
                setShow(true)
            });
        }
    }

    return (
        <Form className="mb-3">
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Username/Display name" 
                    name = "username"
                    value={userinfo.displayName}
                    onChange={(e) => setUserinfo((info) => ({
                        ...info,
                        displayName: e.target.value,
                    }))}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="ex. link ending in '.png'" 
                    name = "email"
                    value={userinfo.photoURL}
                    onChange={(e) => setUserinfo((info) => ({
                        ...info,
                        photoURL: e.target.value,
                    }))}/>
            </Form.Group>

            <Button 
                bsPrefix="customButton"
                variant="success" 
                onClick={() => handleClick()}
                >
                Update
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> {status === "success"? 
                        <p>Updated Profile Successfully, Welcome {userinfo.displayName}</p> : 
                        <p> An Error Occur, Please Try Again</p>}</Offcanvas.Title>
                </Offcanvas.Header>
        </Offcanvas>
        </Form>
    );
}

export default UpdateUser;