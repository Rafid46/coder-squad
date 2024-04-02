/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import { useState } from "react";

import Swal from "sweetalert2";
import Lottie from "lottie-react";
import ani from "../../assets/animation/todo.json";
import ani2 from "../../assets/animation/ongoing.json";
import ani3 from "../../assets/animation/completed.json";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { GoUpload } from "react-icons/go";
import { useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
const ShowTask = ({ task }) => {
  const axiosPublic = useAxios();
  //   const { data: tasks = [] } = useQuery({
  //     queryKey: ["tasks"],
  //     queryFn: async () => {
  //       const res = await axiosPublic.get("/todo/tasks");
  //       return res.data;
  //     },
  //   });
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(task);
  console.log(inputValue);
  //   console.log(isDragging);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/todo/tasks/${id}`).then((res) => {
          console.log(res.data);
          queryClient.invalidateQueries();
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted",
            icon: "success",
          });
        });
      }
    });
  };
  //   update
  const handleUpdate = (id) => {
    axiosPublic.patch(`/todo/tasks/update/${id}`, inputValue).then((res) => {
      console.log(res.data);
      queryClient.invalidateQueries();
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "task name has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    setEditing(false);
  };
  const queryClient = useQueryClient();
  // complete
  const handleComplete = () => {
    // const complete = {
    //   status: "Complete",
    // };
    axiosPublic.patch(`/todo/tasks/complete/${task._id}`).then((res) => {
      console.log(res);
      queryClient.invalidateQueries();
      Swal.fire("Task complete");
    });
  };
  return (
    <div>
      <div className="mt-10 w-96 rounded-md bg-transparent m-5 border-2 border-gray-300 p-5 pt-5 pb-0">
        <div className="mb-5 shadow-lg backdrop-blur-sm bg-opacity-20 bg-white h-[90px] mx-auto gap-5 border-gray-400 rounded-md p-2">
          <div className="flex items-center justify-evenly mb-5">
            <h1
              className={`text-3xl text-center font-bold my-2 ${
                task?.status === "Ongoing"
                  ? "text-pink-500"
                  : task?.status === "Complete"
                  ? "text-teal-300"
                  : "text-white"
              }`}
            >
              {task?.status}
            </h1>
            {task?.status === "Todo" ? (
              <div className="w-[100px]">
                <Lottie animationData={ani} loop={true}></Lottie>
              </div>
            ) : task?.status === "Ongoing" ? (
              <div className="w-[100px]">
                <Lottie animationData={ani2} loop={true}></Lottie>
              </div>
            ) : (
              <div className="w-[70px]">
                <Lottie animationData={ani3} loop={true}></Lottie>
              </div>
            )}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="mt-1 mb-4 p-4 py-2 border-[1px]  border-gray-300 rounded-md text-sm text-white shadow-sm">
            <span className="font-bold">Name : </span>
            {editing ? (
              <input
                onChange={(e) =>
                  setInputValue({ ...inputValue, name: e.target.value })
                }
                autoFocus={true}
                className="cursor-pointer p-1 bg-transparent"
                type="text"
                value={inputValue.name}
              />
            ) : (
              <span className="">{task?.name}</span>
            )}
          </h3>
          <div className="mt-1 mb-4 p-4 py-2 border-[1px]   border-gray-300 rounded-md  text-sm text-white shadow-sm">
            <span className="font-bold">Description :</span>{" "}
            <div className="flex items-center">
              {editing ? (
                <textarea
                  className="textarea w-full cursor-pointer border-black mt-2 text-black"
                  type="text"
                  value={inputValue.description}
                  placeholder="Bio"
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              ) : (
                <span className="">{task?.description}</span>
              )}
            </div>
          </div>
          <p className="mt-1 mb-4 p-4 py-2 border-[1px]   border-gray-300 rounded-md  text-sm text-white shadow-sm">
            <span className="font-bold">DeadLine :</span>{" "}
            {editing ? (
              <input
                onChange={(e) =>
                  setInputValue({ ...inputValue, deadline: e.target.value })
                }
                className="cursor-pointer bg-transparent"
                type="date"
                value={inputValue.deadline}
              />
            ) : (
              <span>{task?.deadline}</span>
            )}
          </p>
          <p className="mt-1 mb-4 p-4 py-2 border-[1px]   border-gray-300 rounded-md  text-sm text-white shadow-sm">
            <span className="font-bold">Priority :</span>{" "}
            {editing ? (
              <select
                onChange={(e) =>
                  setInputValue({ ...inputValue, priority: e.target.value })
                }
                type="text"
                value={inputValue.priority}
                className="select select-bordered w-60 max-w-xs cursor-pointer text-black"
              >
                <option className="text-blue-400">Low</option>
                <option className="text-green-400">Moderate</option>
                <option className="text-orange-400">High</option>
              </select>
            ) : (
              <span
                className={`${
                  task?.priority === "Low"
                    ? "text-blue-600 font-bold"
                    : task?.priority === "Moderate"
                    ? "text-green-400 font-bold"
                    : "text-red-600 font-bold"
                }`}
              >
                {task?.priority}
              </span>
            )}
          </p>
          <div>
            {task?.status === "Todo" ? (
              <button
                onClick={() => handleComplete(task)}
                className="mt-2 overflow-hidden relative w-28  py-3  bg-[#190B14] text-white border-none rounded-md text-sm font-medium cursor-pointer group"
              >
                Make it
                <span className="absolute w-28 h-28 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                <span className="absolute w-28 h-28 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                <span className="absolute w-28 h-28 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-[12px] left-[20px] z-10">
                  Complete
                </span>
              </button>
            ) : (
              <button className="mt-2 overflow-hidden relative w-28  py-3  bg-purple-500 text-white border-none rounded-md text-sm font-medium cursor-pointer group">
                Completed
                <span className="absolute w-28 h-28 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                <span className="absolute w-28 h-28 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                <span className="absolute w-28 h-28 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-[12px] left-[20px] z-10">
                  Completed
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-start mb-5">
          {editing ? (
            <div>
              <button
                type="submit"
                onClick={() => handleUpdate(task?._id)}
                className="btn border-2 bg-transparent text-teal-400 mr-1"
              >
                Update
                <GoUpload className="" />
              </button>
              {editing && (
                <button onClick={() => setEditing(false)} className="btn  mr-1">
                  cancel
                  <MdOutlineCancel className="" />
                </button>
              )}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setEditing(true)}
                className="btn rounded-md  bg-[#7F27FF] hover:text-white hover:scale-95 border-none  text-white mr-2"
              >
                Edit
                <CiEdit className="" />
              </button>
            </div>
          )}
          <button
            onClick={() => handleDelete(task?._id)}
            className="btn rounded-md border-[1px] hover:text-white hover:bg-transparent  text-white mr-1 bg-transparent border-gray-100"
          >
            Delete
            <MdOutlineDeleteOutline className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
