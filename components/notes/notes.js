import {React, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import styles from './notes.module.css'

export default function NotesList(props){
    const [allNotes, setNotes] = useState(props.notes)
    const [indx, setIndx] = useState(0)

    const [noteD, setNote] = useState({
        'name': "",
        'description': "",
        'code': ""
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [noteE, setNoteE] = useState({
        'name': "",
        'description': "",
        'code': ""
    })
    const [showE, setShowE] = useState(false);
    const handleCloseE = () => setShowE(false);
    const handleShowE = () => setShowE(true);

    const [validated, setValidated] = useState(false);
    const [noteP, setNoteP] = useState({
        'name': "",
        'description': "",
        'code': ""
    });

    const handleChange = (e)=> {
        const updateItem = (noteP[e.target.id] = e.target.value);
            // update the state data object
            setNoteP({ ...noteP, updateItem });
    }

    const deleteNote = (i)=> {
        var newNotes = []
        for(var j=0; j<allNotes.length; j++) {
            if(j !== i){
                newNotes.push(allNotes[j]);
            }
        }
        setNotes(newNotes);
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

        console.log(noteP)

        //
        var newNotes = allNotes
        newNotes[indx] = noteP
        //
        setNotes(newNotes);
        handleCloseE();
    };

    const notesList = (props.notes.length === 0)?(
                            <h5 style={{textAlign: 'center', fontWeight: '300'}}> No Notes Found</h5>
                        ):(
                            <ListGroup>
                                {
                                    allNotes.map((note, index)=> 
                                        <ListGroup.Item key={note.name}>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <div className = {styles.item} 
                                                     onClick={() => {setNote(note); handleShow()}}
                                                     style = {{cursor: 'pointer', backgroundColor:'#C7D8E9', borderRadius: '5px', padding: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {note.name}</div>
                                                <div style={{display: 'flex', justifyContent: 'space-around', width: '30%'}}>
                                                    <Button 
                                                        onClick={() => {setNoteE(note); setNoteP(note); setIndx(index); handleShowE()}}
                                                        variant="dark" className={styles.button}>
                                                            Edit
                                                    </Button>
                                                    <Button 
                                                        onClick={() => {deleteNote(index)}}
                                                        variant="dark" 
                                                        className={styles.button}>
                                                            X
                                                    </Button>   
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                )}
                            </ListGroup>
                        )
    
    return (
        <div id="notes" className={styles.notes}>
            {notesList}
            
                            
            <Modal show={showE} onHide={handleCloseE}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Note Name</Form.Label>
                            <Form.Control required
                                id='name'
                                type="text"
                                placeholder="note name"
                                onChange={handleChange}
                                defaultValue={noteE.name}
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
                                defaultValue={noteE.description}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={4} required
                                id="code"
                                type="text"
                                placeholder="Code here..."
                                onChange={handleChange}                            
                                defaultValue={noteE.code}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="dark">Save Change</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{noteD.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>{noteD.description}</h6>
                    <h5 ><code>{noteD.code}</code></h5>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}