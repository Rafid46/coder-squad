/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { IoIosAddCircleOutline } from "react-icons/io";
import ShowTask from "./ShowTask";
import CreateTask from "./CreateTask";
import { AnimatePresence, motion } from "framer-motion";

const AllTasks = ({ tasks, refetch }) => {
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-screen-xl mx-auto">
          {tasks.map((task) => (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ShowTask key={task.id} task={task} refetch={refetch} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
