import { useState, useEffect } from 'react'
import { apiJson } from '../utils/api'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { PageHeader, Card, KPICard, Badge, Table } from '../components/Common'
import { formatCurrency } from '../utils/helpers'
import useAccessibility from '../components/AccessibilityWidget/useAccessibility'
import './Dashboard.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

export default function Dashboard() {
    const { palette } = useAccessibility()
    const [kpis, setKpis] = useState({
    vendasHoje: 0,
    ticketMedio: 0,
    itensVendidos: 0,
    margem: 0,
    variacaoVendas: 0,
    variacaoTicket: 0,
    variacaoItens: 0,
    variacaoMargem: 0
  })

  const [vendasSemanal, setVendasSemanal] = useState([])
  const [movMensal, setMovMensal] = useState([])
  const [estoqueCritico, setEstoqueCritico] = useState([])
  const [vendasRecentes, setVendasRecentes] = useState([])

  const carregarDashboard = async () => {
  try {
    // PRODUTOS
    const produtos = await apiJson('/produtos')

    const estoqueBaixo = produtos.filter(
      produto => Number(produto.quantidadeAtual) < produto.estoqueMinimo
    )

    setEstoqueCritico(
      estoqueBaixo.map(produto => ({
        sku: produto.codProduto,
        produto: produto.nomeProduto,
        estoque: produto.quantidadeAtual,
        minimo: produto.estoqueMinimo,
        status: 'Crítico'
      }))
    )

    // VENDAS
    const vendas = await apiJson('/vendas')

    // ITENS DE VENDA
    const itensVenda = await apiJson('/itens-venda')

    const totalItensVendidos = itensVenda.reduce(
      (total, item) => total + Number(item.quantidade || 0),
      0
    )

    const hoje = new Date().toISOString().split('T')[0]

const vendasDeHoje = vendas.filter(
  venda => venda.dataVenda === hoje
)

const totalVendasHoje = vendasDeHoje.reduce(
  (total, venda) => total + Number(venda.valorTotal || 0),
  0
)

const fluxoPorMes = {}

vendas.forEach(venda => {

  const data = new Date(venda.dataVenda)

  const mes = data.toLocaleString(
    'pt-BR',
    { month: 'short' }
  )

  if (!fluxoPorMes[mes]) {

    fluxoPorMes[mes] = {
      mes: mes,
      in: 0,
      out: 0
    }

  }

  fluxoPorMes[mes].out +=
    Number(venda.valorTotal || 0)

})

setMovMensal(
  Object.values(fluxoPorMes)
)

    const vendasPorDia = {}

    vendas.forEach(venda => {
      const dia = venda.dataVenda

      if (!vendasPorDia[dia]) {
        vendasPorDia[dia] = 0
      }

      vendasPorDia[dia] += Number(venda.valorTotal || 0)
    })

    const semanal = Object.entries(vendasPorDia).map(([dia, valor]) => ({
      dia,
      valor
    }))

    setVendasSemanal(semanal)

    setKpis({
  vendasHoje: totalVendasHoje,

  ticketMedio:
    vendasDeHoje.length > 0
      ? totalVendasHoje / vendasDeHoje.length
      : 0,

  itensVendidos: vendas.length,

  margem: 0,

  variacaoVendas: 0,
  variacaoTicket: 0,
  variacaoItens: 0,
  variacaoMargem: 0
})

    setVendasRecentes(

  vendas

    .sort(
      (a, b) =>
        new Date(b.dataVenda) -
        new Date(a.dataVenda)
    )

    .slice(0, 5)

    .map(venda => ({

      cliente:
        venda.cliente?.nomeCliente ||
        'Sem cliente',

      total:
        venda.valorTotal,

      hora:
        venda.dataVenda

    }))
    )

  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
  }
}



  useEffect(() => {

    carregarDashboard()

  }, [])

  const lineChartData = {
    labels:
      vendasSemanal?.map(
        v => v.dia
      ) || [],

    datasets: [
      {
        label: 'Vendas Diárias',

        data:
          vendasSemanal?.map(
            v => v.valor
          ) || [],

        borderColor: palette.chartPrimaryBorder || palette.chartPrimary,

        backgroundColor: palette.chartPrimaryFill,

        tension: 0.4,

        fill: true
      }
    ]
  }

  const barChartData = {

    labels:
      movMensal?.map(
        m => m.mes
      ) || [],

    datasets: [
      {
        label: 'Entradas',

        data:
          movMensal?.map(
            m => m.in
          ) || [],

        backgroundColor: palette.chartPrimary,
        borderColor: palette.chartPrimaryBorder || palette.chartPrimary,
        borderWidth: 2,
        borderRadius: 3
      },

      {
        label: 'Saídas',

        data:
          movMensal?.map(
            m => m.out
          ) || [],

        backgroundColor: palette.chartSecondary,
        borderColor: palette.chartSecondaryBorder || palette.chartSecondary,
        borderWidth: 2,
        borderRadius: 12
      }
    ]
  }

  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true
        }
      }
    }
  }

  const estoqueColumns = [
    {
      key: 'sku',
      label: 'SKU'
    },

    {
      key: 'produto',
      label: 'Produto'
    },

    {
      key: 'estoque',
      label: 'Estoque'
    },

    {
      key: 'minimo',
      label: 'Mínimo'
    },

    {
      key: 'status',
      label: 'Status',

      render: (row) => {

        const statusColor =
          row.status === 'Crítico'
            ? 'danger'
            : row.status === 'Alerta'
            ? 'warning'
            : 'success'

        return (
          <Badge status={statusColor}>
            {row.status}
          </Badge>
        )
      }
    }
  ]

  const vendasColumns = [
    {
      key: 'cliente',
      label: 'Cliente'
    },

    {
      key: 'total',
      label: 'Total',

      render: (row) =>
        formatCurrency(row.total)
    },

    {
      key: 'hora',
      label: 'Hora'
    }
  ]

  return (

    <div className="dashboard">

      <PageHeader
        title="Dashboard"
        subtitle="Visão geral do seu negócio"
      />

      <div className="kpi-grid">

        <KPICard
          title="Vendas Hoje"
          value={formatCurrency(
            kpis.vendasHoje
          )}
          variation={
            kpis.variacaoVendas
          }
          
        />

        <KPICard
          title="Ticket Médio"
          value={formatCurrency(
            kpis.ticketMedio
          )}
          variation={
            kpis.variacaoTicket
          }
          
        />

        <KPICard
          title="Itens Vendidos"
          value={
            kpis.itensVendidos
          }
          variation={
            kpis.variacaoItens
          }
          
        />

        <KPICard
          title="Margem"
          value={`${kpis.margem}%`}
          variation={
            kpis.variacaoMargem
          }
          
        />

      </div>

      <div className="charts-grid">

        <Card
          title="Vendas Semanal"
          className="chart-card"
        >

          <Line
            data={lineChartData}
            options={chartOptions}
            role="img"
            aria-label="Gráfico de vendas por dia; os dados também podem ser consultados em tabela."
          />
          <details className="chart-data-details">
            <summary>Consultar vendas em tabela</summary>
            <Table
              columns={[
                { key: 'dia', label: 'Dia' },
                { key: 'valor', label: 'Vendas', render: (row) => formatCurrency(row.valor) }
              ]}
              data={vendasSemanal}
            />
          </details>

        </Card>

        <Card
          title="Fluxo Mensal"
          className="chart-card"
        >

          <Bar
            data={barChartData}
            options={chartOptions}
            role="img"
            aria-label="Gráfico mensal de entradas e saídas; os dados também podem ser consultados em tabela."
          />
          <details className="chart-data-details">
            <summary>Consultar entradas e saídas em tabela</summary>
            <Table
              columns={[
                { key: 'mes', label: 'Mês' },
                { key: 'in', label: 'Entradas', render: (row) => formatCurrency(row.in) },
                { key: 'out', label: 'Saídas', render: (row) => formatCurrency(row.out) }
              ]}
              data={movMensal}
            />
          </details>

        </Card>

      </div>

      <div className="tables-grid">

        <Card title="Estoque Crítico">

          <Table
            columns={estoqueColumns}
            data={estoqueCritico}
          />

        </Card>

        <Card title="Vendas Recentes">

          <Table
            columns={vendasColumns}
            data={vendasRecentes}
          />

        </Card>

      </div>

    </div>

  )
}
