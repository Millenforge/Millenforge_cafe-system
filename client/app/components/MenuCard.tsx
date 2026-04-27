'use client';

import { motion } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';
import { useState } from 'react';

interface MenuCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    image: string;
    category: string;
    isBestSeller?: boolean;
    isSpecial?: boolean;
  };
  onAdd: () => void;
}

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-card rounded-3xl overflow-hidden shadow-lg border border-border group relative h-full flex flex-col"
    >
      {item.isBestSeller && (
        <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          Best Seller
        </div>
      )}
      {item.isSpecial && (
        <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
          Daily Special
        </div>
      )}
      
      <div className="relative h-56 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-foreground line-clamp-1">{item.name}</h3>
          <div className="text-right flex flex-col items-end">
            {item.isSpecial && item.discountPrice ? (
              <>
                <span className="text-sm line-through text-foreground/40 font-medium">₹{item.price.toFixed(2)}</span>
                <span className="text-xl font-bold text-coffee-600">₹{item.discountPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-coffee-600">₹{item.price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <p className="text-foreground/60 text-sm mb-6 line-clamp-2 h-10">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-2xl border transition-all ${
              isLiked 
                ? 'bg-red-50 border-red-200 text-red-500' 
                : 'border-border text-foreground/40 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button 
            onClick={onAdd}
            className="flex-grow flex items-center justify-center gap-2 py-3 px-4 bg-coffee-600 hover:bg-coffee-700 text-white rounded-2xl font-bold transition-all shadow-md shadow-coffee-600/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add to Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}
