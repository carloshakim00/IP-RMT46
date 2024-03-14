import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
    const [data, setData] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data } = await axios.get(`https://medshop.carloshakim.online/public/products/${id}`);
                setData(data);
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
