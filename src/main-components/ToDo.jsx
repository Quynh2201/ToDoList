import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ToDo = ({toDo, MarkDone, setUpdateTask, DeleteTask, countDoneLists}) => {
    return (
        <div className="task-item">
            {Array.isArray(toDo) && toDo.length > 0 && (
                Object.values(toDo.reduce((acc, task) => {
                    if(task && task.title && task.date && task.percent){
                        const date = task.date;
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(task);
                    }
                    
                    
                    return acc;
                }, {}))
                .sort((a, b) => new Date(b[0].date) - new Date(a[0].date))
                .map((group, index) => {
                    const groupDate = group[0].date; // Lấy ngày của nhóm
                    const countAll = group.length;
                    const countDone = countDoneLists(group, groupDate);
                    return (
                        <div className="form-list">
                            <h3>{groupDate}</h3> {/* Hiển thị ngày ở đây */}
                            <h3 className="countDone">Completed <span>{countDone} / {countAll}</span> task(s)</h3>
                            <form className="form" key={index}>
                                
                                {group.map((task, id) => (
                                    <React.Fragment key={task.id} >
                                        {/* Render mỗi task trong nhóm */}
                                        <div className="col taskBg">
                                            <div className={`list-output ${task.status ? 'done' : ''}`}>
                                                <div className="NumberText">
                                                    <span className='TaskNumber'>{id + 1}.</span> 
                                                    <span className='TaskText'>{task.title}</span>
                                                </div>
                                                <div className="percent">
                                                    <span className='TaskText'>{task.percent}%</span> 
                                                    <span className="NavPercent">
                                                        <div className="progess" style={{ width: `${task.percent}%`}}></div>
                                                    </span>            
                                                </div>
                                                
                                            </div>
                                            <div className="iconsWrap">
                                                <span title='Completed / Not Completed' onClick={(e) => MarkDone(task.id)}>  
                                                    <FontAwesomeIcon className="iconComplete" icon={faCircleCheck} />
                                                </span>
                                                {!task.status && (
                                                    <span title='Edit' onClick={() => setUpdateTask({
                                                        id: task.id,
                                                        title: task.title,
                                                        date: task.date,
                                                        percent: task.percent,
                                                        status: task.status ? true : false
                                                    })}>
                                                        {/* <FontAwesomeIcon className={`iconEdit ${(CheckEditId === task.id) ? 'disabled' : ''}`} icon={faPen} /> */}
                                                        <FontAwesomeIcon className="iconEdit" icon={faPen} />
                                                    </span>
                                                )}
                                                <span title='Delete' onClick={() => DeleteTask(task.id)}>
                                                    {/* <FontAwesomeIcon className={`iconDelete ${CheckEditId !== null ? 'disabled' : ''}`} icon={faTrashCan} /> */}
                                                    <FontAwesomeIcon className="iconDelete" icon={faTrashCan} />
                                                </span>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </form>
                        </div>
                        
                    );
                })
            )}
        </div>

    )
}

export default ToDo;