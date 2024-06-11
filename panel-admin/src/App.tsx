
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes'
import { ToastContainer } from 'react-toastify'
function App() {
  const route = useRoutes(routes)
  return (
    <>
      {route}
      <ToastContainer autoClose={1500} />
    </>
  )
}

export default App
