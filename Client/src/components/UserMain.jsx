import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import UserProductCard from "./UserProductCard";
import { useDispatch } from "react-redux";
import { fetchUserData, setProducts } from "../features/product/productSlice";
import { useSelector } from "react-redux";
import { errorAlert } from "../utils/sweetAlert";
import serverRequest from "../utils/axios"
import Search from "./Search";
import { useState } from "react";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const UserMain = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([]);
    const [paginationOption, setPaginationOption] = useState({
        currentPage: 1, total: 0, totalPage: 0 
    })
    const [searchParams, setSearchParams] = useSearchParams()
    // const userData = useSelector((state) => state.products.list)
    // const dispatch = useDispatch()

    
    useEffect(() => {
        const fetchUserData =  async (pageNumber = 1) => {
            let url = `/products?page[size]=10&page[number]=${pageNumber}`
         
            if(search){
                url += `&search=${search}`
            }
            try {
                let {data} = await axios({
                        url: url,
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        }
                    })
                    const {currentPage, total, totalPage, data:product} = data;
                    setProducts(product)
                    setPaginationOption({currentPage, total, totalPage})
                    // dispatch(setProducts(data))
                } catch (error) {
                    errorAlert(error.response?.data?.message || error.message);
                }

        }
        fetchUserData(searchParams.get("page[number]") || 1)
    },[searchParams.get("page[number]"),search])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleOnDetail = (id) => {
        navigate(`/products/productDetail/${id}`)
    }
    
    const productss = products.map((product,index) => {
        return <UserProductCard key={index} id={product.id} name={product.name} price={product.price}
        imageUrl={product.imageUrl} description={product.description} usage={product.usage}
        updatedAt={product.updatedAt} handleOnDetail={() => handleOnDetail(product.id)}/>
    })
    return (
        <>
        <div className="container">
        <Search search={search} handleSearch={handleSearch}/>
        </div>
       <section className="container-fluid d-flex justify-content-center">
            <section className="col-md-1 ms-sm-auto col-lg-10 px-md-4 mx-auto" id="">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {productss}
                </div>
            </section>
        </section>

        <Pagination paginationOption={paginationOption} />
        </>
    )
}

export default UserMain