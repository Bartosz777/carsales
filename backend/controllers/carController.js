const Car = require('../models/carModel')


// get cars

const getCars = async (req, res) => {
    const cars = await Car.find({ }).sort({ createdAt: -1 })

    res.status(200).json(cars)
}

// get a single car 

const getCar = async (req, res) => {
    const { id } = req.params
    
    const car = await Car.findById(id)

    if (!car) {
        res.status(400).json({ error: 'Car does not exist' })
    }

    res.status(200).json(car)
}


// create car

const createCar = async (req, res) => {
    const { year, title, mark, mileage, model, description, pictures, price, user_email, phone_number } = req.body
    
    if (!year || !title || !mark || !mileage || !model || !description || !pictures || !price) {
        res.status(400).json({ error: 'All fields must be filled' })
    } else {
        try {
            const car = await Car.create({
                year,
                title,
                mark,
                mileage,
                model,
                description,
                pictures,
                price,
                user_email,
                phone_number
            })
    
            res.status(200).json(car)
    
        } catch (error) {
            res.status(400).json(error.message)
        }
    }
}

// update car

const updateCar = async (req, res) => {
    const { id } = req.params

    const car = await Car.findByIdAndUpdate(id, { ...req.body })

    if (!car) {
        res.status(400).json({ error: 'Car does not exist' })
    } else {
        const newCar = await Car.findById(id)
        res.status(200).json(newCar)
    }

}

const deleteCar = async (req, res) => {
    const { id } = req.params

    const car = await Car.findByIdAndDelete(id)
    
    if (!car) {
        res.status(400).json({ error: 'Car does not exist' })
    }

    res.status(200).json(car)
}



module.exports = { getCars, getCar, createCar, updateCar, deleteCar }