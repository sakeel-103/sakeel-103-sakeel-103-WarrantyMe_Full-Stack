import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import EditorPage from './pages/EditorPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ flex: 1, paddingBottom: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </main>
        <footer>
          <p>© 2025 Letter Editor. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;