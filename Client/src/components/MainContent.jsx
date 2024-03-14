import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import serverRequest from "../utils/axios";
import ProductCard from "./ProductCard";



const Main = () => {
    // const navigate = useNavigate();
    const [pubData, setPubData] = useState([])
    const fetchPubData = async () => {
        try {
            let {data} = await serverRequest({
                url: `/public/products`,
                method: "GET"
            })
            setPubData(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPubData()
    },[])

    const products = pubData.map((product,index) => {
        return <ProductCard key={index} name={product.name} price={product.price}
        imageUrl={product.imageUrl} description={product.description} usage={product.usage}
        updatedAt={product.updatedAt} />
    })
    return (
        <>
        <section className="container-fluid d flex">
            <section className="col-md-1 ms-sm-auto col-lg-10 px-md-4" id="">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products}
                </div>
            </section>
        </section>
        </>
    )
}

export default Main