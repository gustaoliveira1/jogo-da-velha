import { motion } from "framer-motion";
import { BsCircle, BsXLg } from "react-icons/bs"

const Box = (props) => {
  return (
    <div
      className="bg-zinc-800 h-38 w-38 rounded-lg flex justify-center items-center cursor-pointer"
      onClick={props.onClick}
    >
      {props.boxValue == 1 ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <BsCircle className="text-5xl h-12" />
        </motion.div>
      ) : (
        <div className="h-12"></div>
      )}
      {props.boxValue == 2 ? (
        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        >
            <BsXLg className="text-5xl h-12" />
        </motion.div>
      ) : (
        <div className="h-12"></div>
      )}
    </div>
  );
};

export default Box;
