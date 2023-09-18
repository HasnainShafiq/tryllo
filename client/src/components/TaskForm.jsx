import { useState } from "react";

export const TaskForm = ({ taskListId }) => {
  const [task, setTask] = useState({
    title: " ",
    desc: " ",
  });



  // update the form with the title and description
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(task);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    }

    const res = await fetch(
      `http://localhost:5000/api/board/tasklists/${taskListId}`, requestOptions
    );

    const response = await res.json()

    setTask({
        title: " ",
        desc: " ",
    })
    
    console.log('fetch data: ', response);
  };

  return (
    <div className="absolute flex flex-col self-center right-1/2 left-1/2">
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={task.title}
            name="title"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="desc">Description: </label>
          <input
            type="text"
            id="desc"
            value={task.desc}
            name="desc"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
