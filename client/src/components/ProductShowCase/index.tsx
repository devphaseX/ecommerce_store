import './style.css';
import { ProductList } from '../ProductList';
import { ProductData } from '../ProductList/type';

type ProductByProperty = Record<
  `${keyof ProductData}:${string}`,
  Array<ProductData>
>;

type ProductShowCaseBaseProps = {
  title: string;
};

interface ProductShowBaseGroupProductProps extends ProductShowCaseBaseProps {
  type: 'property';
  products: ProductByProperty;
}

interface ProductShowBaseAllProductProps extends ProductShowCaseBaseProps {
  type: 'all';
  products: Array<ProductData>;
}

type ProductShowCaseProps =
  | ProductShowBaseGroupProductProps
  | ProductShowBaseAllProductProps;

const ProductShowCase = (props: ProductShowCaseProps) => {
  return (
    <section className="showcase section-block-padding">
      <div className="showcase__container section-width">
        <div className="showcase__row">
          <div>
            <h2 className="section-title showcase-title">{props.title}</h2>
          </div>
          {(() => {
            const productWithKey = (
              props.type === 'all'
                ? [['all', props.products]]
                : Object.entries(props.products)
            ) as ['all' | keyof ProductData, Array<ProductData>][];

            return (
              <div className="showcase__products">
                {productWithKey.map(([key, products]) => (
                  <ProductList key={key} productsData={products} />
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export { ProductShowCase };
export type { ProductShowCaseProps, ProductByProperty };
