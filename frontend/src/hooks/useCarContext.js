import { useContext } from 'react'

import { CarContext } from '../context/CarContext'


export const useCarContext = () => {
    const context = useContext(CarContext)


    if (!context) {
        throw Error('useCarContext must be used inside CarContextProvider')
    }

    return context
}