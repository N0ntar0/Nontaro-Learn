import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from './route'
import AppHeader from './componets/AppHeader'

function App() {
  return (
    <>
      <AppHeader/>
      {useRoutes(routes)}
    </>
  )
}

export default App
