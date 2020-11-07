import './styles.css'
import Logo from '../../assets/pokemon_logo.svg'

export default function Header() {
  return (
    <header className="container">
      <div className="content">
        <img src={Logo} alt="Logo"/>
        
        {/* <nav className="header-nav">
          Header nav
        </nav> */}
      </div>
    </header>
  )
}
