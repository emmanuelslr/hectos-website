'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useCartStore from '../store/useCartStore';

interface CartPreviewProps {
  isOnWhiteSection: boolean;
}

export default function CartPreview({ isOnWhiteSection }: CartPreviewProps) {
  const { items, totalItems, totalPrice } = useCartStore();

  const previewItems = items.slice(0, 2);
  const remainingItems = items.length - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 top-full mt-3 w-80 rounded-xl bg-white shadow-lg overflow-hidden"
    >
      <div className="p-4">
        <div className="text-sm font-medium mb-3">
          Mon panier ({totalItems})
        </div>
        <div className="space-y-3">
          {previewItems.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-center gap-3"
            >
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="truncate text-sm font-medium text-gray-900">
                  {item.name}
                </h4>
                <p className="mt-1 text-xs text-gray-500">
                  {item.size} · {item.color} · Qté : {item.quantity}
                </p>
              </div>
              <p className="flex-shrink-0 text-sm font-medium text-gray-900">
                {(item.price * item.quantity).toFixed(2)} €
              </p>
            </div>
          ))}
        </div>
        {remainingItems > 0 && (
          <p className="mt-3 text-sm text-gray-500 text-center">
            Et {remainingItems} autre{remainingItems > 1 ? 's' : ''} article{remainingItems > 1 ? 's' : ''}...
          </p>
        )}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between font-medium mb-4">
            <span className="text-sm text-gray-900">Total</span>
            <span className="text-sm text-gray-900">{totalPrice.toFixed(2)} €</span>
          </div>
          <Link
            href="/cart"
            className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-[#4E6AE9] rounded-lg hover:bg-[#1E2124] transition-all"
          >
            Voir le panier
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
