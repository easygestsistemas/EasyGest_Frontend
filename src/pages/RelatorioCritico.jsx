import { useEffect, useState } from 'react'
import { PageHeader, Card, KPICard, Badge, Table } from '../components/Common'
import { apiJson } from '../utils/api'
import './Pages.css'

export default function RelatorioCritico() {
  const [estoqueCritico, setEstoqueCritico] = useState([])

  useEffect(() => {
    const carregarEstoqueCritico = async () => {
      try {
        const produtos = await apiJson('/produtos')
        const dados = (produtos || [])
          .map(produto => {
            const estoque = Number(produto.quantidadeAtual || 0)
            const minimo = Number(produto.estoqueMinimo || 0)
            return {
              sku: produto.codProduto,
              produto: produto.nomeProduto,
              estoque,
              minimo,
              status: estoque <= minimo ? 'Crítico' : estoque <= minimo * 1.2 ? 'Alerta' : null
            }
          })
          .filter(item => item.status)

        setEstoqueCritico(dados)
      } catch (error) {
        console.error('Erro ao carregar estoque crítico:', error)
        setEstoqueCritico([])
      }
    }

    carregarEstoqueCritico()
  }, [])

  const criticCount = estoqueCritico.filter(e => e.status === 'Crítico').length
  const alertCount = estoqueCritico.filter(e => e.status === 'Alerta').length

  const columns = [
    { key: 'sku', label: 'SKU' },
    { key: 'produto', label: 'Produto' },
    { key: 'estoque', label: 'Estoque Atual' },
    { key: 'minimo', label: 'Estoque Mínimo' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const statusColor = row.status === 'Crítico' ? 'danger' : row.status === 'Alerta' ? 'warning' : 'success'
        return <Badge status={statusColor}>{row.status}</Badge>
      }
    }
  ]

  return (
    <div className="page">
      <PageHeader title="Relatório de Estoque Crítico" subtitle="Produtos abaixo do estoque mínimo" />

      <div className="kpi-grid">
        <KPICard title="Itens Críticos" value={criticCount} icon="🚨" />
        <KPICard title="Itens em Alerta" value={alertCount} icon="⚠️" />
        <KPICard title="Total de Itens" value={estoqueCritico.length} icon="📦" />
      </div>

      <Card>
        <Table columns={columns} data={estoqueCritico} />
      </Card>
    </div>
  )
}
