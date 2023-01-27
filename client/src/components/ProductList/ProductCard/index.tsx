import React from 'react';
import './style.css';
type ProductData =
  typeof import('../../../assets/data/products').default[number];

type ProductCardProps = {
  data: ProductData;
};
const ProductCard = ({ data }: ProductCardProps) => {
  const { imgUrl, productName, category, price } = data;
  return (
    <div className="product__item">
      <div className="product__img">
        <img
          src={imgUrl}
          alt={`image for the product with the name ${productName}`}
        />
        <h3>{productName}</h3>
        <span>{category}</span>
        <div className="product__card-bottom">
          <span className="price">{price}</span>
          <span>
            <i className="ri-add-line"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
