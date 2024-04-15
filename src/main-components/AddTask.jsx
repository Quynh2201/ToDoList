import React from "react";

const AddTask = ({newTask, setNewTask, newDate, setNewDate, newPercent, setNewPercent, addTask}) => {
    return (
        <div className="todoinput">
            <div className="todoinput-item">
                <label for="title">Title</label>
                <input id="title" value={newTask} onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="Title"/>
            </div>
            <div className="todoinput-item">
                <label for="date">Date</label>
                <input id="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} type="date" placeholder="Task's Date"/>
            </div>
            <div className="todoinput-item">
                <label for="percent">Percent</label>
                <input id="percent" value={newPercent} onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if(!isNaN(value) && value >= 0 && value <= 100){
                        setNewPercent(value);
                    }
                } } type="number" min="0" max="100" placeholder="Completed percent"/>
            </div>
            <div className="btn-add">
                <button onClick={addTask} className="PrimaryBtn"><span>Add</span></button>
            </div>
        </div>
    )
}

export default AddTask;