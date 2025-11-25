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

// Sample products for demonstration (will be replaced by Supabase data)
const sampleProducts: Product[] = [
  { id: '1', code: '001', name: 'Arroz Branco 5kg', price: 25.90, unit: 'un' },
  { id: '2', code: '002', name: 'Feijão Carioca 1kg', price: 8.50, unit: 'un' },
  { id: '3', code: '003', name: 'Açúcar Cristal 1kg', price: 5.20, unit: 'un' },
  { id: '4', code: '004', name: 'Óleo de Soja 900ml', price: 7.90, unit: 'un' },
  { id: '5', code: '005', name: 'Café Torrado 500g', price: 18.90, unit: 'un' },
  { id: '6', code: '006', name: 'Leite Integral 1L', price: 5.50, unit: 'un' },
  { id: '7', code: '007', name: 'Pão Francês', price: 0.80, unit: 'un' },
  { id: '8', code: '008', name: 'Margarina 500g', price: 6.90, unit: 'un' },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
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
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Product Input and List */}
        <div className="flex-1 flex flex-col lg:w-1/2 border-r border-gray-200">
          <div className="p-4">
            <ProductInput onAddProduct={handleAddProduct} products={products} />
          </div>
          
          <div className="flex-1 p-4 pt-0">
            <ProductList 
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>

        {/* Right Panel - Total and Actions */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="flex-1">
            <TotalDisplay total={total} itemCount={itemCount} />
          </div>
          
          {/* Action Buttons */}
          <div className="p-6 space-y-3 border-t border-gray-200">
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={() => setIsPaymentModalOpen(true)}
              disabled={cartItems.length === 0}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                '&:hover': {
                  backgroundColor: '#333',
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                  color: '#666',
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
                borderColor: 'black',
                color: 'black',
                py: 1.5,
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
                '&:disabled': {
                  borderColor: '#ccc',
                  color: '#ccc',
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
