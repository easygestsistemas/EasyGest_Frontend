import { useState, useEffect } from 'react'
import { apiJson } from '../utils/api'
import { isPresentationMockActive } from '../utils/presentationMock'
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
    const { palette, uiScale } = useAccessibility()
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
      const produtos = (await apiJson('/produtos')) || []

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

      // VENDAS (SAÍDAS DE PRODUTOS)
      const vendas = (await apiJson('/vendas')) || []

      // ITENS DE VENDA
      let itensVenda = []
      try {
        itensVenda = (await apiJson('/itens-venda')) || []
      } catch {
        itensVenda = []
      }

      // ENTRADAS (COMPRAS E REPOSIÇÃO DE ESTOQUE)
      let entradas = []
      try {
        entradas = (await apiJson('/entradas')) || []
      } catch {
        entradas = []
      }

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

      // FLUXO MENSAL: Agrupa Entradas e Saídas por Mês
      const fluxoPorMes = {}

      // 1. Saídas (Vendas)
      vendas.forEach(venda => {
        const data = new Date(venda.dataVenda)
        if (isNaN(data.getTime())) return
        const mesKey = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`
        const mesNome = data.toLocaleString('pt-BR', { month: 'short' })

        if (!fluxoPorMes[mesKey]) {
          fluxoPorMes[mesKey] = { mesKey, mes: mesNome, in: 0, out: 0 }
        }
        fluxoPorMes[mesKey].out += Number(venda.valorTotal || 0)
      })

      // 2. Entradas (Compras/Reposição de produtos)
      entradas.forEach(entrada => {
        const data = new Date(entrada.dataEntrada || entrada.dataCompra || entrada.data)
        if (isNaN(data.getTime())) return
        const mesKey = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`
        const mesNome = data.toLocaleString('pt-BR', { month: 'short' })

        if (!fluxoPorMes[mesKey]) {
          fluxoPorMes[mesKey] = { mesKey, mes: mesNome, in: 0, out: 0 }
        }
        fluxoPorMes[mesKey].in += Number(entrada.valorTotal || entrada.valor || 0)
      })

      // Ordena cronologicamente os últimos 6 meses para o gráfico de barras
      const mesesOrdenados = Object.values(fluxoPorMes)
        .sort((a, b) => a.mesKey.localeCompare(b.mesKey))
        .slice(-6)

      setMovMensal(mesesOrdenados)

      // VENDAS SEMANAL (SAÍDAS DIÁRIAS)
      const vendasPorDia = {}
      vendas.forEach(venda => {
        const dia = venda.dataVenda ? String(venda.dataVenda).slice(0, 10) : ''
        if (!dia) return
        if (!vendasPorDia[dia]) {
          vendasPorDia[dia] = 0
        }
        vendasPorDia[dia] += Number(venda.valorTotal || 0)
      })

      const semanal = Object.entries(vendasPorDia)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-7)
        .map(([dia, valor]) => {
          const partes = dia.split('-')
          const label = partes.length === 3 ? `${partes[2]}/${partes[1]}` : dia
          return {
            dia: label,
            dataIso: dia,
            valor
          }
        })

      setVendasSemanal(semanal)

      // KPIS: Quando o mock está ativo, usa métricas calculadas com variações para apresentação;
      // Quando desligado, usa estritamente os valores reais retornados pelo banco.
      const isMock = isPresentationMockActive()
      const ticketMedioCalc = vendasDeHoje.length > 0
        ? totalVendasHoje / vendasDeHoje.length
        : (isMock && vendas.length > 0 ? (vendas.reduce((acc, v) => acc + Number(v.valorTotal || 0), 0) / vendas.length) : 0)

      setKpis({
        vendasHoje: totalVendasHoje,
        ticketMedio: ticketMedioCalc,
        itensVendidos: isMock
          ? (totalItensVendidos || 48)
          : (totalItensVendidos || vendas.length),
        margem: isMock ? 34.8 : 0,
        variacaoVendas: isMock ? 14.2 : 0,
        variacaoTicket: isMock ? 5.8 : 0,
        variacaoItens: isMock ? 8.4 : 0,
        variacaoMargem: isMock ? 2.1 : 0
      })

      // VENDAS RECENTES (ÚLTIMAS SAÍDAS)
      setVendasRecentes(
        vendas
          .slice()
          .sort((a, b) => new Date(b.dataVenda) - new Date(a.dataVenda))
          .slice(0, 5)
          .map(venda => ({
            cliente: venda.cliente?.nomeCliente || 'Sem cliente',
            total: venda.valorTotal,
            hora: venda.hora || (venda.dataVenda === hoje ? 'Hoje' : venda.dataVenda)
          }))
      )
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
    }
  }

  useEffect(() => {
    carregarDashboard()

    const handleMockToggle = () => {
      carregarDashboard()
    }
    window.addEventListener('easygest:mock-toggle', handleMockToggle)
    return () => window.removeEventListener('easygest:mock-toggle', handleMockToggle)
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
    font: {
      size: 12 * uiScale
    },

    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          font: {
            size: 12 * uiScale
          }
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
