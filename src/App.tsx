import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Web3WalletProvider } from './common/We3ReactLibs/components/Web3WalletProvider'
import Layout from './common/layout/Layout'
import { RefreshContextProvider, OXIProvider } from './contexts'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { OXI } from './pages'
import { TikTokRedirect } from './pages/tiktok/redirect'

function App() {
  return (
    <Web3WalletProvider>
      <RefreshContextProvider>
        <BrowserRouter>
          <OXIProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<OXI />} />
                <Route path="/redirect" element={<TikTokRedirect />} />
                {/* <Route path="/home" element={<Home />} /> */}
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Routes>
            </Layout>
          </OXIProvider>
        </BrowserRouter>
        <ToastContainer />
      </RefreshContextProvider>
    </Web3WalletProvider>
  )
}

export default App
