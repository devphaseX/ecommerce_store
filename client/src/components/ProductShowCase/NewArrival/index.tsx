import { useMemo, useRef, useState } from 'react';
import { ProductShowCase } from '..';
import products from '../../../assets/data/products';
import { ProductData } from '../../ProductList/type';
import type { ProductByProperty } from '../index';
import { useGetNewArrivalProductQuery } from '../../../store/api/product';

const NewArrival = () => {
  const { data, isLoading } = useGetNewArrivalProductQuery({ limit: 12 });
  console.log(data);
  return (
    <ProductShowCase
      isLoading={isLoading}
      title="New Arrivals"
      type="all"
      products={data}
    />
  );
};

export { NewArrival };
