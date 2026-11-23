/**
 * ============================================================================
 * MOCK DE APRESENTAÇÃO - EASYGEST ERP
 * ============================================================================
 * Dados simulados de ENTRADA e SAÍDA de produtos para a apresentação de hoje.
 * 
 * PARA DESABILITAR APÓS A APRESENTAÇÃO:
 * 1. Altere ENABLE_PRESENTATION_MOCK para false abaixo:
 *    export const ENABLE_PRESENTATION_MOCK = false
 * 
 * 2. OU clique no botão "Modo Apresentação" na barra superior do sistema
 * 
 * 3. OU execute no console do navegador:
 *    window.easygestToggleMock(false)
 * ============================================================================
 */

export const ENABLE_PRESENTATION_MOCK = true

const MOCK_STORAGE_KEY = 'easygest.presentationMock'

export function isPresentationMockActive() {
  if (typeof window === 'undefined') return ENABLE_PRESENTATION_MOCK
  const override = localStorage.getItem(MOCK_STORAGE_KEY)
  if (override === 'true') return true
  if (override === 'false') return false
  return ENABLE_PRESENTATION_MOCK
}

export function setPresentationMockActive(active) {
  if (typeof window === 'undefined') return
  localStorage.setItem(MOCK_STORAGE_KEY, String(active))
  window.dispatchEvent(new CustomEvent('easygest:mock-toggle', { detail: { active } }))
}

// Expõe no console para facilitar desativação rápida
if (typeof window !== 'undefined') {
  window.easygestToggleMock = (active = null) => {
    const current = isPresentationMockActive()
    const next = active === null ? !current : Boolean(active)
    setPresentationMockActive(next)
    console.log(`[EasyGest] Modo Apresentação ${next ? 'ATIVADO' : 'DESATIVADO'}. Recarregando...`)
    window.location.reload()
  }
}

// ----------------------------------------------------------------------------
// GERADORES DE DATAS DINÂMICAS (baseadas na data atual de execução)
// ----------------------------------------------------------------------------
const now = new Date()

