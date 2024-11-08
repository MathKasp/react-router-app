import React from 'react'
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'


function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const from = location.state?.from?.pathname || "/";


    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                if (password.length < 6) {
                    isValid = false
                    setError('Passwords does not match or is under 6 caracters')
                }
            }
        }
        return isValid
    }

    const register = e => {
        e.preventDefault()
        setError('')
        if (validatePassword()) {

            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log(res.user)
                    navigate(from, { replace: true });
                })
                .catch(err => setError(err.message))
        }
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div>
            <form onSubmit={register}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit">Céer le compte</button>
            </form>
        </div>
    )
}

export default Register

