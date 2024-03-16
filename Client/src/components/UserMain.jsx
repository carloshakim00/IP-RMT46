import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import UserProductCard from "./UserProductCard";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../features/product/productSlice";
import { useSelector } from "react-redux";
const UserMain = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.products.list)
    const dispatch = useDispatch()

    const handleOnDetail = (id) => {
        navigate(`/products/productDetail/${id}`)
    }

    useEffect(() => {
        dispatch(fetchUserData())
    },[])

    const products = userData.map((product,index) => {
        return <UserProductCard key={index} id={product.id} name={product.name} price={product.price}
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

export default UserMain