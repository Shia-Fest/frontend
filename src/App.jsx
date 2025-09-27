import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import ProgrammesPage from './pages/ProgrammeListPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import ResultsPage from './pages/ResultPage'
import SearchPage from './pages/CandidateSearchPage';
import CertificatePage from './pages/CertificateViewPage';

// 1. Import the necessary components from react-router-dom
import Navbar from './components/Navbar';


// Simple Navbar component for navigation
function App() {
  return (
    // The entire application is wrapped in <BrowserRouter> to enable routing
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        
        <main className="py-8">
          {/* The <Routes> component manages which page to show based on the URL */}
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<LeaderboardsPage />} />
            <Route path="/programmes" element={<ProgrammesPage />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Nested/Dynamic Pages */}
            <Route path="/programmes/:programmeId/results" element={<ResultsPage />} />
            <Route path="/programmes/:programmeId/results/:resultId/certificate" element={<CertificatePage />} />
          </Routes>
        </main>

        <footer className="bg-white mt-12 py-6">
          <div className="container mx-auto text-center text-gray-500">
            &copy; 2025 Shia Fest. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

