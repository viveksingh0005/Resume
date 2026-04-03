import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Clock, User } from 'lucide-react';

const FeedbackSectionGet = () => {
  const [allFeedbacks, setAllFeedbacks] = useState([]);   // Store the actual array
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3000/api/feedback/');

        // Extract the feedbacks array from your controller response
        const feedbacksArray = res.data.feedbacks || res.data.data || [];

        setAllFeedbacks(feedbacksArray);
        setTotalFeedbacks(res.data.totalFeedbacks || feedbacksArray.length);

      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const visibleFeedbacks = allFeedbacks.slice(0, visibleCount);
  const hasMore = visibleCount < allFeedbacks.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, allFeedbacks.length));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  if (loading) return <div className="py-20 text-center text-purple-400">Loading reviews...</div>;
  if (error) return <div className="py-20 text-center text-red-400">{error}</div>;

  return (
    <div className="py-24 px-6 bg-gradient-to-br from-slate-950 to-slate-900" id="reviews">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-gray-400 text-lg">Real feedback from real users</p>
        </div>

        {allFeedbacks.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {visibleFeedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {renderStars(feedback.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                    "{feedback.comment}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold">
                      {(feedback.user?.username || feedback.user?.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {feedback.user?.username || feedback.user?.name || 'Anonymous User'}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See More Button */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-purple-400 rounded-2xl font-medium text-white transition-all flex items-center gap-3"
                >
                  See More Reviews ({allFeedbacks.length - visibleCount} more)
                </button>
              </div>
            )}

            <p className="text-center text-gray-500 mt-8 text-sm">
              Showing {visibleCount} of {allFeedbacks.length} reviews
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackSectionGet;