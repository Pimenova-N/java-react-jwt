import React from 'react';
import './App.scss'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import AuthorsPage from './components/AuthorsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthorPage from './components/AuthorPage';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/authors"/>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />        
        <Route
          path="/authors"
          element={
            <ProtectedRoute>
              <AuthorsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors/:id"
          element={
            <ProtectedRoute>
              <AuthorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


 