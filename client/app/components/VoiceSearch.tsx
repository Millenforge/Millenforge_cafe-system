'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
}

export default function VoiceSearch({ onSearch }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [browserSupported, setBrowserSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      setBrowserSupported(false);
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript) {
        onSearch(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  if (!browserSupported) return null;

  return (
    <div className="relative">
      <button
        onClick={isListening ? () => setIsListening(false) : startListening}
        className={`p-3 rounded-full transition-all ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-coffee-100 hover:bg-coffee-200 text-coffee-700 dark:bg-coffee-900/50 dark:text-coffee-300'
        }`}
        title="Voice Search"
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-4 right-0 w-64 p-4 bg-card rounded-2xl shadow-2xl border border-border z-50"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Mic className="w-6 h-6 text-red-500 animate-bounce" />
              </div>
              <p className="text-sm font-medium text-center">Listening...</p>
              <p className="text-xs text-foreground/60 italic text-center">
                {transcript || "Try saying 'Coffee' or 'Brownie'"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
