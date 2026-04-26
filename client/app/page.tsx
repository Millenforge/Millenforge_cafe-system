'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Coffee, Award, Star, Mail, Phone, Globe, MessageCircle, Camera, MapPin, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MenuCard from './components/MenuCard';
import CustomizationModal from './components/CustomizationModal';
import CartDrawer from './components/CartDrawer';
import VoiceSearch from './components/VoiceSearch';
import BookingModal from './components/BookingModal';
import FeedbackModal from './components/FeedbackModal';
import CustomerHub from './components/CustomerHub';
import AmbienceSection from './components/AmbienceSection';
import { useCartStore } from './store/cartStore';
import { useLoyaltyStore } from './store/loyaltyStore';

const MOCK_MENU = [
  { id: '1', name: 'Artisan Latte', description: 'Freshly brewed espresso with steamed milk and intricate latte art.', price: 180, image: '/latte.png', category: 'Coffee', isBestSeller: true },
  { id: '2', name: 'Butter Croissant', description: 'Flaky, golden-brown butter croissant baked fresh every morning.', price: 120, image: '/croissant.png', category: 'Snacks', isBestSeller: false },
  { id: '3', name: 'Avocado Toast', description: 'Creamy avocado mash on toasted sourdough, topped with a poached egg.', price: 350, image: '/avocado_toast.png', category: 'Breakfast', isBestSeller: true },
  { id: '4', name: 'Chocolate Brownie', description: 'Decadent, fudgy chocolate brownie served warm with vanilla ice cream.', price: 150, image: '/brownie.png', category: 'Desserts', isBestSeller: true },
  { id: '5', name: 'Blueberry Muffin', description: 'Soft and moist muffin packed with fresh blueberries.', price: 140, image: '/muffin.png', category: 'Desserts', isBestSeller: false },
  { id: '6', name: 'Classic Masala Chai', description: 'A traditional Indian spiced tea brewed with aromatic spices.', price: 40, image: '/latte.png', category: 'Tea', isBestSeller: true },
  { id: '7', name: 'Organic Green Tea', description: 'Light and refreshing organic green tea leaves.', price: 60, image: '/latte.png', category: 'Tea', isBestSeller: false },
  { id: '8', name: 'Cappuccino', description: 'Espresso topped with a deep layer of foamy steamed milk.', price: 160, image: '/latte.png', category: 'Coffee', isBestSeller: false },
  { id: '9', name: 'Americano', description: 'Espresso shots topped with hot water for a smooth finish.', price: 120, image: '/latte.png', category: 'Coffee', isBestSeller: false },
  { id: '10', name: 'Mocha', description: 'Espresso combined with bittersweet chocolate sauce and milk.', price: 190, image: '/latte.png', category: 'Coffee', isBestSeller: true },
  { id: '11', name: 'Egg Benedict', description: 'Poached eggs with hollandaise sauce on English muffins.', price: 280, image: '/avocado_toast.png', category: 'Breakfast', isBestSeller: false },
  { id: '12', name: 'Berry Blast Smoothie', description: 'A refreshing blend of berries and yogurt.', price: 180, image: '/latte.png', category: 'Smoothies', isBestSeller: true },
  { id: '13', name: 'Mango Tango', description: 'Tropical mango blended with a hint of lime.', price: 150, image: '/latte.png', category: 'Smoothies', isBestSeller: false },
  { id: '14', name: 'Paneer Tikka Wrap', description: 'Grilled paneer with spicy chutney wrapped in a tortilla.', price: 160, image: '/croissant.png', category: 'Snacks', isBestSeller: true },
  { id: '15', name: 'Double Espresso', description: 'Intense and rich double shot of espresso.', price: 100, image: '/latte.png', category: 'Coffee', isBestSeller: false },
  { id: '16', name: 'Caramel Macchiato', description: 'Steamed milk with vanilla, marked with espresso and caramel.', price: 210, image: '/latte.png', category: 'Coffee', isBestSeller: true },
  { id: '17', name: 'Flat White', description: 'Smooth micro-foam poured over a double shot of espresso.', price: 170, image: '/latte.png', category: 'Coffee', isBestSeller: false },
  { id: '18', name: 'Earl Grey Tea', description: 'Black tea infused with fragrant oil of bergamot.', price: 90, image: '/latte.png', category: 'Tea', isBestSeller: false },
  { id: '19', name: 'Chamomile Mint', description: 'Soothing blend of chamomile and fresh peppermint.', price: 90, image: '/latte.png', category: 'Tea', isBestSeller: false },
  { id: '20', name: 'Hibiscus Iced Tea', description: 'Vibrant and tart tea made from dried hibiscus petals.', price: 110, image: '/latte.png', category: 'Tea', isBestSeller: true },
  { id: '21', name: 'Club Sandwich', description: 'Triple-decker sandwich with chicken, bacon, and mayo.', price: 220, image: '/croissant.png', category: 'Snacks', isBestSeller: true },
  { id: '22', name: 'Loaded Nachos', description: 'Crispy corn chips with melted cheese and jalapenos.', price: 180, image: '/croissant.png', category: 'Snacks', isBestSeller: false },
  { id: '23', name: 'Truffle Fries', description: 'Golden fries tossed in truffle oil and parmesan.', price: 150, image: '/croissant.png', category: 'Snacks', isBestSeller: true },
  { id: '24', name: 'Red Velvet Cake', description: 'Rich red velvet cake with cream cheese frosting.', price: 180, image: '/brownie.png', category: 'Desserts', isBestSeller: true },
  { id: '25', name: 'Classic Cheesecake', description: 'Creamy New York style cheesecake.', price: 190, image: '/brownie.png', category: 'Desserts', isBestSeller: false },
  { id: '26', name: 'Apple Pie', description: 'Warm apple pie with a flaky crust and cinnamon.', price: 160, image: '/brownie.png', category: 'Desserts', isBestSeller: false }
];

