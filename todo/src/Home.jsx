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
        axios.get("https://todo-e8br.vercel.app/get")
            .then(result => setTodos(result.data))
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        axios.delete(`https://todo-e8br.vercel.app/delete/${id}`)
            .then(() => fetchTodos())
            .catch(err => console.error(err));
    };

    const handleEdit = (id) => {
        axios.put(`https://todo-e8br.vercel.app/update/${id}`)
            .then(() => fetchTodos())
            .catch(err => console.error(err));
    };

    const pendingTodos = todos.filter(todo => !todo.done);
    const completedTodos = todos.filter(todo => todo.done);

    return (
        <div>

            <h2>Task Manager</h2>
    <div className='maincont'>

        <div className="container">
            <h2>Todo List</h2>
            <Create fetchTodos={fetchTodos} />
            {pendingTodos.length === 0 ? (
                <h2>No tasks available</h2>
            ) : (
                <ul>
                    {pendingTodos.map(todo => (
                        <li key={todo._id}>
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

        <div className="container">
            <h2>Completed List</h2>
            {completedTodos.length === 0 ? (
                <h2>No completed tasks</h2>
            ) : (
                <ul>
                    {completedTodos.map(todo => (
                        <li key={todo._id} style={{ textDecoration: 'line-through' }}>
                            <h3>{todo.task}</h3>
                            <div>
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
    </div>
        </div>
);

};

export default Home;
