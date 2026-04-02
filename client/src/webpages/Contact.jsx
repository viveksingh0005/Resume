import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert("Thank you! We'll get back to you soon ✨");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#7c3aed30_0%,transparent_60%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full mb-8 border border-white/20">
            <Mail className="w-5 h-5 text-purple-400" />
            <span className="uppercase tracking-[3px] text-sm font-medium">Let's Connect</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Get in touch.<br />
            We'd <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">love</span> to hear from you.
          </h1>

          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Or just say hello? 
            Drop us a message and we'll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14">
              <h2 className="text-3xl font-semibold mb-10">Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/20 focus:border-purple-500 rounded-2xl px-6 py-4 text-white placeholder-gray-500 outline-none transition-all"
                      placeholder="Alex Rivera"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/20 focus:border-purple-500 rounded-2xl px-6 py-4 text-white placeholder-gray-500 outline-none transition-all"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 focus:border-purple-500 rounded-2xl px-6 py-4 text-white placeholder-gray-500 outline-none transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    className="w-full bg-white/5 border border-white/20 focus:border-purple-500 rounded-3xl px-6 py-5 text-white placeholder-gray-500 outline-none resize-y transition-all"
                    placeholder="Tell us about your idea..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 hover:from-purple-700 hover:via-violet-700 hover:to-pink-700 transition-all duration-300 text-white font-semibold py-6 rounded-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-70"
                >
                  {submitted ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:col-span-2 space-y-10">
            {/* Office Info */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <MapPin className="text-purple-400" /> Our Studio
              </h3>

              <div className="space-y-8 text-lg">
                <div>
                  <div className="text-gray-400 text-sm mb-1">ADDRESS</div>
                  <p className="leading-relaxed">
                    123 Creative Street,<br />
                    Design District,<br />
                    Bengaluru, Karnataka 560001
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">PHONE</div>
                    <a href="tel:+919876543210" className="hover:text-purple-400 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">EMAIL</div>
                    <a href="mailto:hello@yourstudio.com" className="hover:text-purple-400 transition-colors">
                      hello@yourstudio.com
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> BUSINESS HOURS
                  </div>
                  <p className="text-gray-300">Monday – Friday: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
              <h3 className="text-2xl font-semibold mb-8">Follow Our Journey</h3>
              <div className="flex gap-6">
                {[
                
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    className="w-16 h-16 bg-white/10 hover:bg-purple-600/30 border border-white/20 hover:border-purple-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-3xl p-10 text-center">
              <div className="text-5xl mb-4">✨</div>
              <h4 className="text-2xl font-medium mb-3">We reply fast</h4>
              <p className="text-gray-300">
                Most messages get a personal reply within <span className="text-purple-400 font-medium">24 hours</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Beautiful Section */}
      <div className="border-t border-white/10 py-24 px-6 bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Let's build something<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">beautiful together</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-md mx-auto">
            Whether it's a big idea or a small hello — we're excited to hear from you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;