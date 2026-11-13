
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO/SEO'
import './Sobre.css'

export default function Sobre() {
  return (
    <>
      <SEO
        title="Sobre o EasyGest"
        description="Conheça a história, a proposta e os objetivos do EasyGest, uma plataforma de gestão empresarial desenvolvida para centralizar informações e organizar processos."
        path="/sobre"
      />

      <main className="sobre-page">
        <section className="sobre-hero">
          <span>CONHEÇA O EASYGEST</span>

          <h1>Gestão simplificada para o seu negócio.</h1>

          <p>
            O EasyGest é uma plataforma de gestão empresarial
            desenvolvida para centralizar informações, organizar
            processos e facilitar o acompanhamento das atividades
            de uma empresa.
          </p>
        </section>

        <section className="sobre-content">
          <div className="sobre-container">
            <h2>Como surgiu o EasyGest?</h2>

            <p>
              O EasyGest nasceu como um projeto acadêmico,
              com o propósito de aplicar conhecimentos de
              desenvolvimento de software na construção de
              uma solução de gestão empresarial.
            </p>

            <p>
              A plataforma reúne diferentes funcionalidades
              em um único ambiente, permitindo gerenciar
              informações relacionadas a clientes, produtos,
              estoque, fornecedores, recursos humanos e
              outras áreas do negócio.
            </p>
          </div>
        </section>

        <section className="sobre-proposta">
          <div className="sobre-proposta-container">
            <div className="sobre-proposta-heading">
              <span>NOSSA PROPOSTA</span>
              <h2>Mais controle, organização e praticidade.</h2>
              <p>
                O EasyGest busca tornar a gestão empresarial mais
                simples por meio da centralização de informações
                e da integração de diferentes áreas da empresa.
              </p>
            </div>

            <div className="sobre-proposta-grid">
              <article className="sobre-proposta-card">
                <h3>Centralização</h3>
                <p>
                  Reunir informações importantes em um único
                  ambiente, facilitando o acesso aos dados.
                </p>
              </article>

              <article className="sobre-proposta-card">
                <h3>Organização</h3>
                <p>
                  Estruturar processos e informações para
                  facilitar as atividades do dia a dia.
                </p>
              </article>

              <article className="sobre-proposta-card">
                <h3>Integração</h3>
                <p>
                  Conectar diferentes áreas da gestão em
                  uma plataforma única.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="sobre-futuro">
          <div className="sobre-futuro-container">
            <div className="sobre-futuro-text">
              <span>OLHANDO PARA O FUTURO</span>

              <h2>Uma plataforma em constante evolução.</h2>

              <p>
                O EasyGest foi concebido como um projeto em evolução,
                com possibilidades de expansão e aprimoramento de
                suas funcionalidades.
              </p>

              <p>
                A proposta é continuar explorando tecnologias e
                soluções que contribuam para uma gestão empresarial
                cada vez mais integrada, acessível e eficiente.
              </p>

              <Link to="/funcionalidades" className="sobre-futuro-link">
                Conheça as funcionalidades →
              </Link>
            </div>

            <div className="sobre-futuro-highlight">
              <div className="sobre-futuro-symbol">EG</div>
              <h3>Gestão conectada.</h3>
              <p>
                Diferentes áreas, informações e processos
                reunidos em um só lugar.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
