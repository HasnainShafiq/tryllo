export const Task = ({description, title, order, _id, clickLogger}) => {

    const clickEventHandler = (e) => {
        clickLogger(e.currentTarget.id)
    }


    return (
        // assign the prop _id to the parent element
        <li id={_id} className="flex flex-col p-4 bg-slate-400" onClick={clickEventHandler}>
        <h1>Title: {title}</h1>
        <p>desc: {description}</p>
        <p>order: {order}</p>
        <p>id: {_id}</p>
      </li>
    )
}