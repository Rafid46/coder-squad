import { useContext, useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";

import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import AllTasks from "../Components/Tasks/AllTasks";
const Home = () => {
  const axiosPublic = useAxios();
  const user = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // Renamed to isLoading
  const {
    data: tasks,
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["tasks-xyz"],
    queryFn: async () => {
      if (user?.user?.email) {
        const res = await axiosPublic.get(
          `/todo/tasks/?email=${user?.user?.email}`
        );
        return res.data;
      }
      return null;
    },
    enabled: !!user?.user?.email, // Enable query when user email is available
    onSuccess: () => setIsLoading(false), // Update loading state when data is fetched
  });

  useEffect(() => {
    if (!loading) {
      setIsLoading(false); // Update loading state based on isPending
    }
  }, [loading]);

  return (
    <div className="my-10 max-w-screen-xl mx-auto">
      <div className="flex items-center">
        {" "}
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
      <div className="bg-cover bg-center rounded-lg">
        {isLoading ? (
          <p>Loading.....</p>
        ) : (
          <AllTasks loading={loading} tasks={tasks} refetch={refetch} />
        )}
      </div>
    </div>
  );
};

export default Home;
