import { useEffect} from "react"
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector , useDispatch} from "react-redux";
import { fetchPubData } from "../features/product/productSlice";
import { useState } from "react";
const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pubData = useSelector((state) => state.products.list)
    const [search, setSearch] = useState("")
    const handleOnDetail = (id) => {
        navigate(`/publicDetail/${id}`)
    }

    useEffect(() => {
        let url = "/public/products?"
    
        if (search) {
         url += `search=${search}`
        }
        dispatch(fetchPubData())
    },[search])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const products = pubData.map((product,index) => {
        return <ProductCard key={index} name={product.name} price={product.price}
        imageUrl={product.imageUrl} description={product.description} usage={product.usage}
        updatedAt={product.updatedAt} handleOnDetail={() => handleOnDetail(product.id)}/>
    })
    return (
        <>
       <section className="container-fluid d-flex justify-content-center">
            <section className="col-md-1 ms-sm-auto col-lg-10 px-md-4 mx-auto" id="">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products}
                </div>
            </section>
        </section>


        </>
    )
}

export default Main