import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/10 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
            NEXUS<span className="text-white">FUND</span>
          </Link>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            The decentralized launchpad for the next generation of creators, innovators, and dreamers.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/explore" className="hover:text-cyan transition-colors">Browse Campaigns</Link></li>
            <li><Link to="/create" className="hover:text-cyan transition-colors">Start a Project</Link></li>
            <li><Link to="/how-it-works" className="hover:text-cyan transition-colors">How it Works</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-cyan transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-cyan transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-cyan transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Stay Updated</h4>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter email" 
              className="bg-white/5 border border-white/10 rounded-l px-4 py-2 text-sm text-white focus:border-cyan outline-none w-full"
            />
            <button className="bg-cyan text-black font-bold px-4 py-2 rounded-r hover:bg-cyan/90 transition-colors">
              &rarr;
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
        <p>&copy; {new Date().getFullYear()} NexusFund Inc. Built with React & Node.</p>
      </div>
    </footer>
  );
};

export default Footer;