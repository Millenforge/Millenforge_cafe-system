'use client';

import { motion } from 'framer-motion';
import { Award, Star, MessageSquare, Gift, Heart, ArrowRight } from 'lucide-react';
import { useLoyaltyStore } from '../store/loyaltyStore';

interface CustomerHubProps {
  onOpenFeedback: () => void;
}

export default function CustomerHub({ onOpenFeedback }: CustomerHubProps) {
  const { points } = useLoyaltyStore();

  return (
    <section className="py-24 bg-gradient-to-br from-coffee-900 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-coffee-800/50 rounded-full border border-coffee-700 mb-6"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-coffee-200">Exclusive Community</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">The Brew & Bites <span className="text-coffee-500">Hub</span></h2>
          <p className="text-coffee-200/60 max-w-2xl mx-auto text-lg">Your home for rewards, feedback, and exclusive member-only perks.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Loyalty Card */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="lg:col-span-2 bg-coffee-800/30 backdrop-blur-xl border border-coffee-700 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
              <div className="space-y-8 flex-grow">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Loyalty Rewards</h3>
                  <p className="text-coffee-200/50">Earn points on every purchase and unlock delicious gifts.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Points', value: points, icon: Award },
                    { label: 'Rank', value: 'Silver', icon: Star },
                    { label: 'Goal', value: '500', icon: Gift },
                  ].map((item, i) => (
                    <div key={i} className="bg-coffee-900/50 p-4 rounded-2xl border border-coffee-700/50">
                      <item.icon className="w-5 h-5 text-coffee-500 mb-2" />
                      <p className="text-2xl font-bold">{item.value}</p>
                      <p className="text-xs text-coffee-200/40 uppercase tracking-tighter">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-200/60 font-medium">Progress to Gold Rank</span>
                    <span className="text-coffee-500 font-bold">{Math.round((points/500)*100)}%</span>
                  </div>
                  <div className="h-3 w-full bg-coffee-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(points/500)*100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-coffee-600 to-coffee-400"
                    />
                  </div>
                </div>
              </div>

              <div className="md:w-64 flex flex-col justify-between gap-6">
                <div className="bg-coffee-900/80 p-6 rounded-3xl border border-coffee-700 text-center">
                  <Gift className="w-10 h-10 text-coffee-500 mx-auto mb-4" />
                  <p className="text-sm font-bold text-coffee-200 mb-1">Next Reward</p>
                  <p className="text-lg font-extrabold text-white">Free Cappuccino</p>
                </div>
                <button className="w-full py-4 bg-coffee-600 hover:bg-coffee-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-coffee-600/20 group">
                  Redeem Now
                  <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-coffee-600/20 rounded-full blur-3xl group-hover:bg-coffee-500/30 transition-all duration-700" />
          </motion.div>

          {/* Feedback & Ratings Column */}
          <div className="flex flex-col gap-8">
            {/* Feedback Box */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex-grow bg-gradient-to-br from-coffee-800/40 to-coffee-900/40 backdrop-blur-xl border border-coffee-700 rounded-[2.5rem] p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 bg-coffee-700 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-coffee-400" />
                </div>
                <h3 className="text-2xl font-bold">Your Opinion Matters</h3>
                <p className="text-coffee-200/50 text-sm leading-relaxed">Help us improve! Every piece of feedback earns you <span className="text-coffee-400 font-bold">50 bonus points</span>.</p>
              </div>
              <button 
                onClick={onOpenFeedback}
                className="w-full mt-8 py-4 bg-white text-coffee-900 rounded-2xl font-bold hover:bg-coffee-50 transition-all shadow-lg"
              >
                Submit Feedback
              </button>
            </motion.div>

            {/* Referral Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-amber-500 rounded-[2.5rem] p-8 text-coffee-900 relative overflow-hidden"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 fill-coffee-900" />
                  <h3 className="text-xl font-bold">Refer a Friend</h3>
                </div>
                <p className="text-sm font-bold opacity-70">Invite a friend and both get ₹50 off on your next order!</p>
                <button className="text-xs font-extrabold uppercase tracking-widest bg-coffee-900 text-white px-4 py-2 rounded-lg">Invite Now</button>
              </div>
              <Gift className="absolute -bottom-4 -right-4 w-24 h-24 text-coffee-900/10 -rotate-12" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
