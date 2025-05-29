'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import useCartStore from '../../store/useCartStore';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Commande confirmée !
          </h1>
          <p className="text-gray-500 mb-8">
            Merci pour votre achat. Vous recevrez bientôt un email de confirmation.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-normal text-white bg-[#4E6AE9] rounded hover:bg-[#1E2124] transition-all"
          >
            Continuer les achats
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
