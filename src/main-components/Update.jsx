import React from "react";

const Update = ({updateTask, ChangeTask, UpdateTask, CancelUpdate}) => {
    return (
        <>
            <div className="todoinput">
                <div className="todoinput-item">
                    <label for="title">Title</label>
                    <input id="title" value={updateTask && updateTask.title}
                    onChange={(e) => ChangeTask(e.target.value, updateTask.date, updateTask.percent)} type="text" placeholder="Title"/>
                </div>
                <div className="todoinput-item">
                    <label for="date">Date</label>
                    <input id="date" value={updateTask && updateTask.date}
                    onChange={(e) => ChangeTask(updateTask.title, e.target.value, updateTask.percent)} type="date" placeholder="Task's Date"/>
                </div>
                <div className="todoinput-item">
                    <label for="percent">Percent</label>
                    <input id="percent" value={updateTask && updateTask.percent} 
                    onChange={(e) => ChangeTask(updateTask.title, updateTask.date, e.target.value)} type="number" placeholder="Completed percent"/>
                </div>

                <div className="btn-update">
                    <button onClick={UpdateTask} type="button" className="PrimaryBtn"><span>Update</span></button>
                    <button onClick={CancelUpdate} type="button" className="PrimaryBtn"><span>Cancel</span></button>
                </div>
            </div>
            
            
        </>
    )
}

export default Update;