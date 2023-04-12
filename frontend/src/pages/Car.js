import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Gallery from "../components/Gallery"


const Car = () => {
    const params = useParams()
    const [carObj, setCarObj] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const response = await fetch('/api/cars/' + params.id)

            const json = await response.json()
            setCarObj(json)
        }

        fetchCar()
    }, [params.id])

    return (
        <div>
        {carObj &&
        <div className='car-page'>
        <div className='car-page-header'>
            <Gallery images={carObj.pictures}/>
            <div className='contact'>
            <p className='number'><span class="material-symbols-outlined">
                call
            </span> {carObj.phone_number}</p>
            <p className='email'><span class="material-symbols-outlined">
                mail
            </span> {carObj.user_email}</p>
        </div>
        </div>
        <h1>{carObj.title}</h1>
        <h2>{carObj.mark} {carObj.model}</h2>
        <h3>Year: {carObj.year}</h3>
        <h3>Mileage: {carObj.mileage} KM</h3>
        <i>{carObj.price} $</i>
        <div className='description'>
        <p>
            {carObj.description}
        </p>
        </div>    
        </div>
        }
        </div>
    )
}


export default Car