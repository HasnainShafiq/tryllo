export const Task = ({description, title, order, _id, logTaskData}) => {


    // func to send task id, title, and description up to App.jsx -> from there, it will all be sent to EditTask.jsx.
    const sendTaskData = () => {
        logTaskData(_id, title, description)
    }
    
    const deleteTaskHandler = async (id) => {

        const responseOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }

        await fetch(`http://localhost:5000/api/board/tasklists/${id}`, responseOptions)
    }

    return (
        
        // assign the prop _id to the parent element 
        <li id={_id} className="flex flex-col p-4 bg-slate-400" >
        <h1>Title: {title}</h1>
        <p>desc: {description}</p>
        <p>order: {order}</p>
        <button onClick={sendTaskData}>edit</button>
        <button onClick={()  => deleteTaskHandler(_id)}>delete</button>
      </li>
    )
}