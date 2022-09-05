import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type initialStateType = {
    user: any,
    status: 'loading' | 'authorized' | 'unauthorized' | 'error'
}


const initialState: initialStateType = {
    user: {},
    status: 'unauthorized'
}
 

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: any) => {
            return { 
                ...state,
                user: action.payload 
            }
        },
        setStatus: (state, action: any) => {
            return {
                ...state,
                status: action.payload
            }
        }
    }
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions