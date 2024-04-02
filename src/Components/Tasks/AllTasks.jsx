/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

import { IoIosAddCircleOutline } from "react-icons/io";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import ShowTask from "./ShowTask";
import CreateTask from "./CreateTask";

const AllTasks = () => {
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  console.log(user);
  const axiosPublic = useAxios();
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/todo/tasks/?email=${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-screen-xl mx-auto gap-10">
          {loading ? (
            <p>Loading...</p>
          ) : tasks?.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks?.map((task) => (
              <ShowTask key={task.id} task={task} refetch={refetch} />
            ))
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
        <CreateTask></CreateTask>
      </div>
    </div>
  );
};

export default AllTasks;
