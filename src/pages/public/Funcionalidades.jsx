
import { Link } from 'react-router-dom'
import {
  faUsers,
  faBox,
  faWarehouse,
  faMoneyBillWave,
  faTruck,
  faUserTie,
  faChartColumn,
  faHandshake
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SEO from '../../components/SEO/SEO'
import './Funcionalidades.css'

const funcionalidades = [
  {
    icon: faUsers,
    title: 'Gestão de Clientes',
    description:
      'Organize os dados dos clientes e facilite o acompanhamento dos relacionamentos comerciais.'
  },
  {
    icon: faBox,
    title: 'Gestão de Produtos',
    description:
      'Cadastre e consulte produtos, mantendo as informações organizadas e acessíveis.'
  },
  {
    icon: faWarehouse,
    title: 'Controle de Estoque',
    description:
      'Acompanhe os produtos disponíveis e tenha mais visibilidade sobre o estoque.'
  },
  {
    icon: faMoneyBillWave,
    title: 'Gestão Financeira',
    description:
      'Centralize informações financeiras para facilitar o acompanhamento do negócio.'
  },
  {
    icon: faTruck,
    title: 'Fornecedores',
    description:
      'Organize os dados dos fornecedores e facilite a consulta de informações comerciais.'
  },
  {
    icon: faUserTie,
    title: 'Recursos Humanos',
    description:
      'Mantenha informações relacionadas aos colaboradores organizadas em um só ambiente.'
  },
  {
    icon: faHandshake,
    title: 'Prestadores de Serviço',
    description:
      'Gerencie os cadastros e informações dos prestadores vinculados à empresa.'
  },
  {
    icon: faChartColumn,
    title: 'Relatórios e Indicadores',
    description:
      'Consulte informações e relatórios para acompanhar diferentes aspectos da gestão.'
  }
]

export default function Funcionalidades() {
  return (
    <>
      <SEO
        title="Funcionalidades e Módulos"
        description="Conheça os recursos do EasyGest: gestão de clientes, produtos, estoque, financeiro, fornecedores, recursos humanos, prestadores de serviço e relatórios."
        path="/funcionalidades"
      />

      <main className="funcionalidades-page">
        <section className="funcionalidades-hero">
          <span>RECURSOS DO EASYGEST</span>
          <h1>Tudo o que sua gestão precisa em um só lugar.</h1>
          <p>
            Conheça os módulos do EasyGest e descubra como
            organizar diferentes áreas da sua empresa em
            uma única plataforma.
          </p>
        </section>

        <section className="funcionalidades-content">
          <div className="funcionalidades-heading">
            <h2>Conheça nossos módulos</h2>
            <p>
              Recursos desenvolvidos para apoiar a organização
              e o acompanhamento das atividades empresariais.
            </p>
          </div>

          <div className="funcionalidades-grid">
            {funcionalidades.map((item, index) => (
              <article className="funcionalidade-card" key={index}>
                <div className="funcionalidade-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="funcionalidades-cta">
          <h2>Quer conhecer o EasyGest na prática?</h2>
          <p>
            Acesse a plataforma e explore os recursos disponíveis.
          </p>
          <Link to="/app" className="funcionalidades-button">
            Acessar o sistema
          </Link>
        </section>
      </main>
    </>
  )
}
