import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { set } from "../../../Server/app";

export default function UserAddCart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState({
        id: "",
        name: "",
        price: "",
        imageUrl: "",
        description: "",
        usage: "",
        updatedAt: "",
});

    const onHandleAddCart = async (e,userId,productId) => {
        e.preventDefault();
        try {
            const cart = { userId, productId };

            let data = await axios.post("https://medshop.carloshakim.online/cart", cart, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCart(data.data);
            navigate("/cart");
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeAddCart = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setCart({ ...cart, [key]: value });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Add Item to Cart</h1>
            <form 
            onSubmit={onHandleAddCart(null,localStorage.getItem("userId"),cart.id)} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg font-semibold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={cart.name}
                        onChange={onChangeAddCart}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-lg font-semibold mb-2">
                        Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={cart.price}
                        onChange={onChangeAddCart}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-lg font-semibold mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={cart.imageUrl}
                        onChange={onChangeAddCart}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg font-semibold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={cart.description}
                        onChange={onChangeAddCart}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md"
                        rows="4"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="usage" className="block text-lg font-semibold mb-2">
                        Usage
                    </label>
                    <textarea
                        id="usage"
                        name="usage"
                        value={cart.usage}
                        onChange={onChangeAddCart}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Add to Cart
                </button>
            </form>
        </div>
    );
}
