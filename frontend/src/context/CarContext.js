import { createContext, useReducer } from 'react'

export const CarContext = createContext()


const carReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CARS': 
            return {
            cars: action.payload
        }
        case 'ADD_CAR': 
            return {
                cars: [...state.cars, action.payload]
            }
        default:
            return state
    }
}





export const CarContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(carReducer, { cars: [] })

    return (
        <CarContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CarContext.Provider>
    )
}