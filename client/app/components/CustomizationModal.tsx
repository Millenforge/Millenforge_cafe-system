'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    price: number;
    category: string;
  } | null;
  onAddToCart: (item: any, customizations: any) => void;
}

export default function CustomizationModal({ isOpen, onClose, item, onAddToCart }: CustomizationModalProps) {
  const [sugarLevel, setSugarLevel] = useState('Standard (100%)');
  const [milkType, setMilkType] = useState('Regular Milk');
  const [temperature, setTemperature] = useState('Hot');
  
  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, {
      sugarLevel,
      milkType,
      temperature
    });
    onClose();
  };

  const isCoffeeOrTea = item.category === 'Coffee' || item.category === 'Tea';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
          >
            <div className="p-6 border-b border-border flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <p className="text-coffee-600 font-semibold">₹{item.price.toFixed(2)}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {isCoffeeOrTea ? (
                <>
                  {/* Temperature */}
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Temperature</h3>
                    <div className="flex gap-3">
                      {['Hot', 'Iced'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => setTemperature(opt)}
                          className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                            temperature === opt 
                              ? 'border-coffee-600 bg-coffee-50 text-coffee-700 dark:bg-coffee-900/50 dark:text-coffee-300' 
                              : 'border-border hover:border-coffee-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Milk Option */}
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Milk Preference</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Regular Milk', 'Oat Milk', 'Almond Milk', 'Soy Milk'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => setMilkType(opt)}
                          className={`py-3 rounded-xl border font-medium transition-all ${
                            milkType === opt 
                              ? 'border-coffee-600 bg-coffee-50 text-coffee-700 dark:bg-coffee-900/50 dark:text-coffee-300' 
                              : 'border-border hover:border-coffee-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sugar Option */}
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Sugar Level</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['0%', '25%', '50%', 'Standard (100%)'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => setSugarLevel(opt)}
                          className={`py-3 rounded-xl border font-medium transition-all ${
                            sugarLevel === opt 
                              ? 'border-coffee-600 bg-coffee-50 text-coffee-700 dark:bg-coffee-900/50 dark:text-coffee-300' 
                              : 'border-border hover:border-coffee-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-4 text-center text-foreground/70">
                  No customizations available for this item.
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border bg-background/50">
              <button 
                onClick={handleAdd}
                className="w-full py-4 rounded-xl bg-coffee-600 hover:bg-coffee-700 text-white font-bold text-lg shadow-lg shadow-coffee-600/30 transition-all active:scale-95"
              >
                Add to Cart - ₹{item.price.toFixed(2)}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
