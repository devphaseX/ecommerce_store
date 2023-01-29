import { useMemo, useRef, useState } from 'react';
import { ProductShowCase } from '..';
import products from '../../../assets/data/products';
import { ProductData } from '../../ProductList/type';
import type { ProductByProperty } from '../index';

const NewArrival = () => {
  const newRelease = useRef<ProductByProperty>({
    'category:mobile': products.filter(
      (product) => product.category.toLowerCase() === 'mobile'
    ),
    'category:wireless': products.filter(
      (product) => product.category.toLowerCase() === 'wireless'
    ),
  }).current;

  return (
    <ProductShowCase
      title="New Arrivals"
      type="property"
      products={newRelease}
    />
  );
};

export { NewArrival };
