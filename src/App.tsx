import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Innovation from './pages/Innovation';
import CoreValues from './pages/CoreValues';

// Division Pages
import RenewableEnergy from './pages/divisions/RenewableEnergy';
import AISystems from './pages/divisions/AISystems';
import DigitalInfra from './pages/divisions/DigitalInfra';
import Cybersecurity from './pages/divisions/Cybersecurity';
import IoTSolutions from './pages/divisions/IoTSolutions';
import EVEcosystems from './pages/divisions/EVEcosystems';
import Incubation from './pages/divisions/Incubation';

// Admin Pages
import AdminLayout from './components/Layout/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';
import Messages from './pages/admin/Messages';
import ContentManager from './pages/admin/ContentManager';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/about/values" element={<CoreValues />} />
          
          {/* Division Routes */}
          <Route path="/services/renewable-energy" element={<RenewableEnergy />} />
          <Route path="/services/ai-systems" element={<AISystems />} />
          <Route path="/services/digital-infra" element={<DigitalInfra />} />
          <Route path="/services/cybersecurity" element={<Cybersecurity />} />
          <Route path="/services/iot-solutions" element={<IoTSolutions />} />
          <Route path="/innovation/ev-ecosystems" element={<EVEcosystems />} />
          <Route path="/innovation/incubation" element={<Incubation />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="messages" element={<Messages />} />
            <Route path="services" element={<ContentManager type="services" />} />
            <Route path="team" element={<ContentManager type="team" />} />
            <Route path="projects" element={<ContentManager type="projects" />} />
            <Route path="partners" element={<ContentManager type="partners" />} />
            <Route path="testimonials" element={<ContentManager type="testimonials" />} />
            <Route path="faqs" element={<ContentManager type="faqs" />} />
          </Route>
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
