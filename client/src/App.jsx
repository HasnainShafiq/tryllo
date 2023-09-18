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

  // useEffect with empty array will run once on component mount -> data received from data on page load.
  useEffect(() => {
    // define the function which will call the fetch API
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/board");
      const data = await res.json();
      // update taskLists state with new data.
      setTaskLists(data);
      console.log(data);
    };

    // call the function
    fetchData();
  }, []);

  // Same logic as in modalToggleHandler above
const editModalToggleHandler = (id, type, title, description) => {

  setCanEditTask((prevState) => !prevState);

  setTaskId(id);
  // this is used to set the order property of the Task -> may prove beneficial when implementing drag and drop. 
  setTaskListType(type);
  // Used to retain the Task data when opening the edit modal.
  setEditTaskData((prevState) => ({
    ...prevState,
    title,
    description
  }))
}

  return (
    <div className="relative flex justify-center items-start pt-10 bg-neutral-900 w-screen h-screen">
      <div className="flex flex-row-reverse w-full justify-between items-baseline">
        {/* Conditionally render the new Task form */}
        {!modalIsHidden && <TaskForm type={taskListType} taskListId={taskListId} /> }
        {/* same logic here for the edit modal */}
        {!canEditTask && <EditTask taskData={editTaskData} type={taskListType} taskId={taskId} />}

        {/* for each taskList, return a TaskList component and feed it the required prop data to display */}
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
