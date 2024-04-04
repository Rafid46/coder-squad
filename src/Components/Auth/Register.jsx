/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password, name } = data;
    createUser(email, password, name)
      .then((result) => {
        toast.success("Account created successfully!");
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="flex  items-center justify-center h-screen">
      <div className="font-poppins">
        <section>
          <div className="flex  items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
            <div className="bg-gray-100 border-[1px] border-zinc-400 rounded-lg xl:mx-auto xl:w-96 px-9 py-8 xl:max-w-sm 2xl:max-w-md">
              <div className="mb-2 flex justify-center"></div>
              <h2 className="tracking-[1px] font-neue text-start text-3xl font-bold text-[#007F73]">
                Create an account
              </h2>
              <p className="mt-2 text-start text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-green-600 hover:text-blue-800 hover:underline">
                    Login
                  </span>
                </Link>
              </p>
              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-900">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("name", {
                          required: "Name is required",
                        })}
                        placeholder="name"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-900">
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("email", {
                          required: "Email is required",
                        })}
                        placeholder="Email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("password", {
                          required: "Password is required",
                        })}
                        placeholder="Password"
                        type="password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      className="inline-flex w-full items-center justify-center rounded-md bg-[#12372A] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#007F73]"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <div className="divider divider-success">or</div>
              <div className="mt-3 space-y-3">
                <button
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                  type="button"
                >
                  <span className="mr-2 inline-block">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </span>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
