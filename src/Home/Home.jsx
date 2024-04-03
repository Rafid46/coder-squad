import { useContext, useEffect } from "react";
import useAxios from "../Hooks/useAxios";

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import AllTasks from "../Components/Tasks/AllTasks";
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
    <div className="my-20 max-w-screen-xl mx-auto">
      <div className="flex items-center">
        <p className="text-5xl font-bold text-[#7F27FF] ml-5 lg:ml-0">Tasks</p>
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
      <div className="bg-cover bg-center rounded-lg">
        {loading ? (
          <div className="flex flex-row gap-2 my-5">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : tasks && tasks.length > 0 ? (
          <AllTasks tasks={tasks} refetch={refetch} />
        ) : (
          <p className="text-gray-400">No Tasks Added!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
