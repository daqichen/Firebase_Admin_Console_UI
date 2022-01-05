import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddOrigami from './Subpages/AddOrigami';
import AddUser from './Subpages/AddUser';

const Add = () => {
    const [collection, setCollection] = useState('')
    return (
        <main>
            <div className="container">
                <DropdownButton 
                    bsPrefix="customButton"
                    key="collection"
                    id="dropdown-variants-success"
                    variant="success"
                    title="Please select the collection you are attempting to Add document(s) to:"
                    onSelect={(e) => setCollection(e)}>
                    <Dropdown.Item eventKey="Origami">Origami</Dropdown.Item>
                    <Dropdown.Item eventKey="Users">Users (Make sure you have permission) </Dropdown.Item>
                    <Dropdown.Item eventKey=""> Placeholder </Dropdown.Item>
                </DropdownButton>
                {collection =='' && <div class=''>No collection selected yet! </div>}
                {collection =='Origami' && <AddOrigami/>}
                {collection =='Users' && <AddUser/>}
            </div>
        </main>
    );
}

export default Add;