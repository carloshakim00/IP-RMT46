import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    list: [],
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.list = action.payload
        }
    }
})

import serverRequest from "../../utils/axios"
export const {setProducts} = productSlice.actions

export const fetchPubData =  () => {
    return async (dispatch) => {
        try {
            let {data} = await serverRequest({
                url: `/public/products`,
                method: "GET",
            })
            dispatch(setProducts(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchUserData =  () => {
    return async (dispatch) => {
        try {
            let {data} = await serverRequest({
                url: `/products`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            dispatch(setProducts(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export default productSlice.reducer