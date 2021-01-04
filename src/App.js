import { BrowserRouter as Router } from 'react-router-dom'
import './styles/globalStyle.css'

import Header from './components/Header'
import Routes from './Routes'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router basename="pokemon">
      <Header />
      <Routes />
      <Footer />
    </Router>
  )
}

export default App
