import { useEffect} from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector , useDispatch} from "react-redux";
import { fetchPubData } from "../features/product/productSlice";
import { useState } from "react";
const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pubData = useSelector((state) => state.products.list)
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");

    const handleOnDetail = (id) => {
        navigate(`/publicDetail/${id}`)
    }

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        dispatch(fetchPubData(searchParams.get("search") || ""));
    },[searchParams])

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