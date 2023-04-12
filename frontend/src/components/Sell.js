import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { useCarContext } from '../hooks/useCarContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Sell = () => {
    const navigate = useNavigate()
    const [years, setYears] = useState([])
    const [title, setTitle] = useState('')
    const [mark, setMark] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('') 
    const [price, setPrice] = useState('') 
    const [mileage, setMileage] = useState('')
    const [description, setDescription] = useState('')
    const [pictures, setPictures] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState(null)
    
    const { dispatch } = useCarContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const initYears = () => {
            for (let i = new Date().getFullYear(); i >= 1990; i--) {
                if (years.includes(i)) {
                    return years
                }
                else {
                    setYears(currentYear => [...currentYear, i])
                }
            }
        }

        initYears()
    }, [years])  

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const picturesModify = pictures.split(' ')

        const response = await fetch('/api/cars', {
            method: 'POST',
            body: JSON.stringify({
                title,
                mark,
                model,
                year,
                price,
                mileage,
                description,
                pictures: picturesModify,
                user_email: user.email,
                phone_number: phoneNumber
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setYear('')
            setTitle('')
            setPictures('')
            setMark('')
            setModel('')
            setPrice('')
            setMileage('')
            setPhoneNumber('')
            setDescription('')
            dispatch({ type: "ADD_CAR", payload: json })
            navigate('/')
        }
        
    }
    
    return (
        <div>
        <form onSubmit={handleSubmit} className='sell-form'>
            <label>Title</label>
            <input 
                className='title' 
                value={title} 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Mark</label>
            <input 
                type="text" 
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                />
            <label>Model</label>
            <input 
                type="text" 
                value={model}
                onChange={(e) => setModel(e.target.value)}    
                />
            <label>Price</label>
            <input 
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)} />
            <label>Year</label>
            <select onChange={(e) => setYear(e.target.value)} name='years'>
                <option value="">Select a year</option>
                {years.map((y, index) => 
                <option 
                    key={index} 
                    value={y}>
                        {y}
                </option>)}
            </select>
            <label>Mileage</label>
            <input 
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)} />
            <label>Phone Number</label>
            <input 
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} />
            <label>Description</label>
            <textarea 
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
            <label>Pictures</label>
            <textarea
                placeholder='Add links to pictures with space between'  
                rows="7"
                value={pictures}
                onChange={(e) => setPictures(e.target.value)}></textarea>
            <button>Add</button>
            {error && <div className='error'>{error}</div>}
        </form>
        </div>
    )
}



export default Sell