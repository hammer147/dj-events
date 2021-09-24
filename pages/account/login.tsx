import { NextPage } from 'next'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaUser } from 'react-icons/fa'
import Layout from '../../components/layout/layout'
import styles from './login.module.css'
import { FormEventHandler, useState } from 'react'

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1><FaUser /> Log In</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>Don&apos;t have an account?<Link href="/account/register"> Register</Link></p>
      </div>
    </Layout>
  )
}

export default LoginPage
