import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '@/api/store'
import App from '@/App'
import '@/styles.scss'
import 'semantic-ui-css/semantic.css'
import { loadFonts } from '@/assets/fonts'



try {
  loadFonts(Object.values(import.meta.glob('./assets/fonts/*.ttf', { eager: true, as: 'url' })))
} catch (e) {
  console.error(e)
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
