const express = require('express')
const router = express.Router()

const { getCars, getCar, createCar, updateCar, deleteCar } = require('../controllers/carController')
const requireAuth = require('../middleware/requireAuth')

// get cars

router.get('/', getCars)

// get a single car

router.get('/:id', getCar)

// using middleware

router.use(requireAuth)

// create car

router.post('/', createCar)

// update car

router.patch('/:id', updateCar)

// delete car

router.delete('/:id', deleteCar)


module.exports = router