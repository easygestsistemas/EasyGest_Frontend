
import { Link } from 'react-router-dom'
import {
  faBuilding,
  faRocket,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SEO from '../../components/SEO/SEO'
import './Planos.css'

const planos = [
  {
    icon: faBuilding,
    nome: 'Pequenas empresas',
    descricao:
      'Uma proposta para negócios que buscam organizar suas informações e centralizar atividades.',
    recursos: [
      'Cadastro de clientes e produtos',
      'Organização de fornecedores',
      'Controle de estoque'
    ]
  },
  {
    icon: faRocket,
    nome: 'Empresas em crescimento',
    descricao:
      'Uma proposta para empresas que desejam ampliar o controle sobre suas operações.',
    recursos: [
      'Gestão de diferentes áreas',
      'Acompanhamento financeiro',
      'Relatórios e indicadores'
    ],
    destaque: true
  },
  {
    icon: faLayerGroup,
    nome: 'Gestão integrada',
    descricao:
      'Uma proposta para negócios que buscam reunir diferentes processos em um único ambiente.',
    recursos: [
      'Módulos integrados',
      'Informações centralizadas',
      'Visão geral da gestão'
    ]
  }
]

export default function Planos() {
  return (
    <>
      <SEO
        title="Planos de Gestão Empresarial"
        description="Conheça as possibilidades de utilização do EasyGest. Explore recursos de gestão empresarial para organizar clientes, produtos, estoque, fornecedores e processos."
        path="/planos"
      />

      <main className="planos-page">
        <section className="planos-hero">
          <span>PLANOS E POSSIBILIDADES</span>
          <h1>Uma gestão que acompanha o seu negócio.</h1>
          <p>
            Conheça as possibilidades de utilização do EasyGest
            e encontre uma solução alinhada às necessidades
            da sua empresa.
          </p>
        </section>

        <section className="planos-content">
          <div className="planos-heading">
            <h2>Possibilidades para diferentes negócios</h2>
            <p>
              Cada empresa possui necessidades próprias.
              O EasyGest reúne recursos que podem apoiar
              diferentes áreas da gestão empresarial.
            </p>
          </div>

          <div className="planos-grid">
            {planos.map((plano, index) => (
              <article
                className={`plano-card ${plano.destaque ? 'plano-destaque' : ''}`}
                key={index}
              >
                <div className="plano-icon">
                  <FontAwesomeIcon icon={plano.icon} />
                </div>

                <h3>{plano.nome}</h3>
                <p>{plano.descricao}</p>

                <ul>
                  {plano.recursos.map((recurso, i) => (
                    <li key={i}>{recurso}</li>
                  ))}
                </ul>

                <Link to="/app" className="plano-button">
                  Conhecer o sistema
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="planos-cta">
          <h2>Quer conhecer os recursos disponíveis?</h2>
          <p>
            Explore as funcionalidades do EasyGest e conheça
            a proposta da plataforma.
          </p>
          <Link to="/funcionalidades" className="planos-cta-button">
            Ver funcionalidades
          </Link>
        </section>
      </main>
    </>
  )
}
