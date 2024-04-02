/* eslint-disable react/jsx-key */

import { IoIosAddCircleOutline } from "react-icons/io";
import ShowTask from "./ShowTask";
import CreateTask from "./CreateTask";

const AllTasks = ({ loading, tasks, refetch }) => {
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-screen-xl mx-auto gap-10">
          {loading ? (
            <p>Loading...</p>
          ) : tasks?.length > 0 ? (
            tasks.map((task) => (
              <ShowTask key={task.id} task={task} refetch={refetch} />
            ))
          ) : (
            <p>No tasks added.</p>
          )}
        </div>
      </div>
      <div className="">
        <div className="">
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="btn hover:text-gray-900 drawer-button rounded-full bg-purple-500 border-none z-50 rounded-tr-none rounded-br-none"
            style={{
              position: "fixed",
              right: "0px",
              bottom: "30px",
            }}
          >
            <span className="text-3xl text-white">
              <IoIosAddCircleOutline />
            </span>
            <p className=" text-white">create</p>
          </button>
        </div>
        <CreateTask refetch={refetch}></CreateTask>
      </div>
    </div>
  );
};

export default AllTasks;
