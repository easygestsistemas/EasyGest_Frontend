import { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { PageHeader, Card, KPICard, Table } from '../components/Common'
import { apiJson } from '../utils/api'
import { formatCurrency } from '../utils/helpers'
import './Pages.css'

export default function RelatorioVendas() {
  const [period, setPeriod] = useState('7d')
  const [vendasDetalhadas, setVendasDetalhadas] = useState([])

  useEffect(() => {
    const carregarVendas = async () => {
      try {
        const vendas = await apiJson('/vendas')
        const dados = (vendas || []).map(venda => ({
          data: venda.dataVenda || '',
          produto: venda.itens?.[0]?.produto?.nomeProduto || venda.produto?.nomeProduto || 'Venda',
          cliente: venda.cliente?.nomeCliente || 'Sem cliente',
          valor: Number(venda.valorTotal || 0)
        }))
        setVendasDetalhadas(dados)
      } catch (error) {
        console.error('Erro ao carregar relatório de vendas:', error)
        setVendasDetalhadas([])
      }
    }

    carregarVendas()
  }, [])

  const vendasFiltradas = useMemo(() => {
    if (period === 'custom') return vendasDetalhadas

    const hoje = new Date()
    const limite = period === 'today'
      ? new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
      : new Date(hoje.getTime() - (period === '30d' ? 30 : 7) * 24 * 60 * 60 * 1000)

    return vendasDetalhadas.filter(venda => {
      if (!venda.data) return false
      return new Date(venda.data) >= limite
    })
  }, [period, vendasDetalhadas])

  const totalVendas = vendasFiltradas.reduce((sum, v) => sum + v.valor, 0)
  const numeroVendas = vendasFiltradas.length
  const ticketMedio = numeroVendas > 0 ? totalVendas / numeroVendas : 0

  const vendasPorDia = vendasFiltradas.reduce((totais, venda) => {
    const dia = venda.data ? String(venda.data).slice(0, 10) : 'Sem data'
    totais[dia] = (totais[dia] || 0) + venda.valor
    return totais
  }, {})

  const vendasSemanal = Object.entries(vendasPorDia).map(([dia, valor]) => ({ dia, valor }))

  const chartData = {
    labels: vendasSemanal.map(v => v.dia),
    datasets: [{
      label: 'Vendas',
      data: vendasSemanal.map(v => v.valor),
      borderColor: '#8FB3E2',
      backgroundColor: 'rgba(143, 179, 226, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }

  const columns = [
    { key: 'data', label: 'Data' },
    { key: 'produto', label: 'Produto' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'valor', label: 'Valor', render: (row) => formatCurrency(row.valor) }
  ]

  return (
    <div className="page">
      <PageHeader title="Relatório de Vendas" subtitle="Análise de vendas por período" />

      <Card className="toolbar-card">
        <div className="period-selector">
          <button className={period === 'today' ? 'active' : ''} onClick={() => setPeriod('today')}>Hoje</button>
          <button className={period === '7d' ? 'active' : ''} onClick={() => setPeriod('7d')}>7 dias</button>
          <button className={period === '30d' ? 'active' : ''} onClick={() => setPeriod('30d')}>30 dias</button>
          <button className={period === 'custom' ? 'active' : ''} onClick={() => setPeriod('custom')}>Customizado</button>
        </div>
      </Card>

      <div className="kpi-grid">
        <KPICard title="Total de Vendas" value={formatCurrency(totalVendas)} icon="💰" />
        <KPICard title="Número de Vendas" value={numeroVendas} icon="🛒" />
        <KPICard title="Ticket Médio" value={formatCurrency(ticketMedio)} icon="🎫" />
      </div>

      <Card title="Gráfico de Vendas" className="chart-card">
        <Line data={chartData} options={{ responsive: true }} />
      </Card>

      <Card title="Vendas Detalhadas">
        <Table columns={columns} data={vendasFiltradas} />
      </Card>
    </div>
  )
}
