import { Helmet } from '../components/Helmet';
import { Heroes } from '../components/Heroes';
import { Service } from '../components/Service';
import { Trend } from '../components/ProductShowCase/Trend';
import { BestSales } from '../components/ProductShowCase/BestSales';
import { NewArrival } from '../components/ProductShowCase/NewArrival';
import { PopularProducts } from '../components/ProductShowCase/Popular';
import { Offer } from '../components/Offer';
const Home = () => {
  return (
    <Helmet pageTitle="Multimart - Home">
      <Heroes />
      <Service />
      <Trend />
      <BestSales />
      <Offer />
      <NewArrival />
      <PopularProducts />
    </Helmet>
  );
};

export { Home };
