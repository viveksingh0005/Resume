import { useState } from 'react'
import NavBar from './Nav'
import { NavLink,useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Shield, Zap, MapPin, Users,Calendar,Award,Star } from 'lucide-react';
import { motion } from "framer-motion";
import Footer from './webpages/Footer';
import FeedbackModal from './webpages/FeedbackModal';
import Contact from './webpages/Contact';
import About from './webpages/About';
import Service from './webpages/Service';
export const Home = () => {
  const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();
  return (
    <>
      <NavBar />

      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium tracking-widest text-purple-300">Fastest ,Easiest</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white tracking-tighter">
                Build a Resume That<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400">
                  Actually Gets You Hired
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-lg">
                Professional, ATS-optimized resumes designed in minutes.
                Used by thousands to land jobs at top companies.
              </p>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  ATS Friendly
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Fast
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Happy Users
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/resume')}   // ← Add onClick
                  className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg flex items-center gap-3 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                >
                  Create Free Resume
                  <ArrowRight className="w-6 h-6  group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Secondary Button - Navigates to Templates Page */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/templates')}   // ← Add onClick
                  className="px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 border border-white/30 hover:border-white/60 rounded-2xl font-medium text-lg transition-all backdrop-blur-sm"
                >
                  Browse Templates
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex gap-10 pt-8 border-t border-white/10">
                <div>
                  <div className="text-4xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-400">Interview Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white">4.9/5</div>
                  <div className="text-sm text-gray-400">User Rating</div>
                </div>
               
              </div>
            </motion.div>

            {/* Right Visual - Resume Mockup */}
          <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex justify-center mt-12 lg:mt-20"
    >
      <div className="relative w-full max-w-[400px]">
        
        {/* Main Resume Card */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          whileHover={{ y: -8, transition: { duration: 0.4 } }}
        >
          {/* Resume Header */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-8 pt-10 pb-8 text-white relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:20px_20px] opacity-20"></div>
            
            <div className="flex items-start gap-6 relative z-10">
              {/* Profile Picture */}
              <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-5xl shadow-xl flex-shrink-0 border-4 border-white/30"
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                👨‍💼
              </motion.div>

              <div className="space-y-1 pt-2">
                <h3 className="text-3xl font-bold tracking-tight">Rahul Sharma</h3>
                <p className="text-purple-300 text-xl font-medium">Senior Product Designer</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Bengaluru, India
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    4+ years exp
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-8 space-y-9 bg-white">
            
            {/* Experience Section */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <span className="uppercase text-xs tracking-[2px] font-semibold text-gray-500">Experience</span>
              </div>

              <div className="space-y-8">
                {/* Experience 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-lg leading-tight">Product Designer</div>
                      <div className="text-purple-600 font-medium">Google • India</div>
                    </div>
                    <div className="text-right text-sm text-gray-500">2023 — Present</div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    Leading design system for Search &amp; AI products. Increased user engagement by 43%.
                  </p>
                </motion.div>

                {/* Experience 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-lg leading-tight">UI/UX Designer</div>
                      <div className="text-purple-600 font-medium">Flipkart</div>
                    </div>
                    <div className="text-right text-sm text-gray-500">2021 — 2023</div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    Redesigned checkout flow resulting in 28% higher conversion rate.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Skills / Highlights */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="uppercase text-xs tracking-[2px] font-semibold text-gray-500">Key Highlights</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {["Figma", "Framer", "Design Systems", "User Research", "Prototyping", "AI Tools"].map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-xl hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ATS Score Bar */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-emerald-700">ATS Compatibility</span>
                <span className="text-emerald-600 font-bold text-lg">98%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "98%" }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
       

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-10 -left-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-7 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2"
        >
          <span>Built in just 8 minutes</span>
          <span className="text-xl">⚡</span>
        </motion.div>
      </div>
    </motion.div>
          </div>
        </div>

        {/* Floating Feedback Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-7 py-4 rounded-3xl shadow-2xl flex items-center gap-3 text-base font-semibold z-50 transition-all hover:scale-105 active:scale-95"
        >
          ⭐ Give Feedback
        </button>

        <FeedbackModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </section>
      <section id="services">
        <Service />
      </section>
      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  )
}



