import { XCircle } from "../icons/XCircle";
import { EditIcon } from "../icons/EditIcon";

export const Task = ({ description, title, order, _id, logTaskData }) => {

  const sendTaskData = () => {
    logTaskData(_id, title, description);
  };

  const deleteTaskHandler = async (id) => {
    const responseOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(
      `http://localhost:5000/api/board/tasklists/${id}`,
      responseOptions
    );
  };

  return (

    <li
      id={_id}
      className="relative flex flex-col p-4 bg-gray-200 rounded-sm font-roboto border-l-4 border-orange-700 border-solid max-h-96"
    >
      <h1 className="mt-6 mb-3 p-1 bg-neutral-400 rounded-sm font-bold">{title}</h1>
      <p className="p-1 bg-neutral-400 rounded-sm overflow-y-scroll scrollbar-none scrollbar-track-gray-300 whitespace-pre-line">{description}</p>
      <div className="absolute flex items-center top-2 right-2 justify-around w-[50px]">
        <EditIcon className="hover:bg-neutral-700 hover:text-neutral-300 hover:cursor-pointer p-[1px] rounded-sm transition-colors" taskDataListener={sendTaskData}></EditIcon>
        <XCircle className="hover:bg-red-700 hover:text-neutral-300 hover:cursor-pointer rounded-xl transition-colors" deleteTask={() => deleteTaskHandler(_id)}></XCircle>
      </div>
    </li>
  );
};
