import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Menu } from './components/common/Menu';
import { Footer } from './components/common/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { RateMoviePage } from './pages/RateMoviePage';
import { RateTvPage } from './pages/RateTvPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Menu />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rate-movie" element={<RateMoviePage />} />
            <Route path="/rate-tv" element={<RateTvPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
