import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { errorAlert } from "../utils/sweetAlert";
import {toRupiah} from "../helpers/format"
// eslint-disable-next-line react/prop-types
const UserProductCard = ({ id, name, price, imageUrl, updatedAt, handleOnDetail }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        handleOnDetail(id);
    };
    
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchUserProductCard = async () => {
            try {
                let response = await axios.get(`https://medshop.carloshakim.online/products`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                errorAlert(error.response?.data?.message || error.message);
            }
        };
        fetchUserProductCard();
    }, []);

    
    const handleAddCoin = async (id) => {
        try {
        
            let response = await axios.post(
                `https://medshop.carloshakim.online/cart`,
                { productId: id, userId: localStorage.getItem("userId") },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response);
            navigate("/products/myCart");
        } catch (error) {
            errorAlert(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                    src={imageUrl}
                    className="w-full h-48 object-cover cursor-pointer"
                    alt="Product"
                    onClick={handleClick}
                />
                <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2 text-center">{name}</h5>
                    <p className="text-gray-900 font-bold mb-4 text-center">{toRupiah(price)}</p>
                    <div className="flex justify-center">
                        <Button
                            name={"Add to Cart"}
                            buttonClass="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                            buttonType={"submit"}
                            onClick={() => handleAddCoin(id)}
                    
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="bg-gray-100 p-4">
                    <small className="text-gray-500">Last updated {updatedAt}</small>
                </div>
            </div>
        </div>
    );
};

export default UserProductCard;
