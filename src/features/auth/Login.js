import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'

const Login = () => {

    const adminEmailRef = useRef()
    const errRef = useRef()
    const [AdminPassword, setAdminPassword] = useState('')
    const [AdminEmail,setAdminEmail] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const navigate = useNavigate()

    const [login,{isLoading}]= useLoginMutation()
    const dispatch = useDispatch()

    useEffect(()=>{
        adminEmailRef.current.focus()
    },[])

    useEffect(()=>{
        setErrorMessage('')
    },[AdminEmail,AdminPassword])

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const adminEmailData = await login({AdminEmail,AdminPassword}).unwrap()
            dispatch(setCredentials({...adminEmailData,AdminEmail}))
            navigate("/welcome")
            setAdminEmail('')
            setAdminPassword('')
        }
        catch(err){
            if(!err?.response){
                setErrorMessage('No Server Response')
            }
            else if(err.response?.status === 400){
                setErrorMessage('Missing adminEmailname or adminPassword')
            }
            else if(err.response?.status === 401){
                setErrorMessage('Unauthorized')
            }
            else{
                setErrorMessage("Login Failed")
            }

            errRef.current.focus()
        }
    }

const handleadminEmailInput = (e) => setAdminEmail(e.target.value)
const handleadminEmailadminPassword = (e) => setAdminPassword(e.target.value)

    const content = isLoading ? <h1>Loading.....</h1> 
    : (
        <section className="login">
            <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">AdminEmail:</label>
                <input
                    type="text"
                    id="AdminEmail"
                    ref={adminEmailRef}
                    value={AdminEmail}
                    onChange={handleadminEmailInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="adminPassword">AdminPassword:</label>
                <input
                    type="AdminPassword"
                    id="AdminPassword"
                    onChange={handleadminEmailadminPassword}
                    value={AdminPassword}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>
    )

    return content
}

export default Login
