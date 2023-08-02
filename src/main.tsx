import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GetAuthPage from './pages/GetAuth/GetAuthPage.tsx'
import CallbackPage from './pages/Callback/CallbackPage.tsx'
import App from './App.tsx'
import './index.css'
import DuplicatesPage from './pages/DuplicatesPage/DuplicatesPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GetAuthPage />
  },
  {
    path: '/callback',
    element: <CallbackPage />
  },
  {
    path: '/playlists',
    element: <App />
  },
  {
    path: '/playlist/:id',
    element: <DuplicatesPage />
  },
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)

postMessage({ payload: 'removeLoading' }, '*')
