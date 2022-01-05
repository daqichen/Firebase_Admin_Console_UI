import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateOrigami = (props) => {
    const [formData, setFormData] = useState({
        collection:'Origami', // Hardcoded according to which collection this js page componant is fore
        identifier_name:'model_name',
        identifier_value:props.name,
        model_name_field:props.name,
        creator_field:props.creator,
        level_of_difficulty_field:props.difficulty_level,
        steps_field:props.steps,
        source_pattern_link_field:props.source,
        paper_ratio_field:props.paper,
        video_tutorial_field:props.video_tutorial,
        img_field:props.img
    })

    const [isLoading, setIsLoading] = useState(false)
    const handleFirestore = (event) => {
        // const datamodel = formData;
        console.log(formData)
        setIsLoading(true)
        fetch('https://firebase-admin-console-api.herokuapp.com/update', {
            'method':'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(resp => {
            setIsLoading(false)
            console.log(resp.result)})
        .catch(error => {
            setIsLoading(false)
            console.log(error)})
        
    }
    return (
        <main>
            <div className="container">
            <Form className="form">
                <h2 className="title">Details on Model {formData.identifier_value}</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Model Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Model Name" 
                        name = "model_name_field"
                        value={formData.model_name_field}
                        onChange={e => setFormData((formData) => ({
                            ...formData,
                            model_name_field: e.target.value,
                        }))}/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Creator</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Model Creator" 
                        name = "creator_field"
                        value={formData.creator_field}
                        onChange={e => setFormData((formData) => ({
                            ...formData,
                            creator_field: e.target.value,
                        }))}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Level of Difficulty</Form.Label>
                    <Form.Control 
                        as="select" 
                        name = "level_of_difficulty_field"
                        value={formData.level_of_difficulty_field}
                        onChange={e => setFormData((formData) => ({
                            ...formData,
                            level_of_difficulty_field: e.target.value,
                        }))}>
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Steps</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Roughly steps estimate" 
                        name = "steps_field"
                        value={formData.steps_field}
                        onChange={e => setFormData((formData) => ({
                            ...formData,
                            steps_field: Number(e.target.value),
                        }))}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Paper Ratio</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Dimension or any relevant details" 
                        name = "paper_ratio_field"
                        value={formData.paper_ratio_field}
                        onChange={e => setFormData((formData) => ({
                            ...formData,
                            paper_ratio_field: e.target.value,
                        }))}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Source</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Link to pattern" 
                        name = "source_pattern_link_field"
                        value={formData.source_pattern_link_field}
                        onChange={e => setFormData((formData) => ({
                            ...formData,
                            source_pattern_link_field: e.target.value,
                        }))}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Video</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Link to youtube" 
                        name = "video_tutorial_field"
                        value={formData.video_tutorial_field}
                        onChange={e => setFormData((formData) => ({
                            ...formData,
                            video_tutorial_field: e.target.value,
                        }))}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Link to your work" 
                        name = "img_field"
                        value={formData.img_field}
                        onChange={e => setFormData((formData) => ({
                            ...formData,
                            img_field: e.target.value,
                        }))}/>
                </Form.Group>

                <Button 
                    bsPrefix="customButton"
                    variant="success" 
                    onClick={!isLoading? handleFirestore: null}
                    >
                    {isLoading ? 'Connecting to Firestore':'Send to Firestore'}
                </Button>
            {isLoading && <div class='success-message'>SENDING TO FIRESTORE MODEL: {formData.model_name_field}</div>}
            {!isLoading && <div class='success-message'>Nothing yet</div>}
            
            </Form>

            </div>
        </main>
    );
}

export default UpdateOrigami;