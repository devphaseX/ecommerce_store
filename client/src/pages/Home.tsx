import { Helmet } from '../components/Helmet';
import { Heroes } from '../components/Heroes';
import { Service } from '../components/Service';
import { Trend } from '../components/ProductShowCase/Trend';
import { BestSales } from '../components/ProductShowCase/BestSales';
import { Offer } from '../components/Offer';
const Home = () => {
  return (
    <Helmet pageTitle="Multimart - Home">
      <Heroes />
      <Service />
      <Trend />
      <BestSales />
      <Offer />
    </Helmet>
  );
};

export { Home };
