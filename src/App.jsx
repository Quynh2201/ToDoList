import { useState, useEffect, useRef } from 'react'
import './style/App.css'
import AddTask from './main-components/AddTask';
import Update from './main-components/Update';
import ToDo from './main-components/ToDo';
import img from './main-components/assets/to-do-list.jpeg';
import SearchTask from './main-components/SearchTask';
import { v4 as uuidv4 } from 'uuid';
// import { localStorage } from 'localStorage';


function App() {
  const [toDo, setToDo] = useState([
    // {"id": 1, "title": "task 1", "date": "2024/04/15", "percent": 80, "status": false}
  ])

  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState(new Date());
  const [newPercent, setNewPercent] = useState('');
  const [updateTask, setUpdateTask] = useState('');
  // const [checkEditId, setCheckEditId] = useState(null);
  const [nextId, setNextId] = useState(1);

  let tmp = 1;
  const addTask = () => {
    if (newTask && newDate && newPercent) {
      const id = uuidv4(); // Tạo một id mới sử dụng uuidv4()
      const newEntry = { id: id, title: newTask, date: newDate, percent: newPercent, status: false };
      const updateTodo = [...toDo, newEntry];
      if(newPercent === 100){
        MarkDone(id);
      }
      setToDo(updateTodo);
      setNewTask(''); 
      setNewDate('');
      setNewPercent('');
      localStorage.setItem('todolist', JSON.stringify(updateTodo));
      
    }
  } 

  const MarkDone = (id) => {
    const newTask = toDo.map(task => {
      if (task !== null && typeof task === 'object' && task.id === id) { // Kiểm tra xem task là một object và có thuộc tính id không
        const newPercent = task.percent === 100 ? 100 : 100;
        console.log(task.id + " " + task.title);
        return { ...task, status: !task.status, percent: newPercent };
        
      }
      
      return task;
      
    })
    setToDo(newTask);
    localStorage.setItem('todolist', JSON.stringify(newTask));
    
  }

  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem('todolist'));
    if (saveTodo && Array.isArray(saveTodo)) {
      setToDo(saveTodo);
    }
    
    
  }, []);
  

  const DeleteTask = (id) => {
    let result = window.confirm("Are you sure to delete this task?");
    if(result === true){
      let newTask = toDo.filter(task => task.id !== id);
      setToDo(newTask);
      localStorage.setItem('todolist', JSON.stringify(newTask));
      setUpdateTask('')
    }
    else{
      localStorage.setItem('todolist', JSON.stringify(toDo));
    }
  }

  

  const CancelUpdate = () => {
    setUpdateTask('')
  }

  const ChangeTask = (title, date, percent) => {
    let newEntry = {
      id: updateTask.id,
      title: title,
      date: date,
      percent: percent,
      status: updateTask.status ? true : false
    }
    setUpdateTask(newEntry)
  }

  const UpdateTask = () => {
    const updatedToDo = toDo.map(task => {
      if (task !== null && typeof task === 'object' && task.id === updateTask.id) { // Kiểm tra xem task là một object và có thuộc tính id không
        return updateTask;
      }
      return task;
    });
    setToDo(updatedToDo);
    localStorage.setItem('todolist', JSON.stringify(updatedToDo));
    setUpdateTask('');
  }

  const countDoneLists = (toDo, date) => {
    if (!toDo || !Array.isArray(toDo)) return 0;
    const listsByDate = toDo.filter(list => list.date === date);
    const doneLists = listsByDate.filter(list => list.status === true);
    return doneLists.length;
  }

  return (
    < >
        <div className="container1">
          <img src={img} alt="" />
        </div>

        <div className="container2">
          <br />
          <h2>ToDo List</h2>
          <br />

          {/* Update task */}
          {updateTask && updateTask ? (
            <Update
              updateTask={updateTask}
              ChangeTask={ChangeTask}
              UpdateTask={UpdateTask}
              CancelUpdate={CancelUpdate}
            />
          ) : (
            <AddTask
              newTask={newTask}
              setNewTask={setNewTask}
              newDate={newDate}
              setNewDate={setNewDate}
              newPercent={newPercent}
              setNewPercent={setNewPercent}
              addTask={addTask}
            />
        
          )}
      
          <ToDo 
            toDo={toDo}
            MarkDone={MarkDone}
            setUpdateTask={setUpdateTask}
            DeleteTask={DeleteTask}
            countDoneLists={countDoneLists}
            // CheckEditId={checkEditId}
          />
      
        </div>
     </>
  )
}

export default App;
