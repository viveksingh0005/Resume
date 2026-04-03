import React from 'react';
import { Users, Award, Heart, Coffee } from 'lucide-react';


const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e510_0%,transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium tracking-widest">OUR STORY</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
            We craft digital<br />
            experiences that<br />
            <span className="text-purple-400">inspire</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
            A passionate team of creators, thinkers, and builders turning ideas into 
            exceptional digital products.
          </p>

          <div className="flex items-center justify-center gap-4">
         
            <button className="px-8 py-4 border border-white/30 hover:border-white/60 rounded-2xl font-medium transition-all duration-300">
              Our Journey
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="text-xs tracking-widest text-gray-500">SCROLL TO EXPLORE</div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-5 py-2 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-purple-400 text-sm font-medium">
              CHAPTER 01 — THE BEGINNING
            </div>
            
            <h2 className="text-5xl font-bold leading-tight">
              From a small idea<br />to a creative movement
            </h2>
            
            <div className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Founded in 2022, we started with a simple belief: <span className="text-purple-400 font-medium">technology should feel human</span>. 
              Today, we're a team of 28 creatives building digital experiences that people love and remember.
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div>
                <div className="text-4xl font-bold text-purple-400">28</div>
                <div className="text-sm text-gray-400">Creative minds</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400">47</div>
                <div className="text-sm text-gray-400">Projects delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400">12</div>
                <div className="text-sm text-gray-400">Countries reached</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-[3rem] overflow-hidden border border-white/10">
              <img 
                src="https://picsum.photos/id/1015/800/800" 
                alt="Our team working" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-white/10 backdrop-blur-xl px-8 py-6 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-semibold text-lg"> passion</div>
                  <div className="text-sm text-gray-400">Every pixel tells a story</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-black/40 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-400 text-lg">What drives us every single day</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10" />,
                title: "Collaboration",
                desc: "We believe the best ideas come from diverse minds working together."
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Excellence",
                desc: "We don't just meet expectations — we redefine them."
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Empathy",
                desc: "We design with people in mind, not just pixels."
              },
              {
                icon: <Coffee className="w-10 h-10" />,
                title: "Joy",
                desc: "We bring creativity and fun into everything we create."
              }
            ].map((value, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-purple-400 mb-6 transition-transform group-hover:scale-110">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Highlight */}
     

      {/* Final CTA */}
     
    </div>
  );
};

export default About;