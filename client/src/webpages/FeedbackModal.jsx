import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../features/auth/auth.context';

const FeedbackModal = ({ isOpen, onClose }) => {
    const { user, isAuthenticated } = useAuth();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert("Please write your feedback");
            return;
        }

        setLoading(true);
        setSuccess(false);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                alert("Please login first");
                return;
            }
            await axios.post(
                'http://localhost:3000/api/feedback/submit',
                { rating, comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(true);

            setTimeout(() => {
                onClose();
                setComment('');
                setRating(5);
                setSuccess(false);
            }, 1500);

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to submit feedback.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center px-3 sm:px-6 py-4">

            {/* Modal */}
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_.25s_ease]">

                {/* Header */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 sm:px-7 py-4 sm:py-6">
                    <h2 className="text-lg sm:text-2xl font-bold">
                        Share Your Feedback
                    </h2>
                    <p className="text-blue-100 text-xs sm:text-sm mt-1">
                        Help us improve your experience 🚀
                    </p>
                </div>

                {/* Body */}
                <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6">
                    {!isAuthenticated ? (
                        <div className="text-center py-6 sm:py-10">
                            <div className="text-4xl sm:text-6xl mb-4">🔒</div>
                            <h3 className="text-base sm:text-xl font-semibold mb-2">
                                Sign in to continue
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm mb-6">
                                You need to be signed in to submit feedback.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                            >
                                Go to Sign In
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>

                            {/* User Info */}
                            <div className="flex items-center gap-3 sm:gap-4 mb-5 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl">
                                <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-base sm:text-xl">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-sm sm:text-base truncate">
                                        {user?.name}
                                    </p>
                                    <p className="text-[11px] sm:text-sm text-gray-500 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="mb-5">
                                <p className="text-sm sm:text-base font-medium text-gray-700 mb-2">
                                    How would you rate our website?
                                </p>

                                <div className="flex justify-center sm:justify-start gap-2 sm:gap-3 text-2xl sm:text-4xl md:text-5xl">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`transition-transform duration-200 hover:scale-125 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>

                                <p className="text-[11px] sm:text-sm text-gray-500 mt-2 text-center sm:text-left">
                                    {rating} star{rating > 1 ? 's' : ''}
                                </p>
                            </div>

                            {/* Textarea */}
                            <div className="mb-5">
                                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                                    Your Feedback
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="What do you like? What can we improve?"
                                    className="w-full h-28 sm:h-36 md:h-40 p-3 sm:p-4 border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none"
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={loading}
                                    className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition text-sm sm:text-base"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading || !comment.trim()}
                                    className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition text-sm sm:text-base"
                                >
                                    {loading ? 'Submitting...' : 'Submit Feedback'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Success Overlay */}
                {success && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-2xl sm:rounded-3xl px-4">
                        <div className="text-center">
                            <div className="text-4xl sm:text-6xl mb-3">🎉</div>
                            <h3 className="text-lg sm:text-2xl font-bold text-green-600">
                                Thank You!
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm mt-2">
                                Your feedback has been received.
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default FeedbackModal;