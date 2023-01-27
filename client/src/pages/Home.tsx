import { Helmet } from '../components/Helmet';
import { Heroes } from '../components/Heroes';
import { Service } from '../components/Service';
import { Trend } from '../components/Trend';

const Home = () => {
  return (
    <Helmet pageTitle="Multimart - Home">
      <Heroes />
      <Service />
      <Trend />
    </Helmet>
  );
};

export { Home };
