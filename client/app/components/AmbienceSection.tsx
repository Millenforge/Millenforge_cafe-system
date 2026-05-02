'use client';

import { motion } from 'framer-motion';
import { MessageCircle, MapPin, Clock, Camera } from 'lucide-react';

export default function AmbienceSection() {
  const images = [
    {
      url: '/hero-bg.png', // Reusing hero image for now
      title: 'Warm & Cozy',
      desc: 'Perfect lighting for deep conversations.'
    },
    {
      url: '/hero-bg.png', 
      title: 'Artisan Station',
      desc: 'Where the magic happens, one bean at a time.'
    },
    {
      url: '/hero-bg.png',
      title: 'Reading Nook',
      desc: 'Escape the city rush in our quiet corner.'
    },
    {
      url: '/hero-bg.png',
      title: 'Evening Vibe',
      desc: 'The perfect place to unwind after work.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-coffee-100 dark:bg-coffee-900/50 rounded-full border border-coffee-200 dark:border-coffee-800 mb-6"
            >
              <Camera className="w-4 h-4 text-coffee-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-coffee-600">The Vibe</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Our <span className="text-coffee-600">Ambience</span></h2>
            <p className="text-lg text-foreground/60 leading-relaxed mb-8">
              At Brew & Bites, we believe coffee is more than just a drink—it's an experience. We've crafted every corner of our space to be your second home, whether you're here to brainstorm your next big idea, get lost in a book, or catch up with old friends.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-coffee-50 dark:bg-coffee-900/30 rounded-xl">
                  <Clock className="w-6 h-6 text-coffee-600" />
                </div>
                <div>
                  <h4 className="font-bold">Open Daily</h4>
                  <p className="text-sm text-foreground/60">8:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-coffee-50 dark:bg-coffee-900/30 rounded-xl">
                  <MapPin className="w-6 h-6 text-coffee-600" />
                </div>
                <div>
                  <h4 className="font-bold">Location</h4>
                  <p className="text-sm text-foreground/60">HSR Layout, Bangalore</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl overflow-hidden group ${i % 2 === 1 ? 'mt-8' : ''}`}
                style={{ height: '300px' }}
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <h4 className="font-bold text-lg">{img.title}</h4>
                  <p className="text-xs opacity-70">{img.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-coffee-50 dark:bg-coffee-950/20 rounded-[3rem] p-8 md:p-16 text-center border border-coffee-100 dark:border-coffee-900">
          <MessageCircle className="w-12 h-12 text-coffee-600 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Share Your #BrewBitesMoments</h3>
          <p className="text-foreground/60 mb-8 max-w-xl mx-auto">Follow us on Instagram and tag your photos to get featured on our wall and earn 100 extra loyalty points!</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-coffee-600 text-white rounded-full font-bold shadow-lg shadow-coffee-600/30 hover:bg-coffee-700 transition-all">Follow Us</button>
            <button className="px-8 py-4 bg-white dark:bg-background border border-border rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">View Gallery</button>
          </div>
        </div>
      </div>
    </section>
  );
}
