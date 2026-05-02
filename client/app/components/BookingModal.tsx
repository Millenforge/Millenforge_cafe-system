'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: ''
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success state
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
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
          >
            {step === 3 ? (
              <div className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Table Reserved!</h2>
                  <p className="text-foreground/60">We've sent a confirmation to your phone. See you soon!</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-xl bg-coffee-600 text-white font-bold hover:bg-coffee-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-border flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-coffee-900 dark:text-coffee-100">Book a Table</h2>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleBooking} className="p-6 space-y-4">
                  {step === 1 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-coffee-600" /> Date
                          </label>
                          <input 
                            type="date" 
                            required
                            className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-coffee-500 outline-none"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4 text-coffee-600" /> Time
                          </label>
                          <input 
                            type="time" 
                            required
                            className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-coffee-500 outline-none"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Users className="w-4 h-4 text-coffee-600" /> Guests
                        </label>
                        <select 
                          className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-coffee-500 outline-none"
                          value={formData.guests}
                          onChange={(e) => setFormData({...formData, guests: e.target.value})}
                        >
                          {[1,2,3,4,5,6,7,8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full py-4 rounded-xl bg-coffee-600 text-white font-bold hover:bg-coffee-700 transition-all mt-4"
                      >
                        Continue
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Your Name"
                          required
                          className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-coffee-500 outline-none"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="Your Phone"
                          required
                          className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-coffee-500 outline-none"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button 
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 py-4 rounded-xl border border-border font-bold hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          className="flex-[2] py-4 rounded-xl bg-coffee-600 text-white font-bold hover:bg-coffee-700 shadow-lg shadow-coffee-600/30"
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
