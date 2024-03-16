import { useEffect} from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
// import { useSelector , useDispatch} from "react-redux";
// import { fetchPubData } from "../features/product/productSlice";
import { useState } from "react";
import { errorAlert } from "../utils/sweetAlert";
// import serverRequest from "../utils/axios"
import Pagination from "./Pagination";
import axios from "../utils/axios";
import Search from "./Search";

const Main = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const pubData = useSelector((state) => state.products.list)
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("")
    const [paginationOption, setPaginationOption] = useState({
        currentPage: 1, total: 0, totalPage: 0 
    })
    const [searchParams, setSearchParams] = useSearchParams()


    const handleOnDetail = (id) => {
        navigate(`/publicDetail/${id}`)
    }

    useEffect(() => {
    const  fetchProducts =  async (pageNumber = 1) => {
        let url = `/public/products?page=${pageNumber}`
        
        if(search){
            url += `&search=${search}`
        }
        
        try {
                    let {data} = await axios({
                        url: url,
                        method: "GET",
                    })
                    const {currentPage, total, totalPage, data:product} = data;
                    setProducts(product)
                    setPaginationOption({currentPage, total, totalPage})
                } catch (error) {
                    errorAlert(error.response?.data?.message || error.message);
                }
        }
        fetchProducts(searchParams.get("page[number]") || 1)
    },[searchParams.get("page[number]"),search])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const productss = products.map((product,index) => {
        return <ProductCard key={index} name={product.name} price={product.price}
        imageUrl={product.imageUrl} description={product.description} usage={product.usage}
        updatedAt={product.updatedAt} handleOnDetail={() => handleOnDetail(product.id)}/>
    })
    return (
        <>
        <div className="container d-grid">

        <div className="container">
            <Search search={search} handleSearch={handleSearch} />
        </div>
       <section className="container-fluid d-flex justify-content-center">
            <section className="col-md-1 ms-sm-auto col-lg-10 px-md-4 mx-auto" id="">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {productss}
                </div>
            </section>
        </section>

        <Pagination paginationOption={paginationOption} />
        </div>
        </>
    )
}

export default Main