import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import LoginNavbar from './components/LoginNavbar/LoginNavbar';
import CreateTodo from './components/CreateTodo/CreateTodo';

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('authToken') ? true : false);

  const handleSetLogin = (status) => {
    setIsLogin(status);
  };

  return (
    <Router>
      {isLogin ? <LoginNavbar handleSetLogin={handleSetLogin} /> : <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home handleSetLogin={handleSetLogin} />} />
          <Route path="/login" element={<Login handleSetLogin={handleSetLogin} />} />
          <Route path="/signup" element={<Signup handleSetLogin={handleSetLogin} />} />
          <Route path="/createtodo" element={<CreateTodo handleSetLogin={handleSetLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
