import React from 'react';
import { FileText, Sparkles, Users, Award, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Service = () => {
  const navigate = useNavigate();

  const handleResumeClick = () => {
    navigate('/resume');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#7c3aed40_0%,transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="uppercase tracking-[3px] text-sm font-medium">OUR SERVICES</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Professional Resumes<br />
            That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Get You Hired</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            Stand out from the crowd with ATS-optimized, beautifully designed resumes 
            crafted by experts who understand what recruiters love.
          </p>

          <button
            onClick={handleResumeClick}
            className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg flex items-center gap-4 mx-auto hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-purple-500/40"
          >
            Build My Resume Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Services Highlight */}
      <div className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Why Choose Our Resume Service?</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            We don't just make resumes — we create career opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FileText className="w-10 h-10" />,
              title: "ATS Optimized",
              desc: "Designed to pass Applicant Tracking Systems with perfect keyword matching and clean formatting."
            },
            {
              icon: <Sparkles className="w-10 h-10" />,
              title: "Stunning Design",
              desc: "Modern, elegant layouts that make your achievements pop while remaining professional."
            },
            {
              icon: <Users className="w-10 h-10" />,
              title: "Expert Writers",
              desc: "Crafted by seasoned HR professionals and career coaches with 10+ years of experience."
            },
            {
              icon: <Award className="w-10 h-10" />,
              title: "Proven Results",
              desc: "Our clients have landed interviews at top companies like Google, Amazon, and Microsoft."
            },
            {
              icon: <Clock className="w-10 h-10" />,
              title: "Fast Delivery",
              desc: "Get your professional resume in 24-48 hours. Express delivery available."
            },
            {
              icon: <FileText className="w-10 h-10" />,
              title: "Multiple Formats",
              desc: "Receive your resume in PDF, Word, and LinkedIn-optimized versions."
            }
          ].map((service, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 p-10 rounded-3xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing / CTA Section */}
      <div className="bg-black/60 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 px-8 py-2 rounded-full mb-8">
            Start getting more opportunities with better resume
          </div>

          <h2 className="text-5xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto">
            Join hundreds of professionals who transformed their careers with our amazing resume service.
          </p>

          <button
            onClick={handleResumeClick}
            className="px-12 py-6 bg-white text-black font-semibold text-xl rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-4 mx-auto group"
          >
            Create Professional Resume
            <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </button>

          <p className="text-xs text-gray-500 mt-8">100% Satisfaction Guarantee • Unlimited Revisions</p>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-75">
          <div className="text-2xl font-light tracking-widest">GOOGLE</div>
          <div className="text-2xl font-light tracking-widest">AMAZON</div>
          <div className="text-2xl font-light tracking-widest">MICROSOFT</div>
          <div className="text-2xl font-light tracking-widest">FLIPKART</div>
          <div className="text-2xl font-light tracking-widest">SWIGGY</div>
        </div>
      </div>
    </div>
  );
};

export default Service;