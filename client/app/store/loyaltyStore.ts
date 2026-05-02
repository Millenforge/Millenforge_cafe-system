import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoyaltyState {
  points: number;
  addPoints: (amount: number) => void;
  redeemPoints: (amount: number) => boolean;
}

export const useLoyaltyStore = create<LoyaltyState>()(
  persist(
    (set, get) => ({
      points: 150, // Starting points for demo
      addPoints: (amount) => set((state) => ({ points: state.points + Math.floor(amount / 10) })),
      redeemPoints: (amount) => {
        if (get().points >= amount) {
          set((state) => ({ points: state.points - amount }));
          return true;
        }
        return false;
      },
    }),
    {
      name: 'loyalty-storage',
    }
  )
);
