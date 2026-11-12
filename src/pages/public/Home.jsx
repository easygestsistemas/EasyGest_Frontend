
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faBoxesStacked,
  faMoneyBillWave,
  faHandshake,
  faUserTie,
  faChartColumn
} from '@fortawesome/free-solid-svg-icons'
import './Home.css'

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-eyebrow">
            Plataforma de gestão empresarial
          </span>

          <h1>
            Simplifique a gestão.
            <br />
            Impulsione seu negócio.
          </h1>

          <p>
            O EasyGest reúne ferramentas para organizar processos,
            acompanhar resultados e facilitar a administração
            do seu negócio em um só lugar.
          </p>

          <div className="home-actions">
            <Link to="/app" className="home-primary-button">
              Acessar sistema
            </Link>

            <Link to="/funcionalidades" className="home-secondary-button">
              Conheça as funcionalidades
            </Link>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-section-heading">
          <span>RECURSOS DO EASYGEST</span>
          <h2>Gestão completa em um só lugar</h2>
          <p>
            Organize diferentes áreas da sua empresa por meio de
            ferramentas integradas em uma única plataforma.
          </p>
        </div>

        <div className="home-features-grid">
          <article className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3>Clientes</h3>
            <p>Organize informações e cadastros dos seus clientes.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faBoxesStacked} />
            </div>
            <h3>Produtos e Estoque</h3>
            <p>Gerencie produtos e acompanhe o controle de estoque.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </div>
            <h3>Financeiro</h3>
            <p>Centralize informações financeiras da empresa.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <h3>Fornecedores</h3>
            <p>Organize os cadastros e informações dos fornecedores.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faUserTie} />
            </div>
            <h3>Recursos Humanos</h3>
            <p>Gerencie informações relacionadas à equipe.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faChartColumn} />
            </div>
            <h3>Relatórios</h3>
            <p>Acompanhe informações e indicadores do negócio.</p>
          </article>
        </div>
      </section>

<section className="home-benefits">
  <div className="home-benefits-content">
    <div className="home-benefits-heading">
      <span>POR QUE EASYGEST?</span>
      <h2>Mais organização para você focar no que realmente importa.</h2>
      <p>
        Simplifique processos, centralize informações e tenha
        uma visão mais organizada das atividades da sua empresa.
      </p>

      <Link to="/sobre" className="home-benefits-link">
        Conheça o EasyGest →
      </Link>
    </div>

    <div className="home-benefits-list">
      <article className="benefit-item">
        <div className="benefit-number">01</div>
        <div>
          <h3>Informações centralizadas</h3>
          <p>
            Reúna dados importantes da empresa em uma única plataforma.
          </p>
        </div>
      </article>

      <article className="benefit-item">
        <div className="benefit-number">02</div>
        <div>
          <h3>Processos organizados</h3>
          <p>
            Facilite o gerenciamento das diferentes áreas do negócio.
          </p>
        </div>
      </article>

      <article className="benefit-item">
        <div className="benefit-number">03</div>
        <div>
          <h3>Visão do negócio</h3>
          <p>
            Utilize relatórios e indicadores para acompanhar resultados.
          </p>
        </div>
      </article>
    </div>
  </div>
</section>

    </div>
  )
}
