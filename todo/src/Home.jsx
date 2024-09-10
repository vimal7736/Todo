import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import './home.css';

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get("http://localhost:3001/get")
            .then(result => setTodos(result.data))
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => fetchTodos())
            .catch(err => console.error(err));
    };

    const handleEdit = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
            .then(() => fetchTodos())
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
            <h2>Todo List</h2>
            <Create fetchTodos={fetchTodos} />
            {todos.length === 0 ? <h2>No tasks available</h2> : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo._id} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                            <h3>{todo.task}</h3>
                            <div>
                                <button 
                                    onClick={() => handleEdit(todo._id)}
                                    className={todo.done ? 'done' : 'not-done'}
                                >
                                    {todo.done ? 'Completed' : 'Done'}
                                </button>
                                <button 
                                    onClick={() => handleDelete(todo._id)} 
                                    className="delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;