function formatDateIso(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function subDays(days) {
  const d = new Date(now)
  d.setDate(d.getDate() - days)
  return formatDateIso(d)
}

function subMonths(months, dayOfMonth = 15) {
  const d = new Date(now.getFullYear(), now.getMonth() - months, dayOfMonth)
  return formatDateIso(d)
}

const hojeIso = formatDateIso(now)

// ----------------------------------------------------------------------------
// 1. PRODUTOS (com estoque, custos, preços e fornecedores)
// ----------------------------------------------------------------------------
export const MOCK_PRODUTOS = [
  {
    codProduto: 101,
    nomeProduto: 'Parafuso Sextavado Aço 3/8"',
    tipoProduto: 'Ferragens',
    pesoProduto: '0.05 kg',
    custoProduto: 1.20,
    precoProduto: 2.80,
    statusProduto: 'Ativo',
    quantidadeAtual: 12,
    estoqueMinimo: 50,
    fornecedor: { codFornecedor: 1, nomeFornecedor: 'Metalúrgica Aliança Ltda' },
    dataCompraProduto: subDays(15),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(2)
  },
  {
    codProduto: 102,
    nomeProduto: 'Tubo PVC Esgoto 100mm x 6m',
    tipoProduto: 'Tubos e Conexões',
    pesoProduto: '4.20 kg',
    custoProduto: 38.50,
    precoProduto: 69.90,
    statusProduto: 'Ativo',
    quantidadeAtual: 140,
    estoqueMinimo: 40,
    fornecedor: { codFornecedor: 2, nomeFornecedor: 'Tigre Tubos & Conexões' },
    dataCompraProduto: subDays(5),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(1)
  },
  {
    codProduto: 103,
    nomeProduto: 'Disjuntor Bipolar Din 32A',
    tipoProduto: 'Material Elétrico',
    pesoProduto: '0.22 kg',
    custoProduto: 24.00,
    precoProduto: 48.50,
    statusProduto: 'Ativo',
    quantidadeAtual: 85,
    estoqueMinimo: 25,
    fornecedor: { codFornecedor: 3, nomeFornecedor: 'Schneider Elétrica Brasil' },
    dataCompraProduto: subDays(8),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(3)
  },
  {
    codProduto: 104,
    nomeProduto: 'Cabo de Aço Galvanizado 6mm (metro)',
    tipoProduto: 'Cabos e Cordas',
    pesoProduto: '0.15 kg',
    custoProduto: 4.80,
    precoProduto: 9.90,
    statusProduto: 'Ativo',
    quantidadeAtual: 8,
    estoqueMinimo: 30,
    fornecedor: { codFornecedor: 1, nomeFornecedor: 'Metalúrgica Aliança Ltda' },
    dataCompraProduto: subDays(22),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(4)
  },
  {
    codProduto: 105,
    nomeProduto: 'Válvula Esfera Monobloco 1/2"',
    tipoProduto: 'Hidráulica',
    pesoProduto: '0.35 kg',
    custoProduto: 18.20,
    precoProduto: 35.00,
    statusProduto: 'Ativo',
    quantidadeAtual: 14,
    estoqueMinimo: 35,
    fornecedor: { codFornecedor: 4, nomeFornecedor: 'Deca Louças e Metais' },
    dataCompraProduto: subDays(18),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(2)
  },
  {
    codProduto: 106,
    nomeProduto: 'Filtro de Óleo Lubrificante 10W40',
    tipoProduto: 'Automotivo',
    pesoProduto: '0.40 kg',
    custoProduto: 22.00,
    precoProduto: 44.90,
    statusProduto: 'Ativo',
    quantidadeAtual: 5,
    estoqueMinimo: 20,
    fornecedor: { codFornecedor: 5, nomeFornecedor: 'Distribuidora Lubrax & Filtros' },
    dataCompraProduto: subDays(30),
    dataValidadeProduto: subMonths(-12),
    dataFabricacaoProduto: subMonths(2)
  },
  {
    codProduto: 107,
    nomeProduto: 'Chave Combinada 13mm Cromo Vanádio',
    tipoProduto: 'Ferramentas',
    pesoProduto: '0.18 kg',
    custoProduto: 15.30,
    precoProduto: 32.00,
    statusProduto: 'Ativo',
    quantidadeAtual: 62,
    estoqueMinimo: 20,
    fornecedor: { codFornecedor: 6, nomeFornecedor: 'Tramontina Ferramentas Pro' },
    dataCompraProduto: subDays(10),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(5)
  },
  {
    codProduto: 108,
    nomeProduto: 'Fita Isolante 3M 19mm x 20m',
    tipoProduto: 'Material Elétrico',
    pesoProduto: '0.08 kg',
    custoProduto: 7.50,
    precoProduto: 16.90,
    statusProduto: 'Ativo',
    quantidadeAtual: 210,
    estoqueMinimo: 60,
    fornecedor: { codFornecedor: 3, nomeFornecedor: 'Schneider Elétrica Brasil' },
    dataCompraProduto: subDays(3),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(1)
  },
  {
    codProduto: 109,
    nomeProduto: 'Broca de Aço Rápido HSS 8mm',
    tipoProduto: 'Acessórios',
    pesoProduto: '0.04 kg',
    custoProduto: 8.90,
    precoProduto: 19.50,
    statusProduto: 'Ativo',
    quantidadeAtual: 45,
    estoqueMinimo: 15,
    fornecedor: { codFornecedor: 6, nomeFornecedor: 'Tramontina Ferramentas Pro' },
    dataCompraProduto: subDays(12),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(3)
  },
  {
    codProduto: 110,
    nomeProduto: 'Graxa de Lítio Multiuso Balde 1kg',
    tipoProduto: 'Química Industrial',
    pesoProduto: '1.00 kg',
    custoProduto: 29.00,
    precoProduto: 58.00,
    statusProduto: 'Ativo',
    quantidadeAtual: 38,
    estoqueMinimo: 15,
    fornecedor: { codFornecedor: 5, nomeFornecedor: 'Distribuidora Lubrax & Filtros' },
    dataCompraProduto: subDays(14),
    dataValidadeProduto: subMonths(-24),
    dataFabricacaoProduto: subMonths(1)
  },
  {
    codProduto: 111,
    nomeProduto: 'Lâmpada LED Industrial High Bay 50W',
    tipoProduto: 'Iluminação',
    pesoProduto: '0.75 kg',
    custoProduto: 35.00,
    precoProduto: 72.00,
    statusProduto: 'Ativo',
    quantidadeAtual: 54,
    estoqueMinimo: 20,
    fornecedor: { codFornecedor: 3, nomeFornecedor: 'Schneider Elétrica Brasil' },
    dataCompraProduto: subDays(7),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(2)
  },
  {
    codProduto: 112,
    nomeProduto: 'Rolamento Blindado 6204-2RS DDU',
    tipoProduto: 'Mecânica Industrial',
    pesoProduto: '0.12 kg',
    custoProduto: 16.50,
    precoProduto: 38.00,
    statusProduto: 'Ativo',
    quantidadeAtual: 16,
    estoqueMinimo: 45,
    fornecedor: { codFornecedor: 1, nomeFornecedor: 'Metalúrgica Aliança Ltda' },
    dataCompraProduto: subDays(26),
    dataValidadeProduto: '',
    dataFabricacaoProduto: subMonths(6)
  }
]

// ----------------------------------------------------------------------------
// 2. ENTRADAS DE PRODUTOS / ESTOQUE (Compras / Reabastecimento nos últimos 6 meses)
// ----------------------------------------------------------------------------
export const MOCK_ENTRADAS = [
  // Mês -5
  { idEntrada: 1, dataEntrada: subMonths(5, 5), valorTotal: 18450.00, fornecedor: { nomeFornecedor: 'Tigre Tubos & Conexões' } },
  { idEntrada: 2, dataEntrada: subMonths(5, 18), valorTotal: 19800.00, fornecedor: { nomeFornecedor: 'Schneider Elétrica Brasil' } },
  // Mês -4
  { idEntrada: 3, dataEntrada: subMonths(4, 8), valorTotal: 21500.00, fornecedor: { nomeFornecedor: 'Metalúrgica Aliança Ltda' } },
  { idEntrada: 4, dataEntrada: subMonths(4, 22), valorTotal: 21300.00, fornecedor: { nomeFornecedor: 'Tramontina Ferramentas Pro' } },
  // Mês -3
  { idEntrada: 5, dataEntrada: subMonths(3, 10), valorTotal: 26400.00, fornecedor: { nomeFornecedor: 'Deca Louças e Metais' } },
  { idEntrada: 6, dataEntrada: subMonths(3, 24), valorTotal: 23100.00, fornecedor: { nomeFornecedor: 'Distribuidora Lubrax & Filtros' } },
  // Mês -2
  { idEntrada: 7, dataEntrada: subMonths(2, 6), valorTotal: 22800.00, fornecedor: { nomeFornecedor: 'Tigre Tubos & Conexões' } },
  { idEntrada: 8, dataEntrada: subMonths(2, 20), valorTotal: 22300.00, fornecedor: { nomeFornecedor: 'Schneider Elétrica Brasil' } },
  // Mês -1
  { idEntrada: 9, dataEntrada: subMonths(1, 4), valorTotal: 27900.00, fornecedor: { nomeFornecedor: 'Metalúrgica Aliança Ltda' } },
  { idEntrada: 10, dataEntrada: subMonths(1, 19), valorTotal: 24400.00, fornecedor: { nomeFornecedor: 'Tramontina Ferramentas Pro' } },
  // Mês Atual
  { idEntrada: 11, dataEntrada: subDays(14), valorTotal: 29500.00, fornecedor: { nomeFornecedor: 'Deca Louças e Metais' } },
  { idEntrada: 12, dataEntrada: subDays(4), valorTotal: 26900.00, fornecedor: { nomeFornecedor: 'Distribuidora Lubrax & Filtros' } },
  { idEntrada: 13, dataEntrada: subDays(1), valorTotal: 12400.00, fornecedor: { nomeFornecedor: 'Tigre Tubos & Conexões' } }
]

// ----------------------------------------------------------------------------
// 3. SAÍDAS DE PRODUTOS / VENDAS (Hoje, últimos 7 dias e últimos 6 meses)
// ----------------------------------------------------------------------------
export const MOCK_VENDAS = [
  // VENDAS DE HOJE
  {
    idVenda: 501,
    dataVenda: hojeIso,
    hora: '08:35',
    valorTotal: 1650.00,
    cliente: { idCliente: 1, nomeCliente: 'Auto Mecânica Central' },
    itens: [
      { produto: { codProduto: 106, nomeProduto: 'Filtro de Óleo Lubrificante 10W40' }, quantidade: 15, subtotal: 673.50 },
      { produto: { codProduto: 110, nomeProduto: 'Graxa de Lítio Multiuso 1kg' }, quantidade: 10, subtotal: 580.00 },
      { produto: { codProduto: 107, nomeProduto: 'Chave Combinada 13mm' }, quantidade: 12, subtotal: 384.00 }
    ]
  },
  {
    idVenda: 502,
    dataVenda: hojeIso,
    hora: '09:12',
    valorTotal: 3420.00,
    cliente: { idCliente: 2, nomeCliente: 'Indústria Metalúrgica Silva' },
    itens: [
      { produto: { codProduto: 101, nomeProduto: 'Parafuso Sextavado Aço 3/8"' }, quantidade: 400, subtotal: 1120.00 },
      { produto: { codProduto: 104, nomeProduto: 'Cabo de Aço Galvanizado 6mm' }, quantidade: 120, subtotal: 1188.00 },
      { produto: { codProduto: 112, nomeProduto: 'Rolamento Blindado 6204-2RS' }, quantidade: 29, subtotal: 1102.00 }
    ]
  },
  {
    idVenda: 503,
    dataVenda: hojeIso,
    hora: '10:05',
    valorTotal: 2890.00,
    cliente: { idCliente: 3, nomeCliente: 'Construtora Horizonte Ltda' },
    itens: [
      { produto: { codProduto: 102, nomeProduto: 'Tubo PVC Esgoto 100mm x 6m' }, quantidade: 30, subtotal: 2097.00 },
      { produto: { codProduto: 105, nomeProduto: 'Válvula Esfera Monobloco 1/2"' }, quantidade: 22, subtotal: 770.00 }
    ]
  },
  {
    idVenda: 504,
    dataVenda: hojeIso,
    hora: '10:48',
    valorTotal: 4210.00,
    cliente: { idCliente: 4, nomeCliente: 'Comercial Elétrica Paulista' },
    itens: [
      { produto: { codProduto: 103, nomeProduto: 'Disjuntor Bipolar Din 32A' }, quantidade: 40, subtotal: 1940.00 },
      { produto: { codProduto: 108, nomeProduto: 'Fita Isolante 3M 19mm x 20m' }, quantidade: 60, subtotal: 1014.00 },
      { produto: { codProduto: 111, nomeProduto: 'Lâmpada LED Industrial 50W' }, quantidade: 17, subtotal: 1224.00 }
    ]
  },
  {
    idVenda: 505,
    dataVenda: hojeIso,
    hora: '11:20',
    valorTotal: 1980.00,
    cliente: { idCliente: 5, nomeCliente: 'Distribuidora Norte-Sul' },
    itens: [
      { produto: { codProduto: 107, nomeProduto: 'Chave Combinada 13mm' }, quantidade: 35, subtotal: 1120.00 },
      { produto: { codProduto: 109, nomeProduto: 'Broca de Aço Rápido 8mm' }, quantidade: 44, subtotal: 858.00 }
    ]
  },
  {
    idVenda: 506,
    dataVenda: hojeIso,
    hora: '11:50',
    valorTotal: 2700.00,
    cliente: { idCliente: 6, nomeCliente: 'Hospital Santa Clara' },
    itens: [
      { produto: { codProduto: 111, nomeProduto: 'Lâmpada LED Industrial 50W' }, quantidade: 25, subtotal: 1800.00 },
      { produto: { codProduto: 105, nomeProduto: 'Válvula Esfera Monobloco 1/2"' }, quantidade: 25, subtotal: 875.00 }
    ]
  },

  // ÚLTIMOS 7 DIAS (Saídas diárias consecutivas para curva de vendas semanal)
  { idVenda: 490, dataVenda: subDays(1), hora: '16:40', valorTotal: 9450.00, cliente: { nomeCliente: 'Construtora Horizonte Ltda' } },
  { idVenda: 491, dataVenda: subDays(1), hora: '11:15', valorTotal: 3850.00, cliente: { nomeCliente: 'Auto Mecânica Central' } },
  { idVenda: 485, dataVenda: subDays(2), hora: '15:20', valorTotal: 8900.00, cliente: { nomeCliente: 'Comercial Elétrica Paulista' } },
  { idVenda: 486, dataVenda: subDays(2), hora: '10:00', valorTotal: 4200.00, cliente: { nomeCliente: 'Indústria Metalúrgica Silva' } },
  { idVenda: 480, dataVenda: subDays(3), hora: '14:30', valorTotal: 10250.00, cliente: { nomeCliente: 'Distribuidora Norte-Sul' } },
  { idVenda: 481, dataVenda: subDays(3), hora: '09:40', valorTotal: 2950.00, cliente: { nomeCliente: 'Hospital Santa Clara' } },
  { idVenda: 475, dataVenda: subDays(4), hora: '16:10', valorTotal: 7850.00, cliente: { nomeCliente: 'Auto Mecânica Central' } },
  { idVenda: 470, dataVenda: subDays(5), hora: '15:00', valorTotal: 9600.00, cliente: { nomeCliente: 'Construtora Horizonte Ltda' } },
  { idVenda: 465, dataVenda: subDays(6), hora: '14:45', valorTotal: 8400.00, cliente: { nomeCliente: 'Comercial Elétrica Paulista' } },
  { idVenda: 460, dataVenda: subDays(7), hora: '11:30', valorTotal: 7950.00, cliente: { nomeCliente: 'Indústria Metalúrgica Silva' } },

  // HISTÓRICO MENSAL (Últimos 6 meses para o gráfico de fluxo)
  // Mês -5
  { idVenda: 401, dataVenda: subMonths(5, 4), valorTotal: 23500.00, cliente: { nomeCliente: 'Indústria Metalúrgica Silva' } },
  { idVenda: 402, dataVenda: subMonths(5, 20), valorTotal: 25000.00, cliente: { nomeCliente: 'Construtora Horizonte Ltda' } },
  // Mês -4
  { idVenda: 403, dataVenda: subMonths(4, 7), valorTotal: 26800.00, cliente: { nomeCliente: 'Comercial Elétrica Paulista' } },
  { idVenda: 404, dataVenda: subMonths(4, 21), valorTotal: 27400.00, cliente: { nomeCliente: 'Auto Mecânica Central' } },
  // Mês -3
  { idVenda: 405, dataVenda: subMonths(3, 9), valorTotal: 30500.00, cliente: { nomeCliente: 'Distribuidora Norte-Sul' } },
  { idVenda: 406, dataVenda: subMonths(3, 23), valorTotal: 31300.00, cliente: { nomeCliente: 'Hospital Santa Clara' } },
  // Mês -2
  { idVenda: 407, dataVenda: subMonths(2, 5), valorTotal: 28900.00, cliente: { nomeCliente: 'Construtora Horizonte Ltda' } },
  { idVenda: 408, dataVenda: subMonths(2, 19), valorTotal: 30000.00, cliente: { nomeCliente: 'Indústria Metalúrgica Silva' } },
  // Mês -1
  { idVenda: 409, dataVenda: subMonths(1, 3), valorTotal: 33400.00, cliente: { nomeCliente: 'Comercial Elétrica Paulista' } },
  { idVenda: 410, dataVenda: subMonths(1, 18), valorTotal: 34000.00, cliente: { nomeCliente: 'Auto Mecânica Central' } },
  // Mês Atual (adicionais para fechar o mês)
  { idVenda: 411, dataVenda: subDays(18), valorTotal: 28400.00, cliente: { nomeCliente: 'Distribuidora Norte-Sul' } },
  { idVenda: 412, dataVenda: subDays(11), valorTotal: 26850.00, cliente: { nomeCliente: 'Hospital Santa Clara' } }
]

// ----------------------------------------------------------------------------
// 4. ITENS DE VENDA (/itens-venda)
// ----------------------------------------------------------------------------
export const MOCK_ITENS_VENDA = [
  { id: 1, quantidade: 400, produto: { nomeProduto: 'Parafuso Sextavado Aço 3/8"' } },
  { id: 2, quantidade: 30, produto: { nomeProduto: 'Tubo PVC Esgoto 100mm x 6m' } },
  { id: 3, quantidade: 40, produto: { nomeProduto: 'Disjuntor Bipolar Din 32A' } },
  { id: 4, quantidade: 120, produto: { nomeProduto: 'Cabo de Aço Galvanizado 6mm' } },
  { id: 5, quantidade: 47, produto: { nomeProduto: 'Válvula Esfera Monobloco 1/2"' } },
  { id: 6, quantidade: 15, produto: { nomeProduto: 'Filtro de Óleo Lubrificante 10W40' } },
  { id: 7, quantidade: 47, produto: { nomeProduto: 'Chave Combinada 13mm' } },
  { id: 8, quantidade: 60, produto: { nomeProduto: 'Fita Isolante 3M 19mm x 20m' } },
  { id: 9, quantidade: 44, produto: { nomeProduto: 'Broca de Aço Rápido 8mm' } },
  { id: 10, quantidade: 10, produto: { nomeProduto: 'Graxa de Lítio Multiuso 1kg' } },
  { id: 11, quantidade: 42, produto: { nomeProduto: 'Lâmpada LED Industrial 50W' } },
  { id: 12, quantidade: 29, produto: { nomeProduto: 'Rolamento Blindado 6204-2RS' } }
]

// ----------------------------------------------------------------------------
// 5. DEMAIS ENTIDADES COMPLEMENTARES (Para manter a apresentação consistente)
// ----------------------------------------------------------------------------
export const MOCK_CLIENTES = [
  { id: 1, codCliente: 1, nomeCliente: 'Auto Mecânica Central', cnpjCpf: '12.345.678/0001-90', email: 'contato@automecanicacentral.com.br', telefone: '(11) 98765-4321', cidade: 'São Paulo', status: 'Ativo' },
  { id: 2, codCliente: 2, nomeCliente: 'Indústria Metalúrgica Silva', cnpjCpf: '23.456.789/0001-01', email: 'compras@metalurgicasilva.ind.br', telefone: '(11) 97654-3210', cidade: 'Campinas', status: 'Ativo' },
  { id: 3, codCliente: 3, nomeCliente: 'Construtora Horizonte Ltda', cnpjCpf: '34.567.890/0001-12', email: 'obras@horizonte.eng.br', telefone: '(19) 96543-2109', cidade: 'Santos', status: 'Ativo' },
  { id: 4, codCliente: 4, nomeCliente: 'Comercial Elétrica Paulista', cnpjCpf: '45.678.901/0001-23', email: 'vendas@eletricapaulista.com.br', telefone: '(11) 95432-1098', cidade: 'São Bernardo', status: 'Ativo' },
  { id: 5, codCliente: 5, nomeCliente: 'Distribuidora Norte-Sul', cnpjCpf: '56.789.012/0001-34', email: 'nortesul@distribuidora.com.br', telefone: '(12) 94321-0987', cidade: 'São José dos Campos', status: 'Ativo' },
  { id: 6, codCliente: 6, nomeCliente: 'Hospital Santa Clara', cnpjCpf: '67.890.123/0001-45', email: 'manutencao@santaclara.org.br', telefone: '(11) 93210-9876', cidade: 'Santo André', status: 'Ativo' }
]

export const MOCK_FORNECEDORES = [
  { id: 1, codFornecedor: 1, nomeFornecedor: 'Metalúrgica Aliança Ltda', cnpj: '11.222.333/0001-44', email: 'contato@metalurgicaalianca.com.br', telefone: '(11) 4002-8922', categoria: 'Ferragens e Cabos' },
  { id: 2, codFornecedor: 2, nomeFornecedor: 'Tigre Tubos & Conexões', cnpj: '22.333.444/0001-55', email: 'vendas@tigre.com.br', telefone: '(47) 3441-5000', categoria: 'Hidráulica e PVC' },
  { id: 3, codFornecedor: 3, nomeFornecedor: 'Schneider Elétrica Brasil', cnpj: '33.444.555/0001-66', email: 'atendimento@se.com', telefone: '(11) 3465-4000', categoria: 'Material Elétrico' },
  { id: 4, codFornecedor: 4, nomeFornecedor: 'Deca Louças e Metais', cnpj: '44.555.666/0001-77', email: 'comercial@deca.com.br', telefone: '(11) 3003-3322', categoria: 'Metais e Válvulas' },
  { id: 5, codFornecedor: 5, nomeFornecedor: 'Distribuidora Lubrax & Filtros', cnpj: '55.666.777/0001-88', email: 'pedidos@lubraxfeltros.com.br', telefone: '(11) 2291-7000', categoria: 'Automotivo e Lubrificantes' },
  { id: 6, codFornecedor: 6, nomeFornecedor: 'Tramontina Ferramentas Pro', cnpj: '66.777.888/0001-99', email: 'corporativo@tramontina.com.br', telefone: '(54) 3461-8000', categoria: 'Ferramentas Manuais' }
]

export const MOCK_CONTAS_PAGAR = [
  { id: 1, fornecedor: 'Metalúrgica Aliança Ltda', nfe: 'NFe-48291', vencimento: subDays(-5), valor: 12400.00, centroCusto: 'Estoque / Matéria Prima', status: 'Aprovado' },
  { id: 2, fornecedor: 'Schneider Elétrica Brasil', nfe: 'NFe-48310', vencimento: subDays(-10), valor: 8950.00, centroCusto: 'Reposição de Produtos', status: 'Aprovado' },
  { id: 3, fornecedor: 'Tigre Tubos & Conexões', nfe: 'NFe-48112', vencimento: subDays(2), valor: 6300.00, centroCusto: 'Estoque / Hidráulica', status: 'Pago' }
]

export const MOCK_CONTAS_RECEBER = [
  { id: 1, cliente: 'Indústria Metalúrgica Silva', nfe: 'NFe-1092', vencimento: subDays(-8), valor: 3420.00, status: 'Aberto' },
  { id: 2, cliente: 'Construtora Horizonte Ltda', nfe: 'NFe-1093', vencimento: subDays(-15), valor: 2890.00, status: 'Aberto' },
  { id: 3, cliente: 'Comercial Elétrica Paulista', nfe: 'NFe-1088', vencimento: subDays(1), valor: 4210.00, status: 'Pago' }
]

export const MOCK_CONCILIACAO = [
  { id: 1, data: hojeIso, descricao: 'Recebimento Venda PIX #504', tipo: 'Entrada', valor: 4210.00, status: 'Conciliado' },
  { id: 2, data: hojeIso, descricao: 'Recebimento Cartão #502', tipo: 'Entrada', valor: 3420.00, status: 'Conciliado' },
  { id: 3, data: subDays(1), descricao: 'Pagamento Fornecedor Tigre', tipo: 'Saída', valor: 6300.00, status: 'Conciliado' }
]

// ----------------------------------------------------------------------------
// ROTEADOR CENTRAL DE RESPOSTAS MOCKADAS
// ----------------------------------------------------------------------------
export function getPresentationMockResponse(path, options = {}) {
  const cleanPath = String(path).replace(/^\/api/, '').split('?')[0].replace(/\/+$/, '')
  const method = (options.method || 'GET').toUpperCase()

  // Mutações (POST/PUT/DELETE) em modo apresentação simulam sucesso instantâneo
  if (method !== 'GET') {
    return {
      success: true,
      mensagem: 'Operação simulada com sucesso (Modo Apresentação).',
      dados: options.body ? (typeof options.body === 'string' ? JSON.parse(options.body) : options.body) : null
    }
  }

  switch (cleanPath) {
    case '/produtos':
      return MOCK_PRODUTOS

    case '/vendas':
      return MOCK_VENDAS

    case '/itens-venda':
      return MOCK_ITENS_VENDA

    case '/entradas':
    case '/compras':
      return MOCK_ENTRADAS

    case '/clientes':
      return MOCK_CLIENTES

    case '/fornecedores':
      return MOCK_FORNECEDORES

    case '/contas-pagar':
      return MOCK_CONTAS_PAGAR

    case '/contas-receber':
      return MOCK_CONTAS_RECEBER

    case '/conciliacao-bancaria':
      return MOCK_CONCILIACAO

    case '/usuarios':
      return [{ id: 1, usuario: 'admin', nome: 'Administrador EasyGest', perfil: 'ADMIN' }]

    default:
      return undefined
  }
}
