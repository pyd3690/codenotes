import {React, useState} from 'react';
import { useUser } from "@auth0/nextjs-auth0";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import styles from './addForm.module.css'

export default function AddNote(){
    const { user, error, isLoading } = useUser();
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
        var note1 = note
        note1['user'] = (user)?user.email:'none'
        const res = await fetch('/api/notes/add', {
            body: JSON.stringify(note1),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          })
      
          const result = await res.json()
          alert(result.message)
        console.log(result)
    };

    return(
        <div id="addNotesForm" className={styles.addNotesForm}>
            <h5 style={{marginTop: '40px'}}>New Note</h5>
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