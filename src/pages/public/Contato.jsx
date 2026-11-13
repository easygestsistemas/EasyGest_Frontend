
import { Link } from 'react-router-dom'
import {
  faEnvelope,
  faMessage
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SEO from '../../components/SEO/SEO'
import './Contato.css'

export default function Contato() {
  return (
    <>
      <SEO
        title="Contato | Fale com o EasyGest"
        description="Entre em contato com o EasyGest para tirar dúvidas, conhecer a plataforma e saber mais sobre nossas soluções de gestão empresarial."
        path="/contato"
      />

      <main className="contato-page">
        <section className="contato-hero">
          <span>FALE CONOSCO</span>
          <h1>Estamos aqui para ajudar.</h1>
          <p>
            Tem dúvidas ou deseja conhecer melhor o EasyGest?
            Entre em contato conosco.
          </p>
        </section>

        <section className="contato-content">
          <div className="contato-info">
            <div className="contato-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>

            <h2>Entre em contato por e-mail</h2>

            <p>
              Envie sua mensagem para nossa equipe.
              Será um prazer conversar com você!
            </p>

            <a href="mailto:easygestsistemas@gmail.com">
              easygestsistemas@gmail.com
            </a>
          </div>

          <div className="contato-card">
            <FontAwesomeIcon icon={faMessage} />

            <h3>Quer conhecer a plataforma?</h3>

            <p>
              Explore os módulos e conheça as possibilidades
              de gestão oferecidas pelo EasyGest.
            </p>

            <Link to="/funcionalidades">
              Conhecer funcionalidades →
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
