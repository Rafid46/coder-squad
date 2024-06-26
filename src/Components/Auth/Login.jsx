/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { PiEyeSlash, PiEye } from "react-icons/pi";
import { Toaster, toast } from "react-hot-toast";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //   const location = useLocation();
  const { user } = useContext(AuthContext);
  // console.log(user?.displayName);
  //   const from = location.state?.from?.pathname || "/";
  const { signInUser } = useContext(AuthContext);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then(() => {
        toast.success("Login successful. Redirecting to the account page");
        navigate("/");
        return;
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("The password you entered is incorrect");
        } else {
          toast.error("Invalid gmail, Please check your credentials");
        }
        return;
      });
  };
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login successful! Welcome back!");
        const user = result.user;
        // console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login failed. Check your credentials.");
        // console.error(error);
      });
  };
  return (
    <div className="font-poppins flex  items-center justify-center h-screen">
      <Toaster />
      <section>
        <div className="flex  items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
          <div className="bg-gray-100 border-[1px] border-zinc-400 rounded-lg xl:mx-auto xl:w-96 px-9 py-8 xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center"></div>
            <h2 className="tracking-[1px] font-neue text-start text-3xl font-bold text-[#007F73]">
              Sign in
            </h2>
            <p className="mt-2 text-start text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-green-600 hover:text-blue-800 hover:underline">
                  Create a free account
                </span>
              </Link>
            </p>
            <form onSubmit={handleLogin} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      required="true"
                      name="email"
                      placeholder="Email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <a
                      className="text-sm font-normal text-zinc-400 hover:underline"
                      title=""
                      href="#"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      required="true"
                      name="password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <span
                      className="absolute top-[10px] right-5 text-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <PiEye> </PiEye>
                      ) : (
                        <PiEyeSlash> </PiEyeSlash>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#12372A] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#007F73]"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                onClick={handleGoogleSignIn}
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
  );
};

export default Login;
