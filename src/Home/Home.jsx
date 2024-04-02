import { useContext } from "react";
import useAxios from "../Hooks/useAxios";

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import AllTasks from "../Components/Tasks/AllTasks";
const Home = () => {
  const axiosPublic = useAxios();
  const user = useContext(AuthContext);
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/todo/tasks/?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="my-10 max-w-screen-2xl mx-auto">
      <div className="flex items-center">
        {" "}
        <p className="text-5xl my-10 font-bold text-[#7F27FF] mr-4">
          Todo<span className="font-thin"> Application</span>
        </p>
        <hr className="border-[1px] w-[900px] border-gray-400" />
        <p className="bg-red-500 ml-2 w-[20px] h-[20px] rounded-full"></p>
        <p className="bg-[#7F27FF] ml-2 w-[20px] h-[20px] rounded-full"></p>
        <br />
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
        <AllTasks></AllTasks>
      </div>
    </div>
  );
};

export default Home;
