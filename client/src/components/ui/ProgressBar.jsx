import { motion } from 'framer-motion';

const ProgressBar = ({ progress, color = "cyan" }) => {
  const percentage = Math.min(progress, 100);
  
  return (
    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden relative">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full absolute top-0 left-0 ${
          color === "cyan" ? "bg-cyan shadow-[0_0_10px_#00f5ff]" : "bg-violet"
        }`}
      />
    </div>
  );
};

export default ProgressBar;