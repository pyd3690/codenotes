import {React} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import styles from './notes.module.css'

export default function NotesList(props){
    const notesList = (props.notes.length === 0)?(
                            <h5 style={{textAlign: 'center', fontWeight: '300'}}> No Notes Found</h5>
                        ):(
                            <ListGroup>
                                {
                                    props.notes.map((note)=> 
                                        <ListGroup.Item key={note.name}>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <div className = {styles.item} style = {{backgroundColor:'#C7D8E9', borderRadius: '5px', padding: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {note.name}</div>
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
        </div>
    )
}