import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../main";
export const Product = () => {
  const products = useSelector((state: IRootState) => state.product.product);
  const renderList = products.map((product: any) => {
    const { id, title, price, image, category } = product;
    return (
      <div className="four wide column" key={id}>
        <Link to={`/product/${id}`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={image} alt={title} />
              </div>
              <div className="content">
                <div className="header">{title}</div>
                <div className="meta price">${price}</div>
                <div className="meta">{category}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};
