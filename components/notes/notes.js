import {React, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './notes.module.css'

export default function NotesList(props){
    const [noteD, setNote] = useState({
        'name': "",
        'description': "",
        'code': ""
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    const notesList = (props.notes.length === 0)?(
                            <h5 style={{textAlign: 'center', fontWeight: '300'}}> No Notes Found</h5>
                        ):(
                            <ListGroup>
                                {
                                    props.notes.map((note)=> 
                                        <ListGroup.Item key={note.name}>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <div className = {styles.item} 
                                                     onClick={() => {setNote(note); handleShow()}}
                                                     style = {{backgroundColor:'#C7D8E9', borderRadius: '5px', padding: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {note.name}</div>
                                                <div style={{display: 'flex', justifyContent: 'space-around', width: '30%'}}>
                                                    <Button variant="dark" className={styles.button}>Edit</Button>
                                                    <Button variant="dark" className={styles.button}>X</Button>   
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                )}
                            </ListGroup>
                        )
    
    return (
        <div id="notes" className={styles.notes}>
            {notesList}
            
                            
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