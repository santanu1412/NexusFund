import { motion } from 'framer-motion';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function ProgressBar({ current, goal, large = false }) {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  return _jsxDEV(
    'div',
    {
      className: `progress-track ${large ? 'progress-track-lg' : ''}`,
      children: _jsxDEV(
        motion.div,
        {
          className: 'progress-fill',
          initial: {
            width: 0,
          },
          animate: {
            width: `${percentage}%`,
          },
          transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          },
        },
        void 0,
        false
      ),
    },
    void 0,
    false
  );
}
