import { useState } from 'react'
import { useAuthContext } from './useAuthContext'


const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    
    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/user/signup', {
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
        } else {
            dispatch({ type: 'LOGIN', payload: json })
            localStorage.setItem('user', JSON.stringify(json))
            setIsLoading(false)
        }
    }


    return { signup, error, isLoading }
}


export default useSignup