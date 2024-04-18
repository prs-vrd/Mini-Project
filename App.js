import './App.css';
import checklistImage from './Checklist.jpg';
const React = require('react');
const { useState } = React;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleAddTask = () => {
    if (taskText.trim() === '') return;
    const duration = calculateDuration(startDate, endDate);
    const newTask = {
      task: taskText,
      startDate: startDate.toLocaleString(),
      endDate: endDate.toLocaleString(),
      duration: duration
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const handleDeleteTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Function to calculate task duration
  const calculateDuration = (start, end) => {
    const diff = Math.abs(end - start);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <img src={checklistImage} alt="Checklist" className="checklist-image" />
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task"
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
        />
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="datetime-local"
          id="start-date"
          value={startDate.toISOString().substring(0, 16)}
          onChange={e => setStartDate(new Date(e.target.value))}
        />
        <label htmlFor="end-date">End Date:</label>
        <input
          type="datetime-local"
          id="end-date"
          value={endDate.toISOString().substring(0, 16)}
          onChange={e => setEndDate(new Date(e.target.value))}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.task}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>{task.duration}</td>
              <td>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

