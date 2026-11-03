import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Common'
import './Relatorios.css'

export default function Relatorios() {
  const relatoriosList = [
    {
      id: 1,
      titulo: 'Vendas por Período',
      descricao: 'Análise detalhada das vendas realizadas em um período específico.',
      link: '/relatorio-vendas'
    },
    {
      id: 2,
      titulo: 'Estoque Crítico',
      descricao: 'Lista de produtos com estoque abaixo do mínimo.',
      link: '/relatorio-estoque-critico'
    }
  ]

  return (
    <div className="page">
      <PageHeader title="Relatórios" subtitle="Acessar relatórios e análises" />

      <div className="relatorios-grid">
        {relatoriosList.map(rel => (
          <Link key={rel.id} to={rel.link} className="relatorio-card-link">
            <div className="relatorio-card">
              <div className="relatorio-icon">📊</div>
              <h3>{rel.titulo}</h3>
              <p>{rel.descricao}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
