import { useState } from 'react'
import useLogin from '../hooks/useLogin'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        setEmail('')
        setPassword('')
        navigate('/sell')
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit} className="login-form">
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
                <button disabled={isLoading}>Login</button>
            </form>            
            {error && <div className='error'>{error}</div>}
        </div>
    )
}


export default Login