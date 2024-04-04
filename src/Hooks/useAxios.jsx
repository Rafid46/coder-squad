import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://coder-squad-lj4z.onrender.com",
});
const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
