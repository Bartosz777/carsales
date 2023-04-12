import CarDetails from "../components/CarDetails"
import { useEffect } from 'react'
import { useCarContext } from "../hooks/useCarContext"


const Home = () => {
    const { cars, dispatch } = useCarContext()


    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('/api/cars')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_CARS', payload: json })
            }
        }


        fetchCars()
    }, [dispatch])

    return (
        <main className="home">
            {cars && cars.map(car => <CarDetails key={car._id} car={car} />)}
        </main>
    )
}

export default Home