import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../features/auth/auth.context';
import { MessageCircle, LogIn } from 'lucide-react';

const FeedbackSectionpost = () => {
    const { user, isAuthenticated } = useAuth();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert("Please write your feedback before submitting.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Please login again");
                return;
            }

            await axios.post(
                // 'http://localhost:3000/api/feedback/submit',
                `${import.meta.env.VITE_API_URL}/api/feedback/submit`,
                { rating, comment },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSuccess(true);
            setComment('');
            setRating(5);

            // Auto hide success message
            setTimeout(() => setSuccess(false), 3000);

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to submit feedback. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Not Logged In View
    if (!isAuthenticated) {
        return (
            <div className="py-24 px-6 bg-gradient-to-br from-slate-950 to-slate-900">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-12 text-center">
                        <div className="mx-auto w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                            <MessageCircle className="w-12 h-12 text-purple-400" />
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4">
                            Want to Share Feedback?
                        </h3>
                        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
                            Help us improve the resume builder by sharing your experience.
                        </p>

                        <button
                            onClick={() => (window.location.href = '/login')}
                            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
                        >
                            <LogIn className="w-5 h-5" />
                            Sign in to Give Feedback
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Logged In View - Feedback Form
    return (
        <div className="py-24 px-6 bg-gradient-to-br from-slate-950 to-slate-900" id="feedback">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-3">Share Your Feedback</h2>
                    <p className="text-gray-400">We value your opinion and use it to improve our platform</p>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14">
                    
                    {/* User Info */}
                    <div className="flex items-center gap-5 mb-10 p-5 bg-white/5 rounded-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <p className="text-white font-semibold text-xl">{user?.name}</p>
                            <p className="text-gray-400">{user?.email}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Rating */}
                        <div>
                            <label className="block text-gray-300 text-lg mb-4">How would you rate our resume builder?</label>
                            <div className="flex gap-4 text-6xl">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`transition-all hover:scale-125 ${star <= rating ? 'text-yellow-400' : 'text-gray-700'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <p className="mt-3 text-gray-400">{rating} / 5 stars</p>
                        </div>

                        {/* Feedback Text */}
                        <div>
                            <label className="block text-gray-300 text-lg mb-3">Your Feedback</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="What did you like? What can we improve? Any suggestions?"
                                className="w-full h-44 bg-slate-900 border border-white/20 rounded-2xl p-6 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-y"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !comment.trim()}
                            className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                        >
                            {loading ? "Submitting Feedback..." : "Submit Feedback"}
                        </button>
                    </form>

                    {/* Success Message */}
                    {success && (
                        <div className="mt-8 p-6 bg-green-500/20 border border-green-500/30 rounded-2xl text-center">
                            <p className="text-green-400 text-lg font-medium">🎉 Thank You!</p>
                            <p className="text-gray-300 mt-1">Your feedback has been successfully submitted.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackSectionpost;