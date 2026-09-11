import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetail from './pages/CampaignDetail';
import PaymentSuccess from './pages/PaymentSuccess';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white font-sora relative overflow-x-hidden">
      {/* Global Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0a0a0f',
            color: '#fff',
            border: '1px solid #00f5ff',
          },
        }}
      />
      
      {/* Background Ambient Mesh (CSS only) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateCampaign />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;