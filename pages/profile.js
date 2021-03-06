import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Footer from '../components/footer/footer.js'
import Navbar from '../components/nav/nav.js'
import AddNote from '../components/addForm/addForm.js'
import NotesList from '../components/notes/notes.js'

import Button from 'react-bootstrap/Button';
import { useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

//var userEmail = ""

const notes = [
  {
    name: 'Cypress Fixture',
    description: "Access fixture",
    code: `before(function () {
      cy.fixture('example').then(function (data) {
        this.data = data;
      })
    })e`,
  },
  {
    name: 'Cypress Hooks',
    description: "Before and After Test",
    code: `afterEach('some description', function() {
      // Steps which need to be executed after each of the tests which finished execution
    });`,
  },
  {
    name: 'Cypress Custom Command',
    description: "Custome Command",
    code: 'Cypress.Commands.add(name, callbackFn)',
  },
]

export default function Profile({allNotes}) {
  const { user, error, isLoading } = useUser();

  const Loading = (<div style={{minHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div>
                      <h3 style={{textAlign: 'center', fontWeight: '300'}}>Loading...</h3>
                    </div>
                  </div>);

const ErrorSection = (<div style={{minHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div>
                    <h3 style={{textAlign: 'center', fontWeight: '300'}}>{(error !== undefined)?error.message: ''}</h3>
                  </div>
                </div>);

  if (isLoading) {
    return (
      <div >
        <Head>
          <title>Code Notes</title>
          <meta name="description" content="All your coding notes in one place." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main >
          <Navbar/>
            {Loading}
          <Footer/>        
        </main>
      </div>
    )}

  if (error) {
    return (
      <div >
        <Head>
          <title>Code Notes</title>
          <meta name="description" content="All your coding notes in one place." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main >
          <Navbar/>
            {ErrorSection}
          <Footer/>        
        </main>
      </div>
    )}

  

  if(user){
    document.getElementById("logout").style.display = "block";

    //userEmail = user.email;
    return (
    <div >
        <Head>
          <title>Code Notes - Profile</title>
          <meta name="description" content="All your coding notes in one place." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main >
          <Navbar v='block'/>
          <div style={{minHeight: '85vh',  marginTop: '40px'}} className={styles.container}>
            <div>
              <h2 style={{textAlign: 'center'}}>Welcome</h2>
              <h3 style={{textAlign: 'center', fontWeight: '300'}}>Account: {user.email}</h3>
              
              {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Button 
                    variant="dark" 
                    style={{margin: '10px'}}
                    onClick={()=>{document.getElementById("addNotesForm").style.display = "block";}}
                  >
                    Add Notes
                  </Button>
              </div> */}
              
              <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px'}}>
                  <AddNote />
              </div>

              <h3 style={{textAlign: 'center', fontWeight: '300'}}>Your Notes</h3>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px'}}>
                <NotesList notes={notes} />
              </div>
            </div>
          </div>
          <Footer/>        
        </main>
      </div>
    )}

    return (
      <div >
        <Head>
          <title>Code Notes</title>
          <meta name="description" content="All your coding notes in one place." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main >
          <Navbar/>
            
          <Footer/>        
        </main>
      </div>
    )
}

export const getServerSideProps = withPageAuthRequired(
  /* {
  async getServerSideProps(ctx) {

  //var email = userEmail.replaceAll(".", "+")

  const res = await fetch("https://codenotes.vercel.app/api/notes/all")//('http://localhost:3000/api/notes/all')
  const data = await res.json()
  const allNotes = data.notes
    console.log(allNotes)
  // Pass data to the page via props
  return { props: { allNotes } }
  }
} */
);

