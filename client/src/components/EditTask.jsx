import { useState, useEffect } from "react";

// uses largely the same structure as TaskForm

// takes taskId from App.jsx -> used to configure req params in PUT request. 
export const EditTask = ({taskId, type, taskData}) => {
    const [task, setTask] = useState({
        title: taskData.title,
        desc: taskData.description,
        order: null
      });

      const [order, setOrder] = useState(null);

      
useEffect(() => {
  
    const orderFunc = () => {
        if(type === 'To-do') {
            setOrder(1)
        } else if(type === 'In-Progress') {
            setOrder(2)
        } else if(type === 'Completed') {
            setOrder(3)
        }
    }

  orderFunc();

}, [])


   
    
      // update the form with the title and description
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        setTask((prevState) => ({
          ...prevState,
          [name]: value,
          order: order
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
            body: JSON.stringify(task)
        }
    
        const res = await fetch(
          `http://localhost:5000/api/board/tasklists/${taskId}`, requestOptions
        );
    
        const response = await res.json()
        
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
    
}