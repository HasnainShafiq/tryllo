// TaskList receives prop data from App.jsx   

import { Task } from "./Task";

export const TaskList = ({ type, tasks, _id, toggleModal, editModalToggle }) => {


    // take id of taskList and forward it to App.jsx
    const modalToggle = (e) => {
        
        const id = (e.target.id)
        
        toggleModal(id, type);
    }

    // takes taskId from Task.jsx and passes it to App.jsx
    const sendData = (id, title, description) => {
        editModalToggle(id, type, title, description)
    }


  return (
    <div  className="flex flex-col mx-auto items-center justify-center space-y-2" >
      <ul className="space-y-2">
      <h1 className="flex relative self-start justify-between font-bold text-slate-200"><span className="">{type}</span>
      <button className="font-bold text-slate-200" id={_id} onClick={modalToggle}>add</button>
      </h1>
        {/* loop over 'tasks' field and create a task card.
        Need to create a 'Task' component.
        */}
        {tasks.map((task, index) => {
          return (
            <Task logTaskData={sendData} title={task.title} description={task.description} order={task.order} _id={task._id} key={index} />
          );
        })}
      </ul>
      <span>{_id}</span>
    </div>
  );
};
