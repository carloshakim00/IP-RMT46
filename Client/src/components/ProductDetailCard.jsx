import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import serverRequest from "../utils/axios";

export default function ProductDetail() {
    const [data, setData] = useState([]);
    let {id} = useParams();
    console.log(id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let { pubData } = await serverRequest({
                    url: `/public/products/${id}`,
                    method: "GET",
                })
                console.log(pubData);
                setData(pubData)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src={data.imageUrl} className="w-full h-48 object-cover" alt="Product" />
                <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">{data.name}</h5>
                    <p className="text-gray-900 font-bold mb-2">{data.price}</p>
                    <p className="text-gray-800 mb-2">{data.usage}</p>
                    <p className="text-gray-800 mb-2">{data.description}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                    </button>
                </div>
                <div className="bg-gray-100 p-4">
                    <small className="text-gray-500">Last updated {data.updatedAt}</small>
                </div>
            </div>
        </div>
    );
}
