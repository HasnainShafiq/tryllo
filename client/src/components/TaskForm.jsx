import { useState, useEffect } from "react";
import { XMark } from "../icons/XMark";
import { Check } from "../icons/Check";

// taskListId is used for the req params.
export const TaskForm = ({ taskListId, type, toggleModalIsHidden }) => {
  const [order, setOrder] = useState(null);
  const [task, setTask] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    const orderFunc = () => {
      if (type === "To-do") {
        setOrder(1);
      } else if (type === "In-Progress") {
        setOrder(2);
      } else if (type === "Completed") {
        setOrder(3);
      }
    };

    orderFunc();
  }, []);

  // update the form with the title and description
  const handleChange = (e) => {
    const { name, value } = e.target;

    // spread prevState object and update the keys which match [name] with the new value.
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
      order: order,
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
      body: JSON.stringify(task),
    };

    const res = await fetch(
      `http://localhost:5000/api/board/tasklists/${taskListId}`,
      requestOptions
    );

    const response = await res.json();

    setTask({
      title: "",
      desc: "",
    });

    console.log("fetch data: ", response);
  };

  const hideModalHandler = () => {
    toggleModalIsHidden();
  };

  return (
    <div className="absolute z-50 w-screen h-screen flex flex-col inset-0 items-center justify-center bg-neutral-800/80">
      <form
        className="flex flex-col w-3/4 md:w-1/2 max-w-xl rounded shadow-md shadow-neutral-900 bg-neutral-300 p-4 items-start space-y-2"
        onSubmit={submitForm}
      >
        <h3 className="font-roboto font-bold md:text-xl">Add a new task:</h3>
        <div className="flex flex-col w-full">
          <label className="font-roboto font-bold text-black" htmlFor="title">
            Title:{" "}
          </label>
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
          <label className="font-roboto font-bold text-black" htmlFor="desc">
            Description:{" "}
          </label>
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
          <button className="bg-red-800 p-1 rounded" onClick={hideModalHandler}>
            {/* <span className=" font-roboto text-sm font-bold">Cancel</span> */}
            <XMark className="text-white" />
          </button>
          <button className="bg-green-800 p-1 rounded" type="submit"><Check className="text-white" /></button>
        </div>
      </form>
    </div>
  );
};
