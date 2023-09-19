import { Task } from "./Task";
import { PlusIcon } from "../icons/PlusIcon";

// TaskList receives prop data from App.jsx   
export const TaskList = ({ type, tasks, _id, toggleModal, editModalToggle }) => {



    const modalToggle = () => {
        
        const id = (_id)
        
        toggleModal(id, type);
    }


    const sendData = (id, title, description) => {
        editModalToggle(id, type, title, description)
    }


  return (
    <div  className="flex flex-col min-w-[250px] max-w-xs sm:max-w-sm mx-auto items-center space-y-2 max-h-screen overflow-y-scroll scrollbar-thin" >
      <ul className="space-y-2 w-full">
      <h1 className="flex relative self-start justify-between font-bold font-roboto md:text-lg text-slate-200"><span className="">{type}</span>
      <PlusIcon className="hover:cursor-pointer hover:bg-neutral-700 rounded-xl transition-all" id={_id} toggleModalListener={modalToggle}></PlusIcon>
      </h1>
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
