import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './api/store'
import App from './App'
import './styles.scss'
import 'semantic-ui-css/semantic.css'

import { loadFonts, fonts } from './api/lib'

loadFonts(fonts)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
