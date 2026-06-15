import { useState , useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router , Routes,Route, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
import HeroSection from './pages/HeroSection';
import BrowseGita from './pages/BrowseGita';
import ChapterDetail from './pages/ChapterDetail';
import VerseDetail from './pages/VerseDetail';
import AIChatbot from './pages/AIChatbot';
import RandomShloka from './pages/RandomShloka';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import LoadingSpinner from './components/LoadingSpinner';
function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setLoading(false);
    }
  }, [location.pathname]);

  const handleLoaded = () => setLoading(false);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {loading && <LoadingSpinner />}
      <Routes>
        <Route path='/' element={<HeroSection onLoaded={handleLoaded} loading={loading} />} />
        <Route path='/browse' element={<BrowseGita />} />
        <Route path='/browse/chapter/:chapterId' element={<ChapterDetail />} />
        <Route path='/browse/chapter/:chapterId/verse/:verseId' element={<VerseDetail />} />
        <Route path='/chatbot' element={<AIChatbot />} />
        <Route path='/random' element={<RandomShloka />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signup' element={<Signup />} />
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