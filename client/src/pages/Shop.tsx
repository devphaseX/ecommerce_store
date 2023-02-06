import { CommonSection } from '../components/ui/CommonSection';
import { Helmet } from '../components/Helmet';
import { useState } from 'react';
import '../style/shop.css';
import {
  CategoryEntry,
  ProductQuery,
  useGetAllProductQuery,
} from '../store/api/product';
import { useEffect } from 'react';
import { ProductShowCase } from '../components/ProductShowCase';

const Shop = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [categoryTypes, setCategoryTypes] = useState<null | ProductQuery>(null);
  const [productQuery, setProductQuery] = useState<ProductQuery>({});
  const { data, isLoading } = useGetAllProductQuery(productQuery ?? {});

  useEffect(() => {
    setCategoryTypes(null);
  }, []);

  return (
    <Helmet pageTitle="shop">
      <CommonSection title="Products" />
      <section className="section-width">
        <div className="shop__row">
          <div className="filter__widget">
            <select
              onMouseDown={
                () =>
                  fetch(`${import.meta.env.VITE_BACKEND_URL}product/category`)
                    .then((res) => {
                      if (res.status <= 400) {
                        return res.json();
                      }

                      throw res.json();
                    })
                    .then(({ data }) => setCategoryTypes(data))
                    .catch(() => {}) // ignore error
              }
              onChange={({ target }) => {
                if (target.value !== '$placeholder') {
                  setProductQuery({
                    ...productQuery,
                    category: target.value as ProductQuery['order'],
                  });
                } else if (target.value === '$placeholder') {
                  const { category: _, ...restQuery } = productQuery ?? {};
                  setProductQuery({ ...restQuery });
                }
              }}
              name="category"
            >
              <option value="$placeholder">Filter by category</option>
              {(() => {
                if (categoryTypes) {
                  return (
                    Object.entries(categoryTypes) as Array<
                      [CategoryEntry, CategoryEntry]
                    >
                  ).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ));
                }
              })()}
            </select>
          </div>
          <div className="sort__widget">
            <select
              onChange={({ target }) => {
                if (target.value !== '$placeholder') {
                  setProductQuery({
                    ...productQuery,
                    order: target.value as ProductQuery['order'],
                  });
                } else if (target.value === '$placeholder') {
                  const { category: _, ...restQuery } = productQuery ?? {};
                  setProductQuery({ ...restQuery });
                }
              }}
            >
              <option value="$placeholder">Sort By</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
          <div className="search__box">
            <input
              type="text"
              placeholder="Search......."
              onChange={({ target }) => {
                setSearchProduct(target.value);
              }}
            />
            <span
              onClick={() => {
                if (searchProduct) {
                  setProductQuery({ ...productQuery, search: searchProduct });
                }
              }}
            >
              <i className="ri-search-line"></i>
            </span>
          </div>
        </div>
      </section>
      <ProductShowCase
        isLoading={isLoading}
        products={data}
        type="all"
        title=""
      />
    </Helmet>
  );
};

export { Shop };
