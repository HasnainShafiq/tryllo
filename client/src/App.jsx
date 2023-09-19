import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useState, useEffect } from "react";
import './App.css'
import { EditTask } from "./components/EditTask";

function App() {
  // list of tasks is empty to begin with -> data will be filled in via fetch request to api; api will in turn send back db response.
  const [taskLists, setTaskLists] = useState([]);
  const [taskListId, setTaskListId] = useState()
  const [taskListType, setTaskListType] = useState();
  
  const [modalIsHidden, setModalIsHidden] = useState(true);
  
  const [taskId, setTaskId] = useState();
  const [canEditTask, setCanEditTask] = useState(true);

  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description:""
  })

  // toggle TaskForm component and update taskListId -> this is then passed as props to TaskForm.
  const modalToggleHandler = (id, type) => {
    setModalIsHidden((prevState) => !prevState);
    console.log(modalIsHidden);

    setTaskListId(id);
    setTaskListType(type)
  };

  const hideModalHandler = () => {
    setModalIsHidden(prevState => !prevState)
  }

  const hideEditModalHandler = () => {
    setCanEditTask(prevState => !prevState)
  }


  useEffect(() => {
    
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/board");
      const data = await res.json();
      
      setTaskLists(data);
      console.log(data);
    };

    
    fetchData();
  }, []);

  // Same logic as in modalToggleHandler above
const editModalToggleHandler = (id, type, title, description) => {

  setCanEditTask((prevState) => !prevState);

  setTaskId(id);

  setTaskListType(type);
  // Used to retain the Task data when opening the edit modal.
  setEditTaskData((prevState) => ({
    ...prevState,
    title,
    description
  }))
}

  return (
    <div className="relative flex justify-center items-start pt-10 bg-neutral-900">
      <div className="flex flex-row-reverse w-full justify-between items-baseline overflow-x-scroll scrollbar-thin">
  
        {!modalIsHidden && <TaskForm toggleModalIsHidden={hideModalHandler} type={taskListType} taskListId={taskListId} /> }
    
        {!canEditTask && <EditTask toggleEditModalIsHidden={hideEditModalHandler} taskData={editTaskData} type={taskListType} taskId={taskId} />}


        {taskLists.map((task, index) => {
          return (
            <TaskList
              toggleModal={modalToggleHandler}
              _id={task._id}
              tasks={task.tasks}
              type={task.type}
              key={index}
              editModalToggle={editModalToggleHandler}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
