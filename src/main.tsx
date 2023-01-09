import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './api/store';
import App from './App';
import './styles.scss';
import 'semantic-ui-css/semantic.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
