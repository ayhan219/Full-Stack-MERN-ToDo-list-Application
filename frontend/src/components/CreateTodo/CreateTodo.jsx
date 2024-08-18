import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateTodo.css';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const fetchTodos = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('No authentication token found');
      return;
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.post(
        'http://localhost:5000/api/todos',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Todo added successfully');
      // Form alanlarını temizleyin
      setTitle('');
      setContent('');
      // Yeni todosları alın
      navigate("/")
      await fetchTodos();
      
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // Component mount olduğunda todosları al
  }, []);

  return (
    <div className="create-todo">
      <h2>Create a New Todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Enter content"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="todo-list">
        <h3>Your Todos:</h3>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>{todo.title}: {todo.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateTodo;