const DAILY_SPECIALS: Record<number, string> = {
  0: '1',  // Sunday: Artisan Latte
  1: '6',  // Monday: Masala Chai
  2: '3',  // Tuesday: Avocado Toast
  3: '5',  // Wednesday: Blueberry Muffin
  4: '14', // Thursday: Paneer Tikka Wrap
  5: '10', // Friday: Mocha
  6: '4'   // Saturday: Chocolate Brownie
};

function HomeContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  const { items, addItem } = useCartStore();
  const { points } = useLoyaltyStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const table = searchParams.get('table');
    if (table) setTableNumber(table);
    const interval = setInterval(() => setCurrentDay(new Date().getDay()), 3600000);
    return () => clearInterval(interval);
  }, [searchParams]);

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: any, customizations: any) => {
    addItem(item, customizations);
  };

  const filteredMenu = MOCK_MENU.map(item => {
    const specialItemId = DAILY_SPECIALS[currentDay];
    if (item.id === specialItemId) {
      return { 
        ...item, 
        isSpecial: true, 
        discountPrice: Math.round(item.price * 0.8) // 20% discount
      };
    }
    return { ...item, isSpecial: false, discountPrice: undefined };
  }).filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todaySpecial = MOCK_MENU.find(i => i.id === DAILY_SPECIALS[currentDay]);
  const categories = ['All', 'Coffee', 'Tea', 'Breakfast', 'Snacks', 'Desserts', 'Smoothies'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {tableNumber && (
        <div className="bg-coffee-600 text-white py-2 px-4 text-center text-sm font-bold z-[60] fixed top-0 w-full shadow-lg">
          Table #{tableNumber} • Ready to Serve You
        </div>
      )}

      <nav className={`fixed w-full z-50 ${tableNumber ? 'top-9' : 'top-0'} bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <Coffee className="h-8 w-8 text-coffee-600" />
              <span className="text-2xl font-bold tracking-tight text-foreground hidden sm:block">Brew & Bites</span>
            </div>
            
            <div className="hidden lg:flex space-x-8">
              <Link href="#menu" className="text-foreground/80 hover:text-coffee-600 font-medium transition-colors">Menu</Link>
              <Link href="#hub" className="text-foreground/80 hover:text-coffee-600 font-medium transition-colors">Rewards</Link>
              <Link href="#about" className="text-foreground/80 hover:text-coffee-600 font-medium transition-colors">Ambience</Link>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} className="hidden xl:flex items-center gap-2 bg-coffee-100 dark:bg-coffee-900/50 px-4 py-2 rounded-full border border-coffee-200 dark:border-coffee-800 shadow-sm">
                <Award className="h-4 w-4 text-coffee-600" />
                <span className="text-sm font-bold text-coffee-900 dark:text-coffee-100">{points} Pts</span>
              </motion.div>
              <div className="hidden lg:flex items-center bg-coffee-50 dark:bg-coffee-900/30 rounded-full px-4 py-2 border border-border focus-within:border-coffee-500 transition-all">
                <Search className="h-4 w-4 text-foreground/40 mr-2" />
                <input type="text" placeholder="Search menu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none focus:ring-0 text-sm w-24 md:w-48 outline-none" />
              </div>
              <div className="hidden sm:block">
                <VoiceSearch onSearch={setSearchQuery} />
              </div>
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full hover:bg-coffee-100 dark:hover:bg-coffee-900 transition-colors">
                <ShoppingBag className="h-5 w-5 text-foreground" />
                {cartCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-coffee-600 rounded-full border-2 border-background">
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-coffee-100 dark:hover:bg-coffee-900 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <Link 
                  href="#" 
                  onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setIsMobileMenuOpen(false); }}
                  className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-coffee-50 dark:hover:bg-coffee-900/30 rounded-xl"
                >
                  Home
                </Link>
                <Link 
                  href="#menu" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-coffee-50 dark:hover:bg-coffee-900/30 rounded-xl"
                >
                  Menu
                </Link>
                <Link 
                  href="#hub" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-coffee-50 dark:hover:bg-coffee-900/30 rounded-xl"
                >
                  Rewards
                </Link>
                <Link 
                  href="#about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-coffee-50 dark:hover:bg-coffee-900/30 rounded-xl"
                >
                  Ambience
                </Link>
                <div className="pt-4 flex flex-col gap-3">
                  <motion.div className="flex items-center justify-between bg-coffee-100 dark:bg-coffee-900/50 px-6 py-4 rounded-2xl border border-coffee-200 dark:border-coffee-800">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-coffee-600" />
                      <span className="font-bold text-coffee-900 dark:text-coffee-100">Your Rewards</span>
                    </div>
                    <span className="text-lg font-black text-coffee-700">{points} Pts</span>
                  </motion.div>
                  <button 
                    onClick={() => { setIsBookingOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full py-4 bg-coffee-600 text-white rounded-2xl font-bold shadow-lg shadow-coffee-600/30"
                  >
                    Book a Table
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.png" alt="Cafe" className="w-full h-full object-cover opacity-90 dark:opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent dark:from-background/95 dark:via-background/90 dark:to-background/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto md:mx-0">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground">Sip the <span className="text-coffee-600">Perfect</span> Brew</h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl leading-relaxed">Experience artisanal coffee, delightful snacks, and an ambiance that feels like home.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-coffee-600 text-white rounded-full font-semibold shadow-lg shadow-coffee-600/30 hover:bg-coffee-700 transition-colors">View Menu</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsBookingOpen(true)} className="px-8 py-4 bg-transparent border-2 border-coffee-600 text-coffee-600 rounded-full font-semibold hover:bg-coffee-50 dark:hover:bg-coffee-900/50 transition-colors">Book a Table</motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="menu" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Menu</h2>
            <div className="w-24 h-1 bg-coffee-500 mx-auto rounded-full mb-8"></div>
            {todaySpecial && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-6 py-3 rounded-2xl mb-8">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce shadow-lg">!</div>
                <div className="text-left">
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider">{dayNames[currentDay]}'s Special</p>
                  <p className="font-bold text-foreground">20% OFF on {todaySpecial.name}!</p>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-6 py-2 rounded-full border transition-all font-medium ${activeCategory === category ? 'bg-coffee-600 text-white border-coffee-600 shadow-md' : 'border-border hover:border-coffee-500 hover:text-coffee-600'}`}>{category}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMenu.length > 0 ? filteredMenu.map(item => <MenuCard key={item.id} item={item} onAdd={() => handleOpenModal(item)} />) : (
                <div className="col-span-full text-center py-20 opacity-50"><p className="text-xl">No items found matching "{searchQuery}"</p></div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="hub">
        <CustomerHub onOpenFeedback={() => setIsFeedbackOpen(true)} />
      </section>

      <section id="about">
        <AmbienceSection />
      </section>

      <footer className="bg-coffee-950 text-coffee-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Coffee className="h-8 w-8 text-coffee-500" />
                <span className="text-2xl font-bold text-white">Brew & Bites</span>
              </div>
              <p className="text-sm opacity-60 leading-relaxed">Artisan coffee, delightful snacks, and an ambiance that feels like home.</p>
              <div className="flex gap-4">
                <Globe className="w-5 h-5 hover:text-coffee-500 cursor-pointer transition-colors" />
                <MessageCircle className="w-5 h-5 hover:text-coffee-500 cursor-pointer transition-colors" />
                <Camera className="w-5 h-5 hover:text-coffee-500 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#menu" className="hover:text-coffee-500 transition-colors">Our Menu</Link></li>
                <li><Link href="#hub" className="hover:text-coffee-500 transition-colors">Rewards</Link></li>
                <li><Link href="#about" className="hover:text-coffee-500 transition-colors">Ambience</Link></li>
                <li><button onClick={() => setIsBookingOpen(true)} className="hover:text-coffee-500 transition-colors">Book a Table</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-coffee-500" /> hello@brewbites.com</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-coffee-500" /> +91 98765 43210</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-coffee-500" /> HSR Layout, Bangalore</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-coffee-900 border-none rounded-lg px-4 py-2 w-full text-sm outline-none focus:ring-1 focus:ring-coffee-500" />
                <button className="bg-coffee-600 text-white px-4 py-2 rounded-lg font-bold">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-coffee-900 text-center text-xs opacity-40">
            <p>&copy; 2026 Brew & Bites Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <CustomizationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} onAddToCart={handleAddToCart} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
