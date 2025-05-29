'use client';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import CartDrawer from './CartDrawer';
import CartPreview from './CartPreview';

interface CartButtonProps {
  isOnWhiteSection: boolean;
}

export default function CartButton({ isOnWhiteSection }: CartButtonProps) {
  const { totalItems, isDrawerOpen, setDrawerOpen } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setShowPreview(false);
    }, 300);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={() => {
          setShowPreview(false);
          setDrawerOpen(true);
        }}
        className="relative inline-flex items-center justify-center"
        aria-label="Panier"
      >
      <svg
        className={`w-6 h-6 transition-all duration-300 ${
          isOnWhiteSection ? 'text-black hover:text-[#4E6AE9]' : 'text-white hover:text-[#4E6AE9]'
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {isClient && totalItems > 0 && (
        <span 
          className={`absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full
            ${isOnWhiteSection 
              ? 'bg-[#4E6AE9] text-white' 
              : 'bg-white text-black'
            }`}
        >
          {totalItems}
        </span>
      )}
      </button>

      <AnimatePresence>
        {showPreview && !isDrawerOpen && totalItems > 0 && (
          <CartPreview isOnWhiteSection={isOnWhiteSection} />
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
