import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer/footer.js'
import Navbar from '../components/nav/nav.js'
import Button from 'react-bootstrap/Button';
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { user, error, isLoading } = useUser();

  const Home = (<div style={{minHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                  <h2 style={{textAlign: 'center'}}>Welcome to CodeNotes</h2>
                  <h3 style={{textAlign: 'center', fontWeight: '300'}}>All your coding notes in one place</h3>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Link href="/api/auth/login" passHref>
                      <Button variant="dark" style={{margin: '10px'}}>Sign Up / Sign In</Button>
                    </Link>
                  </div>
                </div>
              </div>);

  const Loading = (<div style={{minHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div>
                      <h3 style={{textAlign: 'center', fontWeight: '300'}}>Authenticating...</h3>
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

  if (user) {
    document.getElementById("logout").style.display = "block";
    router.push('/profile');
    return (
      <div >
        <Head>
          <title>Code Notes</title>
          <meta name="description" content="All your coding notes in one place." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main >
          <Navbar/>
            <div style={{minHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div >
                <h2>{user.name}</h2>
                <p>{user.email}</p>
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
            {Home}
          <Footer/>        
        </main>
      </div>
    )
}
