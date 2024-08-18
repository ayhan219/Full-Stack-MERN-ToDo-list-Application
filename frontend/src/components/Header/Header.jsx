import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchTodos();
    }
  }, []);

  const fetchTodos = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:5000/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos.');
      console.error(err);
    }
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setTodos([]);
    // Optionally redirect to login page
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <h2 className="header-title">TodoList Projesine Hoşgeldiniz!</h2>
      <p className="header-message">
        {isLoggedIn ? 'Todo listenizi aşağıda görebilirsiniz.' : 'Todo eklemek için giriş yapmak zorundasınız.'}
      </p>
      <div className="header-buttons">
        {isLoggedIn ? (
          <>
            <div className="todo-list">
              <h3>Your Todos:</h3>
              <ul>
                {todos.length > 0 ? (
                  todos.map((todo) => (
                    <li key={todo._id}>{todo.title}: {todo.content}</li>
                  ))
                ) : (
                  <li>No todos available.</li>
                )}
              </ul>
            </div>
            
          </>
        ) : (
          <>
            <button className="header-button" onClick={handleSignUp}>Sign Up</button>
            <button className="header-button" onClick={handleLogin}>Login</button>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </header>
  );
};

export default Header;
