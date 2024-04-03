/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RxCross1 } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../Hooks/useAxios";

const CreateTask = ({ refetch }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxios();
  // const queryClient = useQueryClient();
  const onSubmit = (data) => {
    console.log(data);
    const taskData = {
      email: user?.email,
      name: data.name,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
      status: "Todo",
    };
    axiosPublic.post("/todo/tasks", taskData).then((res) => {
      refetch();
      document.getElementById("my_modal_1").close();
      console.log(res.data, "task added");
      reset();
    });
  };

  return (
    <div>
      <div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box shadow-lg backdrop-blur-sm bg-opacity-20 bg-white w-fit px-10 rounded-3xl">
            <div className="modal-action w-fit p-0 mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="mb-5">
                  <form method="dialog">
                    <button className="text-xl mt-5 mr-5 bg-transparent hover:text-red-400 text-white border-none absolute hover:bg-transparent right-[5px] top-0">
                      <RxCross1 />
                    </button>
                  </form>
                  <label className="block text-sm font-medium text-white">
                    Tasks title
                  </label>
                  <input
                    // onChange={(e) =>
                    //   setTask({ ...task, id: uuidv4(), name: e.target.value })
                    // }
                    {...register("name")}
                    type="text"
                    className="mt-1 w-60 p-4 py-2 border-2 rounded-md border-gray-200 bg-transparent text-sm text-gray-100 shadow-sm"
                  />
                  <label className="block text-sm font-medium text-white mt-5">
                    Description
                  </label>
                  <input
                    // onChange={(e) =>
                    //   setTask({ ...task, id: uuidv4(), name: e.target.value })
                    // }
                    {...register("description")}
                    type="text"
                    className="mt-1 w-60 p-4 py-2 border-2 rounded-md border-gray-200 bg-transparent text-sm text-gray-100 shadow-sm"
                  />
                </div>
                <label className="block text-sm font-medium text-white mt-2 mb-2">
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className="select text-white select-bordered w-60 max-w-xs bg-transparent border-2 border-gray-200"
                >
                  <option className="text-blue-400">Low</option>
                  <option className="text-green-400">Moderate</option>
                  <option className="text-orange-400">High</option>
                </select>
                <label className="block text-sm font-medium text-white mt-5 mb-2">
                  Deadline
                </label>
                <input
                  {...register("deadline")}
                  type="date"
                  className="mb-5 w-60 p-4 py-2 border-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <br />
                <button
                  type="submit"
                  className="mb-5 bg-purple-500 text-sm text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none"
                >
                  Create task
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CreateTask;
