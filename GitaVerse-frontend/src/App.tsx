import { useState , useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router , Routes,Route, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './pages/HeroSection';
import BrowseGita from './pages/BrowseGita';
import LoadingSpinner from './components/LoadingSpinner';
function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Reset loading for non-home routes
  useEffect(() => {
    if (location.pathname !== '/') {
      setLoading(false);
    }
  }, [location.pathname]);

  const handleLoaded = () => setLoading(false);

  return (
    <>
      <Navbar />
      {loading && <LoadingSpinner />}
      <Routes>
        <Route path='/' element={<HeroSection onLoaded={handleLoaded} loading={loading} />} />
        <Route path='/browse' element={<BrowseGita />} />
        <Route path='/chatbot' element={<div>AI Chatbot Page</div>} />
        <Route path='/random' element={<div>Random Shloka Page</div>} />
        <Route path='/contact' element={<div>Contact Page</div>} />
        <Route path='/signup' element={<div>Signup Page</div>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;