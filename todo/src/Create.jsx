import React, { useState } from 'react';
import axios from 'axios';

const Create = ({fetchTodos}) => {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        axios.post('https://todo-e8br.vercel.app/add', { task })
            .then(response => {
                console.log("Task added:", response.data);
                setTask(''); 
                fetchTodos();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className='create_form'>
            <input
                type="text"
                placeholder='Enter task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type='button' onClick={handleAdd}>Add</button>
        </div>
    );
};

export default Create;
