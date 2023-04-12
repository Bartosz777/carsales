import { useState } from 'react'
import { useAuthContext } from './useAuthContext'


const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        } 

        if (response.ok) {
            dispatch({ type: 'LOGIN', payload: json })
            localStorage.setItem('user', JSON.stringify(json))
            setIsLoading(false)
        }
    }


    return { login, error, isLoading }
}


export default useLogin