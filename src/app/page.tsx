'use client';

import { useState, useEffect } from 'react';
import TotalDisplay from '@/components/TotalDisplay';
import ProductList from '@/components/ProductList';
import ProductInput from '@/components/ProductInput';
import PaymentModal from '@/components/PaymentModal';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Button from '@mui/material/Button';
import { Product, CartItem, Payment } from '@/types';
import { supabase } from '@/lib/supabase';
import { mockProducts } from '@/data/mockProducts';

import Cookies from 'js-cookie';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Load cart from cookie on mount
  useEffect(() => {
    const savedCart = Cookies.get('pdv_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart cookie', e);
      }
    }
    setIsCartLoaded(true);
  }, []);

  // Save cart to cookie whenever it changes
  useEffect(() => {
    if (isCartLoaded) {
      Cookies.set('pdv_cart', JSON.stringify(cartItems), { expires: 1 });
    }
  }, [cartItems, isCartLoaded]);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (data && !error) {
        setProducts(data);
      }
      // If error or no data, keep sample products
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.product.id === product.id);

      if (existingIndex >= 0) {
        const newItems = [...prevItems];
        const newQuantity = newItems[existingIndex].quantity + quantity;
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newQuantity,
          subtotal: product.price * newQuantity
        };
        return newItems;
      } else {
        return [...prevItems, {
          product,
          quantity,
          subtotal: product.price * quantity
        }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity, subtotal: item.product.price * quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleConfirmPayment = async (payments: Payment[], change: number) => {
    // Save sale to Supabase
    const sale = {
      items: cartItems.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
        subtotal: item.subtotal
      })),
      total,
      payments: payments.map(p => ({
        method: p.method,
        amount: p.amount
      })),
      change,
      created_at: new Date().toISOString()
    };

    try {
      await supabase.from('sales').insert([sale]);
    } catch (error) {
      console.error('Error saving sale:', error);
    }

    // Clear cart and close modal
    setCartItems([]);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen lg:h-screen bg-gray-50 flex flex-col lg:overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <PointOfSaleIcon sx={{ fontSize: 32 }} />
          <h1 className="text-xl font-bold uppercase tracking-wider">Five PDV</h1>
        </div>
        <div className="text-sm text-gray-400">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
        {/* Left Panel - Product Input and List */}
        <div className="flex-1 flex flex-col lg:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <ProductInput onAddProduct={handleAddProduct} products={products} />
          </div>

          <div className="flex-1 px-6 pb-6">
            <ProductList
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>

        {/* Right Panel - Total and Actions */}
        <div className="lg:w-1/2 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex-1">
            <TotalDisplay total={total} itemCount={itemCount} />
          </div>

          {/* Action Buttons */}
          <div className="p-6 space-y-3">
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={() => setIsPaymentModalOpen(true)}
              disabled={cartItems.length === 0}
              sx={{
                backgroundColor: '#0f172a',
                color: 'white',
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#1e293b',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                },
                '&:disabled': {
                  backgroundColor: '#cbd5e1',
                  color: '#94a3b8',
                },
              }}
            >
              Finalizar Compra
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<DeleteSweepIcon />}
              onClick={handleClearCart}
              disabled={cartItems.length === 0}
              sx={{
                borderColor: '#64748b',
                color: '#475569',
                py: 2,
                borderRadius: '12px',
                borderWidth: '2px',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#0f172a',
                  backgroundColor: 'rgba(15, 23, 42, 0.04)',
                  borderWidth: '2px',
                },
                '&:disabled': {
                  borderColor: '#e2e8f0',
                  color: '#cbd5e1',
                },
              }}
            >
              Limpar Carrinho
            </Button>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal
        open={isPaymentModalOpen}
        total={total}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
}
