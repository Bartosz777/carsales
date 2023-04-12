import { Link } from 'react-router-dom'


const CarDetails = ({ car }) => {

    
    return (
        <div className="car-details">
                <h3>{car.mark}</h3>
                <img src={car.pictures[0]} />
                <div className="car-info">
                    <p>Model: {car.model}</p>
                    <p>Year: {car.year}</p>
                    <p>Mileage: {car.mileage} KM</p>
                </div>
                <div className="price-info">
                    <Link to={`/${car._id}`}>Read more</Link>
                    <p className='price'>{car.price} $</p>
                </div>
            </div>
    )
}


export default CarDetails