// src/components/FeedbackModal.js
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
      await axios.post(
        '/api/feedback/submit',
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-3 sm:p-6">
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg sm:max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_.3s_ease]">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 sm:p-7">
          <h2 className="text-xl sm:text-2xl font-bold">Share Your Feedback</h2>
          <p className="text-blue-100 text-sm sm:text-base mt-1">
            Help us improve your experience 🚀
          </p>
        </div>

        <div className="p-5 sm:p-8">
          {!isAuthenticated ? (
            <div className="text-center py-6 sm:py-10">
              <div className="text-5xl sm:text-6xl mb-4">🔒</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Sign in to continue
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                You need to be signed in to submit feedback.
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* User Info */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold text-blue-600">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-lg">{user?.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <p className="font-medium text-gray-700 text-sm sm:text-base mb-2">
                  How would you rate our website?
                </p>
                <div className="flex gap-2 sm:gap-3 text-3xl sm:text-5xl justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`transition-transform duration-200 hover:scale-125 ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center sm:text-left">
                  {rating} star{rating > 1 ? 's' : ''}
                </p>
              </div>

              {/* Textarea */}
              <div className="mb-6">
                <label className="block font-medium text-gray-700 text-sm sm:text-base mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What do you like? What can we improve?"
                  className="w-full h-32 sm:h-40 p-4 border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition"
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !comment.trim()}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Success Overlay */}
        {success && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-2xl sm:rounded-3xl">
            <div className="text-center animate-bounce">
              <div className="text-5xl sm:text-6xl mb-3">🎉</div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                Thank You!
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
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