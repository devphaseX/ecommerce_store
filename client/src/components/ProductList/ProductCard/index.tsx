import { Link } from 'react-router-dom';
import './style.css';
type ProductData =
  typeof import('../../../assets/data/products').default[number];

type ProductCardProps = {
  data: ProductData;
};
const ProductCard = ({ data }: ProductCardProps) => {
  const { imgUrl, productName, category, price, id } = data;
  return (
    <div className="product__item">
      <div className="product__img">
        <img
          src={imgUrl}
          alt={`image for the product with the name ${productName}`}
        />
      </div>
      <div className="product__info">
        <h3>
          <Link to={`/product/${id}`}>{productName}</Link>
        </h3>
        <span>{category}</span>
      </div>
      <div className="product__card-bottom">
        <span className="price">${price}</span>
        <span className="inc-add-button">
          <i className="ri-add-line"></i>
        </span>
      </div>
    </div>
  );
};

export { ProductCard };
