import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import ProgrammesPage from './pages/ProgrammeListPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import ResultsPage from './pages/ResultPage'
import SearchPage from './pages/CandidateSearchPage';
import CertificatePage from './pages/CertificateViewPage';

// 1. Import the necessary components from react-router-dom
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      {/* This main div acts as the container for our entire application */}
      <div className="bg-gray-50 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/programmes" element={<ProgrammesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/programmes/:programmeId/results" element={<ResultsPage />} />
            <Route path="/programmes/:programmeId/results/:resultId/certificate" element={<CertificatePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;