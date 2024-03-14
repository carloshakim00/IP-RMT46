import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
export default function UserCart() {
    const [cartItems, setCartItems] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const {id} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userData = await axios.get(`https://medshop.carloshakim.online/cart}`)
                console.log(userData);
                setCartItems(userData.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    })
    return (
        <>
        </>
    )
}
