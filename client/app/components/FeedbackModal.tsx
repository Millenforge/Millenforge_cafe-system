'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0);
      setComment('');
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
          >
            {isSubmitted ? (
              <div className="p-12 text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Thank You!</h2>
                  <p className="text-foreground/60">Your feedback helps us brew better experiences.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-border flex justify-between items-center bg-coffee-50 dark:bg-coffee-900/20">
                  <div>
                    <h2 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100">Rate Your Experience</h2>
                    <p className="text-xs text-foreground/40 mt-1 uppercase tracking-widest font-bold">Feedback & Ratings</p>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 shadow-sm transition-all">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                  <div className="text-center space-y-4">
                    <p className="text-sm font-bold text-foreground/60">How was your visit today?</p>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="transition-transform active:scale-125"
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star 
                            className={`w-10 h-10 transition-colors ${
                              star <= (hover || rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-xs font-medium text-coffee-600">
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent!"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-coffee-600" /> 
                      Your Comments (Optional)
                    </label>
                    <textarea 
                      rows={3}
                      placeholder="What did you love? Any suggestions?"
                      className="w-full p-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-coffee-500 outline-none resize-none transition-all"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={rating === 0}
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${
                      rating > 0 
                        ? 'bg-coffee-600 text-white hover:bg-coffee-700 shadow-coffee-600/30' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
