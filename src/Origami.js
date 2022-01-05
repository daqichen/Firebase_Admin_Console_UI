import React, { useState, useEffect } from 'react';
import OrigamiCard from './components/OrigamiCard';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const Origami = () => {

    const [rerenderTrig, setRerenderTrig] = useState(0)
    const [origami, setOrigami] = useState([])
    const [filters, setFilters] = useState({
        collection:'Origami',
        filter_applied:'false',
        difficulty: '',
        low_steps: 0,
        high_steps: 1000,
        order_by: '',
    })

    useEffect(() => {
        console.log(filters)
        console.log("we are in useEffect with a value of rerenderTrig of " + rerenderTrig)
        const urlParameters = Object.entries(filters).map(e => e.join('=')).join('&')
        console.log(urlParameters);

        fetch('https://firebase-admin-console-api.herokuapp.com/list?' + String(urlParameters), {
            'method':'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( async (response) => {
            // get json response here
            let data = await response.json();
            
            if(response.status === 200){
            // Process data here
                setNoResult(false)
                setOrigami(data)
                console.log(Object.keys(origami).length)
                console.log(origami)
                // setFilteredResultShow(true)
            }else{
            // Rest of status codes (400,500,303), can be handled here appropriately
                console.log("status code is prob 90 and no results from selected filters")
                setNoResult(true)
                // setFilteredResultShow(true)
            }
        })
        .catch((err) => {
            console.log(err);
        })

    },[rerenderTrig]) // important to have [] so that it doesn't repeatedly make Get request

    const [noResult, setNoResult] = useState(false)
    const [filteredResultShow, setFilteredResultShow] = useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => {setShow(false)}
    

    const handleFirestore = (event) => {
        console.log("in HandleFirestore")
        // setFilteredResultShow(true)
        setFilters((filters) => ({
            ...filters,
            filter_applied:'true',
        }))
        setRerenderTrig(rerenderTrig+1) // no much sig besides triggering useEffect
        console.log("Should be retriggering useEffect")

    }

    return (
        <main>
            <div className="container">
                <h2 className="title">Welcome to my Origami Blog</h2>
                <Button 
                        bsPrefix="customButton"
                        variant="success" 
                        onClick={() => setShow(true)}
                        >
                        Apply Filters
                </Button>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="title">Put in some filters</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Form className="mb-4">
                            <Form.Group className="mb-4">
                                <Form.Label>Difficulty Level</Form.Label>
                                <Form.Control 
                                    as="select"
                                    name = "difficulty"
                                    value={filters.difficulty}
                                    onChange={(e) => setFilters((filters) => ({
                                        ...filters,
                                        difficulty: e.target.value,
                                    }))}>
                                    <option selected="true"></option>
                                    <option>low</option>
                                    <option>medium</option>
                                    <option>high</option>
                                    </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Order By Step Numbers</Form.Label>
                                <Form.Control 
                                    as="select"
                                    name = "order_by"
                                    value={filters.order_by}
                                    onChange={(e) => setFilters((filters) => ({
                                        ...filters,
                                        order_by: e.target.value,
                                    }))}>
                                    <option selected="true"></option>
                                    <option>desc</option>
                                    <option>asc</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="title">Steps Ranges</Form.Label>
                                <br/>
                                <Form.Label>From</Form.Label>
                                <RangeSlider
                                    value={filters.low_steps}
                                    onChange={e => setFilters((filters) => ({
                                        ...filters,
                                        low_steps: Number(e.target.value),
                                    }))}
                                    variant='info'
                                    min={0}
                                    max={1000}
                                />
                                <Form.Label>Up To</Form.Label>
                                <RangeSlider
                                    value={filters.high_steps}
                                    onChange={e => setFilters((filters) => ({
                                        ...filters,
                                        high_steps: Number(e.target.value),
                                    }))}
                                    variant='info'
                                    min={filters.low_steps}
                                    max={1000}
                                />
                            </Form.Group>
                            <Button 
                                    bsPrefix="customButton"
                                    variant="success" 
                                    onClick={() => handleFirestore()}
                                    >
                                    Filter
                            </Button>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
                {/* Put in !filteredResultShow for now to see how to handle no return */}
                {noResult && <h2 className="title"> 
                                    Yikes, the filter selected didn't return any creations, please try a different filter!
                                    </h2>}
                
                {!noResult && origami.map(model => {
                    return (
                        <div key = {model.model_name}>
                            <OrigamiCard
                                name={model.model_name}
                                creator={model.creator}
                                difficulty_level={model.level_of_difficulty}
                                video_tutorial={model.video_tutorial}
                                source={model.source_pattern}
                                steps={model.number_of_steps}
                                paper={model.paper_ratio}
                                img={model.img}
                            />
                        </div>
                    )
                })}
            </div>
        </main>
    );
}

export default Origami;