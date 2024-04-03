import { useContext, useEffect } from "react";
import useAxios from "../Hooks/useAxios";

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import AllTasks from "../Components/Tasks/AllTasks";
import { Link } from "react-router-dom";
const Home = () => {
  const axiosPublic = useAxios();
  const user = useContext(AuthContext);
  const {
    data: tasks,
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["tasks-xyz"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/todo/tasks/?email=${user?.user?.email}`
      );
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [user?.user, refetch]);
  return (
    <div className="my-10 max-w-screen-xl mx-auto">
      <div className="flex items-center">
        <p className="text-5xl my-10 font-bold text-[#7F27FF] mr-4">Tasks</p>
      </div>
      {/* <p className="w-fit py-2 px-5 mb-3 border-[1px] border-gray-400 rounded-lg">
        <p className="text-xl text-purple-500 font-semibold">
          Total tasks:
          <span> {tasks?.length}</span>
        </p>
        <br />
        <p className="text-xl text-blue-400 font-semibold">
          Completed tasks:
          <span>
            {tasks?.filter((task) => task?.status === "Completed").length}
          </span>
        </p>
      </p> */}
      {/* {!user?.user && (
        <Link
          to="/login"
          className="bg-[#7F27FF] text-white px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Get Started
        </Link>
      )} */}
      <div className="bg-cover bg-center rounded-lg">
        {loading || tasks === undefined ? (
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : tasks && tasks.length > 0 ? (
          <AllTasks tasks={tasks} refetch={refetch} />
        ) : (
          <p>No Tasks Added!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
