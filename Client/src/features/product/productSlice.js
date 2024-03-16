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
import { errorAlert } from "../../utils/sweetAlert"
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
            errorAlert(error.response?.data?.message || error.message);
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
            errorAlert(error.response?.data?.message || error.message);
        }
    }
}

export default productSlice.reducer