import './style.css';
import { ProductList } from '../ProductList';
import { ProductData } from '../ProductList/type';
import { ShowCaseProductData } from '../../store/api/product';

type ProductByProperty = Record<
  `${keyof ProductData}:${string}`,
  Array<ProductData>
>;

type ProductShowCaseBaseProps = {
  title: string;
  isLoading: boolean;
};

interface ProductShowBaseGroupProductProps extends ProductShowCaseBaseProps {
  type: 'property';
  products: ProductByProperty;
}

interface ProductShowBaseAllProductProps extends ProductShowCaseBaseProps {
  type: 'all';
  products: Array<ShowCaseProductData> | undefined;
}

type ProductShowCaseProps =
  | ProductShowBaseGroupProductProps
  | ProductShowBaseAllProductProps;

const ProductShowCase = (props: ProductShowCaseProps) => {
  return (
    <section className="showcase section-block-padding">
      <div className="showcase__container section-width">
        <div className="showcase__row">
          {props.title.trim() !== '' && (
            <div>
              <h2 className="section-title showcase-title">{props.title}</h2>
            </div>
          )}
          {(() => {
            if (props.isLoading) return <div>Loading...</div>;
            if (props.products) {
              const productWithKey = (
                props.type === 'all'
                  ? [['all', props.products]]
                  : Object.entries(props.products)
              ) as [
                'all' | keyof ShowCaseProductData,
                Array<ShowCaseProductData>
              ][];

              return (
                <div className="showcase__products">
                  {productWithKey.map(([key, products]) => (
                    <ProductList key={key} productsData={products} />
                  ))}
                </div>
              );
            }
          })()}
        </div>
      </div>
    </section>
  );
};

export { ProductShowCase };
export type { ProductShowCaseProps, ProductByProperty };
