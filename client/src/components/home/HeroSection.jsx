import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan text-xs font-bold tracking-widest mb-6">
            NEXT GEN CROWDFUNDING
          </span>
          <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 leading-tight">
            Fund the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Future</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-sora">
            The decentralized platform for visionaries, creators, and tech pioneers. 
            Turn your cyberpunk dreams into reality today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="px-8 py-4 bg-cyan text-dark font-bold font-orbitron rounded-none skew-x-[-10deg] hover:bg-cyan/90 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all"
            >
              <div className="skew-x-[10deg]">START CAMPAIGN</div>
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold font-orbitron rounded-none skew-x-[-10deg] hover:border-violet hover:text-violet hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
            >
              <div className="skew-x-[10deg]">EXPLORE PROJECTS</div>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Diagonal Bottom Cut */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-dark clip-path-polygon-[0_100%,_100%_0,_100%_100%]" 
           style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 50%, 0% 100%)' }} />
    </section>
  );
};

export default HeroSection;