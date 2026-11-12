
import { Outlet } from 'react-router-dom'
import Layout from './Layout/Layout'

export default function ProtectedLayout({ sidebarOpen, setSidebarOpen }) {
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <Outlet />
    </Layout>
  )
}

