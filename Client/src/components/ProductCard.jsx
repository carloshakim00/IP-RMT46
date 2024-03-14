import Button from "./Button"

const ProductCard = ({ name, price, imageUrl, description, usage , updatedAt}) => {
    return (
        <div className="col ml-auto">
        <div className="card h-100">
        <img src={imageUrl} className="card-img-top" alt="imgUrl" />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{price}</p>
        </div>
            <div className="card-body">
                <Button 
                name={"Jobs Detail"} 
                buttonClass={"btn btn-primary"} 
                buttonType={"submit"} 
                // onClick={handleOnDetail}
                >   
                </Button>
            </div>
            <div className="card-footer">
                <small className="text-muted">Last updated {updatedAt}</small>
            </div>
        </div>
        </div>
    )
}

export default ProductCard;