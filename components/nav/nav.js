import {React} from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'


export default function Navbar(){
    return (
        <div style={{background: 'lightgray', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h4>CodeNotes</h4>
            <Link href="/api/auth/logout" passHref>
                <Button variant="dark" id="logout" style={{display: 'none'}}>Logout</Button>
            </Link>
        </div>
    )
}