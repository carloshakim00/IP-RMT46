import { Link } from "react-router-dom";
import Button from "./Button";

const ProductCard = ({ id, name, price, imageUrl, description, usage, updatedAt, handleOnDetail }) => {
  const handleClick = () => {
    handleOnDetail(id);
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <Link to={`/publicDetail/${id}`}>
          <img
            src={imageUrl}
            className="w-full h-48 object-cover cursor-pointer"
            alt="Product"
            onClick={handleClick}
          />
        </Link>
        <div className="p-4">
          <h5 className="text-lg font-semibold mb-2">{name}</h5>
          <p className="text-gray-900 font-bold mb-2">{price}</p>
          <Button 
            name={"Add to Cart"}
            buttonClass="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
            buttonType={"submit"}
          >
            Add to Cart
          </Button>
        </div>
        <div className="bg-gray-100 p-4">
          <small className="text-gray-500">Last updated {updatedAt}</small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
