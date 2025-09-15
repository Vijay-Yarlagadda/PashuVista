import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FAQPage from './components/FAQPage';
import GetStartedPage from './components/GetStartedPage';
import FindVeterinaryDoctors from './components/FindVeterinaryDoctors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/find-veterinary-doctors" element={<FindVeterinaryDoctors />} />
      </Routes>
    </Router>
  );
}

export default App;