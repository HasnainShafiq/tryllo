import { useState, useEffect } from "react";
import { XMark } from "../icons/XMark";
import { Check } from "../icons/Check";




export const EditTask = ({ taskId, type, taskData, toggleEditModalIsHidden }) => {
  const [task, setTask] = useState({
    title: taskData.title,
    desc: taskData.description,
  });


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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };

    const res = await fetch(
      `http://localhost:5000/api/board/tasklists/${taskId}`,
      requestOptions
    );

    await res.json();

  };

  const hideEditModalHandler = () => {
    toggleEditModalIsHidden();
  }

  return (
    <div className="absolute z-50 w-screen h-screen flex flex-col inset-0 items-center justify-center bg-neutral-800/80">
      <form
        className="flex flex-col w-3/4 md:w-1/2 max-w-xl rounded shadow-md shadow-neutral-900 bg-neutral-300 p-4 items-start space-y-2"
        onSubmit={submitForm}
      >
        <h3 className="font-roboto font-bold md:text-xl">Edit task:</h3>
        <div className="flex flex-col w-full">
          <label className="font-roboto font-bold text-black" htmlFor="title">Title: </label>
          <input
            className="border-solid border-2 border-neutral-700 rounded font-semibold"
            type="text"
            id="title"
            value={task.title}
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="font-roboto font-bold text-black" htmlFor="desc">Description: </label>
          <textarea
            className="border-2 border-solid border-neutral-700 rounded"
            type="text"
            id="desc"
            value={task.desc}
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="flex self-end space-x-1">
          <button onClick={hideEditModalHandler}
           className="bg-red-800 p-1 rounded" >
            {/* <span className=" font-roboto text-sm font-bold">Cancel</span> */}
            <XMark className="text-white" />
          </button>
          <button className="bg-green-800 p-1 rounded" type="submit"><Check className="text-white" /></button>
          </div>
      </form>
    </div>
  );
};
