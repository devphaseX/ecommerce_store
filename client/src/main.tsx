import ReactDOM from 'react-dom/client';
import App from './App';
import { globalStore } from './store/setup';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={globalStore}>
    <App />
  </Provider>
);
