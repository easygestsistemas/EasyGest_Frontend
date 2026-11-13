
import { Link, Outlet } from 'react-router-dom'
import './PublicLayout.css'
import logotipo from '../../../img/logotipo.png'

export default function PublicLayout() {
  return (
    <div className="public-layout">
      <header className="public-header">
        <Link to="/" className="public-logo">
          <img src={logotipo} alt="" />
          <span>EasyGest</span>
        </Link>

        <nav className="public-nav">
          <Link to="/">Início</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/funcionalidades">Funcionalidades</Link>
          <Link to="/planos">Planos</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <Link to="/app" className="public-login-button">
          Acessar sistema
        </Link>
      </header>

      <div className="public-content">
        <Outlet />
      </div>

      <footer className="public-footer">
        <p>© {new Date().getFullYear()} EasyGest. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
