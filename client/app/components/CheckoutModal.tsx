'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useLoyaltyStore } from '../store/loyaltyStore';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export default function CheckoutModal({ isOpen, onClose, total }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const clearCart = useCartStore((state) => state.clearCart);
  const addPoints = useLoyaltyStore((state) => state.addPoints);

  const handlePayment = () => {
    setStep(2); // Processing
    setTimeout(() => {
      setStep(3); // Success
      addPoints(total); // Award points based on total
      clearCart();
    }, 2000);
  };

  const paymentOptions = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI / GPay', icon: Smartphone },
    { id: 'wallet', name: 'Wallets', icon: Smartphone },
  ];

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
                  <h2 className="text-3xl font-bold">Order Placed!</h2>
                  <p className="text-foreground/60">Your delicious treat is being prepared. You've earned {Math.floor(total/10)} loyalty points!</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-xl bg-coffee-600 text-white font-bold hover:bg-coffee-700 transition-colors"
                >
                  Great!
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-border flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Checkout</h2>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="bg-coffee-50 dark:bg-coffee-900/30 p-4 rounded-xl border border-coffee-200 dark:border-coffee-800">
                    <div className="flex justify-between items-center font-bold text-xl">
                      <span>Total Amount</span>
                      <span className="text-coffee-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {step === 1 ? (
                    <div className="space-y-4">
                      <p className="text-sm font-bold text-foreground/60 uppercase tracking-wider">Select Payment Method</p>
                      <div className="space-y-3">
                        {paymentOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setPaymentMethod(opt.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                              paymentMethod === opt.id 
                                ? 'border-coffee-600 bg-coffee-50 dark:bg-coffee-900/20' 
                                : 'border-border hover:border-coffee-300'
                            }`}
                          >
                            <opt.icon className={`w-6 h-6 ${paymentMethod === opt.id ? 'text-coffee-600' : 'text-foreground/40'}`} />
                            <span className="font-bold">{opt.name}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        disabled={!paymentMethod}
                        onClick={handlePayment}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                          paymentMethod 
                            ? 'bg-coffee-600 text-white hover:bg-coffee-700 shadow-coffee-600/30' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Pay Now
                      </button>
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="w-12 h-12 text-coffee-600 animate-spin" />
                      <p className="font-bold text-lg animate-pulse">Processing Payment...</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
