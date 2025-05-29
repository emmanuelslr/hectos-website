'use client';
import { useState } from 'react';
import { products } from '../../store/products';
import useCartStore from '../../store/useCartStore';
import toast, { Toaster } from 'react-hot-toast';

export default function ShopPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { size: string; color: string }>>({});

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const options = selectedOptions[productId] || { 
      size: product?.sizes[0] || '',
      color: product?.colors[0].name || ''
    };

    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size: options.size,
        color: options.color,
        image: product.images[0],
      });
      toast.success('Produit ajouté au panier');
    }
  };

  const handleOptionChange = (productId: string, type: 'size' | 'color', value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [type]: value,
      },
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Notre Collection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-w-3 aspect-h-4 relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                <p className="text-lg font-medium text-gray-900 mb-4">{product.price.toFixed(2)} €</p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille
                    </label>
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4E6AE9] focus:border-[#4E6AE9]"
                      value={selectedOptions[product.id]?.size || product.sizes[0]}
                      onChange={(e) => handleOptionChange(product.id, 'size', e.target.value)}
                    >
                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur
                    </label>
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#4E6AE9] focus:border-[#4E6AE9]"
                      value={selectedOptions[product.id]?.color || product.colors[0].name}
                      onChange={(e) => handleOptionChange(product.id, 'color', e.target.value)}
                    >
                      {product.colors.map((color) => (
                        <option key={color.name} value={color.name}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full px-6 py-3 text-[15px] font-normal text-white bg-[#4E6AE9] rounded hover:bg-[#1E2124] transition-all"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
