import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [note, setNote] = useState('');

    const sortTasks = (tasks) => {
        const sortOrder = { "С": 1, "В": 2, "НВ": 3, "НС": 4 };
      
        return tasks.sort((a, b) => {
          const aOrder = sortOrder[a.note] || 0;
          const bOrder = sortOrder[b.note] || 0;
          return aOrder - bOrder;
        });
      };

      const exportTasks = () => {
        const content = tasks.map((task) => `${task.task} - ${task.note}`).join('\n');
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'todo_list.txt';
        element.click();
      };
      

    const addTask = () => {
        if (newTask.trim() !== '') {
          setTasks(sortTasks([...tasks, { task: newTask, note: note }]));
          setNewTask('');
          setNote('');
        }
      };
      

    return (
<Card>
              <CardContent
                    sx={{
                    '& > :not(style)': { margin: 1 },
                    }}
                    >
  <Typography variant="h5" component="div" gutterBottom>
  My to do List
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter a task and note below:
        </Typography>
                 <>
                 <TextField
                    id="outlined-basic"
                    label="Enter a new task"
                    value={newTask}
                    variant="outlined"
                    onChange={(e) => setNewTask(e.target.value)}
                    sx={{
                        '& > :not(style)': { width: '50ch' },
                    }}
                    inputProps={{ style: { color: 'red' } }}
                />
                </>
                <>
                <TextField
                    label="Enter a note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    sx={{
                        '& > :not(style)': {width: '15ch' },
                    }}
                />
                </><p />
                <Button 
                    variant="contained" 
                    onClick={addTask}
                    >
                    Add Task
                </Button>
                <Button variant="contained" 
                onClick={exportTasks}
                >
                Save List
                </Button>
                <ol>
                {sortTasks(tasks).map((task, index) => (
                <li key={index}>
                {task.task} - {task.note}
                </li>
                ))}
                </ol>
            </CardContent>
</Card>
    );
}

export default ToDoList;