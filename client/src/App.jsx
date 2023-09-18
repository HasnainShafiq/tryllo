import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useState, useEffect } from "react";
import './App.css'

function App() {
  // list of tasks is empty to begin with -> data will be filled in via fetch request to api; api will in turn send back db response.
  const [taskLists, setTaskLists] = useState([]);
  const [modalIsHidden, setModalIsHidden] = useState(true);
  const [taskListId, setTaskListId] = useState()

  const modalToggleHandler = (id) => {
    setModalIsHidden((prevState) => !prevState);
    console.log(modalIsHidden);

    setTaskListId(id);
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

  return (
    <div className="relative flex justify-center items-start pt-10 bg-neutral-900 w-screen h-screen">
      <div className="flex flex-row-reverse w-full justify-between items-baseline">
        {!modalIsHidden && <TaskForm taskListId={taskListId} /> }

        {/* for each taskList, return a TaskList component and feed it the required prop data to display */}
        {taskLists.map((task, index) => {
          return (
            <TaskList
              toggleModal={modalToggleHandler}
              _id={task._id}
              tasks={task.tasks}
              type={task.type}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
