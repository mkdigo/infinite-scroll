import './styles.css';
import Logo from '../../assets/pokemon_logo.svg';

export function Header() {
  return (
    <header className='container'>
      <div className='content'>
        <img src={Logo} alt='Logo' />
      </div>
    </header>
  );
}
