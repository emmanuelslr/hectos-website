'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import useCartStore from '../store/useCartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCartStore();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h2 className="text-lg font-medium">{totalItems} {totalItems > 1 ? 'articles' : 'article'}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-48 h-48 relative mb-6">
                  <svg
                    className="w-full h-full text-gray-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.0049 8H8.00488V6H21.0049C21.4196 6 21.7901 6.24719 21.9368 6.63578C22.0834 7.02436 21.9711 7.45747 21.6549 7.74408L21.0049 8L19.0049 16.5C18.8874 17.0102 18.4378 17.3615 17.9149 17.3945L17.7549 17.4H6.00488V19C6.00488 20.1046 5.10945 21 4.00488 21C2.90031 21 2.00488 20.1046 2.00488 19C2.00488 17.8954 2.90031 17 4.00488 17V16ZM4.00488 19C3.4526 19 3.00488 18.5523 3.00488 18C3.00488 17.4477 3.4526 17 4.00488 17C4.55717 17 5.00488 17.4477 5.00488 18C5.00488 18.5523 4.55717 19 4.00488 19ZM18.0049 19C17.4526 19 17.0049 18.5523 17.0049 18C17.0049 17.4477 17.4526 17 18.0049 17C18.5572 17 19.0049 17.4477 19.0049 18C19.0049 18.5523 18.5572 19 18.0049 19Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  Le panier est vide
                </h3>
                <p className="text-gray-500 mb-8 max-w-sm">
                  Découvrez notre collection et trouvez les pièces qui vous correspondent.
                </p>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-8 py-3 text-[15px] font-medium text-white bg-[#4E6AE9] rounded-lg hover:bg-[#1E2124] transition-all"
                >
                  Voir la collection
                </Link>
              </div>
            ) : (
              <div className="py-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="group relative flex gap-6"
                    >
                      <div className="relative aspect-square w-24 overflow-hidden rounded-xl bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.size} · {item.color}
                            </p>
                          </div>
                          <p className="font-medium text-gray-900">
                            {(item.price * item.quantity).toFixed(2)} €
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center rounded-lg border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, Math.max(1, item.quantity - 1))}
                              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size, item.color)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 bg-white">
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-gray-500">
                      <span>Sous-total</span>
                      <span>{totalPrice.toFixed(2)} €</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500">
                      <span>Livraison</span>
                      <span>Gratuite</span>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex items-center justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={onClose}
                      className="w-full px-6 py-3 text-[15px] font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      Continuer
                    </button>
                    <Link
                      href="/cart"
                      onClick={onClose}
                      className="w-full text-center px-6 py-3 text-[15px] font-medium text-white bg-[#4E6AE9] rounded-lg hover:bg-[#1E2124] transition-all"
                    >
                      Commander
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
