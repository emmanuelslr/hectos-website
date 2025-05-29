'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useCartStore from '../../store/useCartStore';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Erreur lors du checkout:', error);
    }
    setIsLoading(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Panier</h1>
          <Link 
            href="/"
            className="text-[#4E6AE9] hover:text-[#1E2124] transition-colors duration-300"
          >
            Continuer les achats
          </Link>
        </div>

        {totalItems === 0 ? (
          <div className="text-center py-32">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
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
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Il est temps de le remplir avec de belles trouvailles !
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-normal text-white bg-[#4E6AE9] rounded hover:bg-[#1E2124] transition-all"
            >
              Découvrir la collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="p-6 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Taille: {item.size} | Couleur: {item.color}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, Math.max(1, item.quantity - 1))}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              -
                            </button>
                            <span className="text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size, item.color)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-lg font-medium text-gray-900">
                          {(item.price * item.quantity).toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Résumé de la commande</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sous-total ({totalItems} articles)</span>
                    <span className="text-gray-900">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Livraison</span>
                    <span className="text-gray-900">Gratuite</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-medium text-gray-900">
                        {totalPrice.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className={`w-full px-6 py-3 text-[15px] font-normal text-white bg-[#4E6AE9] rounded hover:bg-[#1E2124] transition-all ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Chargement...' : 'Payer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
