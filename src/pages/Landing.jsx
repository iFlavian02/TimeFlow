import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Bot, Calendar, ArrowRight, Star, Check } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const FeatureCard = ({ icon: Icon, title, description, gradient }) => {
  return (
    <Card hover className="group">
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </Card>
  );
};

const Testimonial = ({ quote, author, role, rating = 5 }) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-lg text-slate-300 mb-4 italic">"{quote}"</p>
      <div>
        <p className="text-white font-semibold">{author}</p>
        <p className="text-slate-400 text-sm">{role}</p>
      </div>
    </Card>
  );
};

const FloatingBlob = () => {
  return (
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "This app completely transformed how I manage my time at UAIC. I finally have balance!",
      author: "Maria Ionescu",
      role: "INFO Year 2"
    },
    {
      quote: "The AI scheduling is incredible. It knows when I study best and plans everything perfectly.",
      author: "Andrei Pop",
      role: "Mathematics Year 3"
    },
    {
      quote: "I never miss classes or gym sessions anymore. TimeFlow keeps me organized effortlessly.",
      author: "Elena Radu",
      role: "Computer Science Year 1"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <FloatingBlob />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Transform Your University Life
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                with Smart Scheduling
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              AI-powered time management designed specifically for UAIC students. 
              Upload your schedule, add your hobbies, and let us create the perfect balance.
            </p>
            
            <Button 
              variant="primary" 
              size="lg" 
              icon={ArrowRight}
              onClick={handleGetStarted}
              className="shadow-2xl shadow-purple-500/30"
            >
              Get Started - Free
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">Three simple steps to a balanced life</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Camera}
              title="Snap Your Schedule"
              description="Just upload a screenshot of your UAIC schedule. Our AI instantly extracts all your classes, labs, and seminars."
              gradient="from-purple-500 to-blue-600"
            />
            
            <FeatureCard
              icon={Bot}
              title="AI Personalization"
              description="Tell us about your hobbies, study habits, and lifestyle. We'll create a complete schedule that balances everything."
              gradient="from-pink-500 to-purple-600"
            />
            
            <FeatureCard
              icon={Calendar}
              title="Auto-Sync Calendar"
              description="Instantly sync your personalized schedule to Google Calendar. Get reminders and access it on all your devices."
              gradient="from-amber-500 to-red-600"
            />
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why TimeFlow?</h2>
              <div className="space-y-4">
                {[
                  'Designed specifically for UAIC schedule formats',
                  'AI balances study time, hobbies, and rest',
                  'Never miss a class or important activity',
                  'Automatic Google Calendar integration',
                  'Get weekly insights and recommendations',
                  'Free for all UAIC students'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-full p-1 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-slate-300 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center px-4">
                    <span className="text-sm font-semibold">08:00 - 10:00 · Matematică</span>
                  </div>
                  <div className="h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center px-4">
                    <span className="text-sm font-semibold">10:30 - 12:00 · Study Time</span>
                  </div>
                  <div className="h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center px-4">
                    <span className="text-sm font-semibold">13:00 - 14:00 · Lunch</span>
                  </div>
                  <div className="h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-lg flex items-center px-4">
                    <span className="text-sm font-semibold">17:00 - 18:30 · Gym</span>
                  </div>
                  <div className="h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center px-4">
                    <span className="text-sm font-semibold">19:00 - 21:00 · Free Time</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Loved by UAIC Students</h2>
            <p className="text-slate-400 text-lg">See what your peers are saying</p>
          </div>
          
          <Testimonial {...testimonials[currentTestimonial]} />
          
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentTestimonial 
                    ? 'bg-purple-500 w-8' 
                    : 'bg-slate-600'
                }`}
                onClick={() => setCurrentTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Schedule?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join hundreds of UAIC students who've found their perfect balance
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            icon={ArrowRight}
            onClick={handleGetStarted}
            className="shadow-2xl shadow-purple-500/30"
          >
            Get Started Now - It's Free
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p className="mb-2">Made with ❤️ for UAIC students</p>
          <p className="text-sm">© 2025 TimeFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;