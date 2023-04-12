import { useState } from 'react'
import useSignup from '../hooks/useSignup'
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
        setEmail('')
        setPassword('')
        navigate('/sell')
    }

    return (
        <div className='signup'>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>E-mail</label>
                <input 
                    onChange={e => setEmail(e.target.value)} 
                    type="text" 
                    value={email}/>
                <label>Password</label>
                <input 
                    onChange={e => setPassword(e.target.value)} 
                    type="password" 
                    value={password}/>
                <button disabled={isLoading}>Signup</button>
            </form>
            {error && <div className='error'>{error}</div>}
        </div>
    )
}


export default Signup