import {useContext, useEffect} from "react";
import useAxios from "../Hooks/useAxios";

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import AllTasks from "../Components/Tasks/AllTasks";

const Home = () => {
  const axiosPublic = useAxios();
  const user = useContext(AuthContext);
  const { data: tasks, refetch, isPending: loading } = useQuery({
    queryKey: ["tasks-xyz"],
    queryFn: async () => {
      if (user?.user?.email) {
        const res = await axiosPublic.get(`/todo/tasks/?email=${user?.user?.email}`);
        return res.data;
      }

      return null
    },
    enabled: false
  });

  useEffect(() => {
    refetch()
  }, [user?.user]);

  return (
    <div className="my-10 max-w-screen-xl mx-auto">
      <div className="flex items-center">
        {" "}
        <p className="text-5xl my-10 font-bold text-[#7F27FF] mr-4">Tasks</p>
      </div>
      <p className="w-fit py-2 px-5 mb-3 border-[1px] border-gray-400 rounded-lg">
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
      </p>
      <div className="bg-cover bg-center h-[900px] py-10 rounded-lg">
        <AllTasks loading={loading} tasks={tasks} refetch={refetch} />
      </div>
    </div>
  );
};

export default Home;
