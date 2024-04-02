import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTanQuery = () => {
  const axiosPublic = useAxios();
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/todo/tasks");
      return res.data;
    },
  });

  return { tasks, refetch };
};

export default useTanQuery;
