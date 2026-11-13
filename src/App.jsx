import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import Estoque from './pages/Estoque'
import Financeiro from './pages/Financeiro'
import Fornecedores from './pages/Fornecedores'
import RH from './pages/RH'
import Prestadores from './pages/Prestadores'
import Relatorios from './pages/Relatorios'
import RelatorioCritico from './pages/RelatorioCritico'
import RelatorioVendas from './pages/RelatorioVendas'
import Perfil from './pages/Perfil'
import Login from './components/Login'
import { clearBasicAuth, hasBasicAuth } from './utils/api'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedLayout from './components/ProtectedLayout'
import PublicLayout from './components/PublicLayout/PublicLayout'
import Home from './pages/public/Home'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Sobre from './pages/public/Sobre'
import Funcionalidades from './pages/public/Funcionalidades'
import Planos from './pages/public/Planos'
import Contato from './pages/public/Contato'
import { Helmet } from 'react-helmet-async'


function AppSEOLayout() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Outlet />
    </>
  )
}
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(() => hasBasicAuth())

  useEffect(() => {
    const handleAuthRequired = () => {
      clearBasicAuth()
      setAuthenticated(false)
    }

    window.addEventListener('easygest:auth-required', handleAuthRequired)
    return () => window.removeEventListener('easygest:auth-required', handleAuthRequired)
  }, [])


  


return (
  <Routes>
    {/* Área do ERP */}
    <Route path="/app" element={<AppSEOLayout />}>
      
      {/* Entrada do sistema */}
      <Route
        index
        element={
          authenticated
            ? <Navigate to="/app/dashboard" replace />
            : <Login onAuthenticated={() => setAuthenticated(true)} />
        }
      />

      {/* Área protegida */}
      <Route
        element={
          <ProtectedRoute authenticated={authenticated}>
            <ProtectedLayout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="estoque" element={<Estoque />} />
        <Route path="financeiro" element={<Financeiro />} />
        <Route path="fornecedores" element={<Fornecedores />} />
        <Route path="rh" element={<RH />} />
        <Route path="prestadores" element={<Prestadores />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="relatorio-estoque-critico" element={<RelatorioCritico />} />
        <Route path="relatorio-vendas" element={<RelatorioVendas />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Route>
    </Route>

        {/* Site institucional */}
    <Route path="/" element={<PublicLayout />}>
  <Route index element={<Home />} />
  <Route path="sobre" element={<Sobre />} />
  <Route path="funcionalidades" element={<Funcionalidades />} />
  <Route path="planos" element={<Planos />} />
  <Route path="contato" element={<Contato />} />
</Route>

    {/* Endereços não encontrados */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)



}

export default App
