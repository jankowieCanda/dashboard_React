import '../App.scss'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/header_Components/Header'
import { Pictures_Section } from '../components/pictures_components/Pictures_Section'
import { Footer } from '../components/footer_Components/Footer'

function App() {

  return (
    <>
      <Header />
      <NavBar />
      <Pictures_Section />
      <Footer />
    </>
  )
}

export default App
