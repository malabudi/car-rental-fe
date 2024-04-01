import Link from "next/link";
import styles from "./page.module.css";
import { cookies } from 'next/headers';

export default function Home() {
  const userEmail = cookies().get('user_email')?.value;

  return (
    <div className={styles.main}>
      <h1>Home Page</h1>
      { userEmail ? 
      // Logged In
      <>
        <h2>Welcome, {userEmail}</h2>
        <Link href='listings' className='button'>View Listings</Link>
      </>
      :
      // Guest
      <div className={styles.btnContainer}>
        <Link href='signup' className='button'>Create Account</Link>
        {/*<Link href='login'>Log In</Link>*/}
      </div>
      }
      
    </div>
  );
}
