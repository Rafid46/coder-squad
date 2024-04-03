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
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
const ShowTask = ({ task, refetch }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
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
          refetch();
          console.log(res.data);

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
      refetch();
      console.log(res.data);
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

  // complete
  const handleComplete = () => {
    // const complete = {
    //   status: "Complete",
    // };
    axiosPublic.patch(`/todo/tasks/complete/${task._id}`).then((res) => {
      console.log(res);
      refetch();
      Swal.fire("Task complete");
    });
  };
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription =
    task?.description.length > 24
      ? task?.description.substring(0, 24) + "..."
      : task?.description;
  return (
    <div>
      <div
        className={`mt-10 w-96 rounded-[30px]  m-5 p-5 pt-5 pb-1 ${
          task?.status === "Todo" ? "bg-[#F3B664]" : "bg-[#4CCD99]"
        }`}
      >
        <div className="mb-5 mx-auto border-gray-400 rounded-md">
          <div className=" ml-4 mb-5">
            <h1
              className={`text-2xl text-zinc-800 text-start font-bold my-2 ${
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
                {/* <Lottie animationData={ani} loop={true}></Lottie> */}
              </div>
            ) : task?.status === "Ongoing" ? (
              <div className="w-[100px]">
                {/* <Lottie animationData={ani2} loop={true}></Lottie> */}
              </div>
            ) : (
              <div className="w-[70px]">
                {/* <Lottie animationData={ani3} loop={true}></Lottie> */}
              </div>
            )}
          </div>
        </div>
        <div className="mb-8 min-h-[250px]">
          <h3 className="mt-1 p-4 py-2  text-base text-zinc-800">
            {/* <span className="font-bold">Name : </span> */}
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
          <div className="mb-4 p-4 py-2 text-xl  text-zinc-800">
            {/* <span className="font-bold">Description :</span>{" "} */}
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
                <div className="">
                  <div>
                    {showFullDescription ? (
                      <span>{task?.description}</span>
                    ) : (
                      <span>{truncatedDescription}</span>
                    )}
                  </div>
                  <div>
                    {task?.description.length > 24 && !editing && (
                      <button
                        onClick={toggleDescription}
                        className="text-gray-200 text-xs cursor-pointer focus:outline-none"
                      >
                        {showFullDescription ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr className="w-1/2 ml-4 bg-gray-600" />
          <p className="p-4 py-2   text-xs text-zinc-800">
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
          <p className="mb-4 p-4 py-2   text-sm text-zinc-800">
            {/* <span className="font-bold">Priority :</span>{" "} */}
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
                    ? "text-blue-600 font-semibold"
                    : task?.priority === "Moderate"
                    ? "text-purple-600 font-semibold"
                    : "text-red-600 font-semibold bg-white  px-4 py-1 rounded-2xl"
                }`}
              >
                {task?.priority}
              </span>
            )}
          </p>
          <div>
            {task?.status === "Todo" && (
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
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mb-5 relative">
          {editing ? (
            <div>
              <button
                type="submit"
                onClick={() => handleUpdate(task?._id)}
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-[#7747FF] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200 mr-4"
              >
                Update
                {/* <GoUpload className="" /> */}
              </button>
              {/* 
              <button
                type="submit"
                className="btn border-[1px] rounded-xl bg-transparent text-white  mr-4"
              >
                Update
                <GoUpload className="" />
              </button> */}
              {editing && (
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-full  border-[1px] border-white  p-4 hover:bg-white"
                >
                  <MdOutlineCancel />
                </button>
              )}
            </div>
          ) : (
            <div className="absolute left-[240px] mb-10">
              <button
                onClick={() => setEditing(true)}
                className="rounded-full  p-4  bg-[#7F27FF] hover:text-white hover:scale-95 text-white"
              >
                <AiFillEdit />
              </button>
            </div>
          )}
          {!editing && (
            <div className="absolute left-[300px] mb-10">
              <button
                onClick={() => handleDelete(task?._id)}
                className="rounded-full hover:text-black border-[1px] border-white p-4 hover:bg-white text-white mr-1"
              >
                <MdOutlineDelete />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
