import {React, useState} from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import styles from './addForm.module.css'

export default function AddNote(){
    const [validated, setValidated] = useState(false);
    const [note, setNote] = useState({
        'name': "",
        'description': "",
        'code': ""
    });

    const handleChange = (e)=> {
        const updateItem = (note[e.target.id] = e.target.value);
            // update the state data object
            setNote({ ...note, updateItem });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        var validForm = true;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            validForm = false
            //return;
        }

        setValidated(true);
        if(validForm === false) {
            console.log("invalid form")
            return;
        }

        console.log(note)
    };


    return(
        <div id="addNotesForm" className={styles.addNotesForm}>
            <h5>New Note</h5>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Note Name</Form.Label>
                <Form.Control required
                    id='name'
                    type="text"
                    placeholder="note name"
                    onChange={handleChange}
                 />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    id='description'
                    type="text"
                    placeholder="note description"
                    onChange={handleChange}
                 />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={4} required
                    id="code"
                    type="text"
                    placeholder="Code here..."
                    onChange={handleChange}
                 />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="dark">Add</Button>
        </Form>  
        </div>
        
    )
}