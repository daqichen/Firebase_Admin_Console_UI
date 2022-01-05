import styles from './card.module.css'
import {Button, Offcanvas, Toast, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { useState } from 'react'
import UpdateOrigami from '../Subpages/UpdateOrigami'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const OrigamiCard = (props) => {
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth);

    const [model, setModel] = useState('hi')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // const [confirm, setConfirm] = useState(false);
    const handleDelete = (e) => {
        console.log(e.target.id + "will be set as the model to delete")
        setModel(e.target.id)
        setShow(true)
    }

    const deleteRequest = () => {
        console.log("Ready to delete model "+model);
        setShow(false)
        fetch('https://firebase-admin-console-api.herokuapp.com/delete', {
                'method':'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({collection: 'Origami',
                                    identifier_value: model,
                                    identifier_name: 'model_name'})
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp.result)})
            .catch(error => {
                console.log(error)})
        setModel('')
    }
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseToast = () => setShowUpdate(false);
    const handleUpdate = (e) => {
        console.log(e.target.id)
        // setModel(e.target.id)
        setShowUpdate(true)
    }

    return(
        <div>
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <div className={styles.header}>
                    <div className={styles.nameContainer}>
                        <h2 className={styles.name}>
                            {props.name === "" ? "Anonymous" : props.name}
                        </h2>
                    </div>
                </div>
                <div className={styles.content}>
                    <p className={styles.info}>Creator: {props.creator}</p>
                    <p className={styles.headline}>Difficulty: {props.difficulty_level}</p>
                    <p className={styles.info}>Number of steps: {props.steps}</p>
                    <p className={styles.info}>Paper: {props.paper}</p>
                    <a className={styles.body} href={props.source}>Learn more</a>
                    <div className={styles.header}>
                        {user? <Button 
                            bsPrefix={styles.updateButton}
                            onClick={handleUpdate}
                            > Update
                        </Button> :
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Admin&nbsp;Access&nbsp;Only</Tooltip>}>
                            <span className="d-inline-block">
                                <Button disabled style={{ pointerEvents: 'none' }} bsPrefix={styles.updateButton}>
                                Update
                                </Button>
                            </span>
                        </OverlayTrigger>}

                        {user? <Button 
                            bsPrefix={styles.deleteButton}
                            id={props.name}
                            onClick={handleDelete}
                            > Delete
                        </Button> :
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Admin&nbsp;Access&nbsp;Only</Tooltip>}>
                            <span className="d-inline-block">
                                <Button disabled style={{ pointerEvents: 'none' }} bsPrefix={styles.deleteButton}>
                                Delete
                                </Button>
                            </span>
                        </OverlayTrigger>}
                        
                        {/* Below are Admin Access */}
                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Confirmation to delete document</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                            Are you sure you want to delete model "{props.name}" by {props.creator}? 
                            This operation would not be reversible!
                            <div>
                                <Button 
                                bsPrefix={styles.updateButton}
                                onClick={deleteRequest}
                                > Confirm Deletion
                                </Button>
                            </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </div>
            <div className={styles.videoContainer}>
                {props.video_tutorial === null? (
                    <img
                    className={styles.contentContainer}
                    src="https://user-images.githubusercontent.com/55526292/142744172-24078c53-b7f9-4ec7-8884-2b55465dc40d.png" />
                ):(
                    <iframe width="100%" height="100%" src={getId(props.video_tutorial)} frameborder="0" allowfullscreen></iframe>
                )}
            </div>
        </div>
        <Toast show={showUpdate} onClose={handleCloseToast} bsPrefix={styles.toast}>
            <Toast.Header>
                <strong className="me-auto">{props.name}</strong>
                <small>Updating</small>
            </Toast.Header>
            <Toast.Body>
                <UpdateOrigami 
                    name={props.name}
                    creator={props.creator}
                    difficulty_level={props.difficulty_level}
                    video_tutorial={props.video_tutorial}
                    source={props.source}
                    steps={props.steps}
                    paper={props.paper}
                    img={props.img}
                />
            </Toast.Body>
        </Toast>
        </div>
    );
}

function getId(url) {
    // const regExp = "/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/";
    // const match = url.match(regExp);
    const match = url.split("=");

    return "//www.youtube.com/embed/" + match[1];
}

export default OrigamiCard;