'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import CheckoutModal from './CheckoutModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = getTotal();
  const grandTotal = total * 1.05;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            {/* ... keeping the rest of the drawer code ... */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-card shadow-2xl h-full flex flex-col"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-coffee-600" />
                  <h2 className="text-2xl font-bold">Your Order</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                    <ShoppingBag className="w-16 h-16" />
                    <p className="text-lg">Your cart is empty.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-background border border-border group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-coffee-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold">{item.name}</h3>
                          <span className="font-semibold text-coffee-600">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        
                        <div className="text-xs text-foreground/60 mt-1 space-x-2">
                          {item.customizations.temperature && <span>• {item.customizations.temperature}</span>}
                          {item.customizations.milkType && <span>• {item.customizations.milkType}</span>}
                          {item.customizations.sugarLevel && <span>• {item.customizations.sugarLevel}</span>}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-coffee-50 dark:bg-coffee-900/50 px-3 py-1.5 rounded-lg border border-coffee-200 dark:border-coffee-800">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-coffee-600">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold min-w-[1.5rem] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-coffee-600">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-border bg-background space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-foreground/60">
                      <span>Subtotal</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-foreground/60">
                      <span>GST (5%)</span>
                      <span>₹{(total * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-coffee-600">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-4 rounded-xl bg-coffee-600 hover:bg-coffee-700 text-white font-bold text-lg shadow-lg shadow-coffee-600/30 transition-all active:scale-95"
                  >
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => {
          setIsCheckoutOpen(false);
          onClose();
        }} 
        total={grandTotal} 
      />
    </>
  );
}

