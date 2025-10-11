import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              TimeFlow
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-slate-300 hover:text-white transition-colors">Features</button>
            <button className="text-slate-300 hover:text-white transition-colors">About</button>
            <select className="bg-slate-800 text-slate-300 px-3 py-2 rounded-lg border border-slate-700 outline-none">
              <option>RO</option>
              <option>EN</option>
            </select>
            <Button variant="primary" size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button className="block text-slate-300 hover:text-white transition-colors">Features</button>
            <button className="block text-slate-300 hover:text-white transition-colors">About</button>
            <Button variant="primary" size="sm" onClick={handleGetStarted} className="w-full">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};