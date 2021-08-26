import {React} from 'react';
import Button from 'react-bootstrap/Button';


export default function Navbar(){
    return (
        <div style={{background: 'lightgray', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h4>CodeNotes</h4>
            <a href="/api/auth/logout">
                <Button variant="dark" id="logout" style={{display: 'none'}}>Logout</Button>
            </a>
        </div>
    )
}