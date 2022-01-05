import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const TVmaze = () => {

    const [projects, setProjects] = useState([])

    const [showname, setShowname] = useState({show: ''})
    const [message, setMessage] = useState('Look up a show and query all the episodes')
    const queryShow = () => {
        fetch('https://firebase-admin-console-api.herokuapp.com/test?show='+String(showname.show))
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            setProjects(resp)
            setMessage('Query successfully for the Show "'+showname.show+'", see below for details')
        })
        // .then(resp => setProjects(resp.data.json()))
        .catch(error => {
            setMessage("Sorry, the show you put in wasn't found, but you should make it!! ")
            console.log(error)})
    }
    return (
        <main>
            <div className="container">
                {/* <h2>Pick a TV show: </h2> */}
                <Form>
                    <h2 className="title">Enter a TV Show: </h2>
                    <Form.Group className="mb-3">
                        <Form.Label>All episodes</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Show Name" 
                            name = "show"
                            value={showname.show}
                            onChange={e => setShowname((showname) => ({
                                ...showname,
                                show: e.target.value
                            }))}
                            />
                    </Form.Group>
                    <Button 
                        variant="success" 
                        onClick={queryShow}>
                        Get Episodes
                    </Button>
                </Form>
                <div className="form">
                    <p>Note: {message}</p>
                    {projects && projects.map(project => {
                        return (
                            <div key = {project.id}>
                                <h2>{project.name}</h2>
                                <a href={project.url}>More details on TVMaze</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}

export default TVmaze;