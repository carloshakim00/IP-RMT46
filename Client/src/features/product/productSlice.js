import { createSlice } from "@reduxjs/toolkit";
import serverRequest from "../../utils/axios";
import { errorAlert } from "../../utils/sweetAlert";

const initialState = {
    list: [],
    paginationOption: {
        currentPage: 1,
        total: 0,
        totalPage: 0
    },
    search: ''
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.list = action.payload;
        },
        setPaginationOption: (state, action) => {
            state.paginationOption = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
});

export const { setProducts, setPaginationOption, setSearch } = productSlice.actions;

export const fetchPubData = () => {
    return async (dispatch) => {
        try {
            let { data } = await serverRequest({
                url: `/public/products`,
                method: "GET",
            });
            dispatch(setProducts(data.data));
            dispatch(setPaginationOption({
                currentPage: data.currentPage,
                total: data.total,
                totalPage: data.totalPage
            }));
        } catch (error) {
            errorAlert(error.response?.data?.message || error.message);
        }
    };
};

export const fetchUserData = () => {
    return async (dispatch) => {
        try {
            let { data } = await serverRequest({
                url: `/products`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(setProducts(data.data));
            dispatch(setPaginationOption({
                currentPage: data.currentPage,
                total: data.total,
                totalPage: data.totalPage
            }));
        } catch (error) {
            errorAlert(error.response?.data?.message || error.message);
        }
    };
};

export default productSlice.reducer;
