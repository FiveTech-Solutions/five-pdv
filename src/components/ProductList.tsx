'use client';

import { CartItem } from '@/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';

interface ProductListProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function ProductList({ items, onUpdateQuantity, onRemoveItem }: ProductListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <span className="text-sm font-bold uppercase tracking-wider">Itens do Carrinho</span>
        <span className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full">{items.length} {items.length === 1 ? 'item' : 'itens'}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-lg">Nenhum produto adicionado</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <div key={item.product.id} className="p-4 hover:bg-gray-50 transition-all duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded">#{index + 1}</span>
                      <span className="text-xs text-gray-500">{item.product.code}</span>
                    </div>
                    <h3 className="font-medium text-slate-900 truncate mt-1">{item.product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatCurrency(item.product.price)} / {item.product.unit}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 border-2 border-gray-200 rounded-full overflow-hidden">
                      <IconButton
                        size="small"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        sx={{
                          borderRadius: 0,
                          '&:hover': {
                            backgroundColor: '#f1f5f9',
                          },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <span className="w-8 text-center font-mono font-bold text-slate-900">{item.quantity}</span>
                      <IconButton
                        size="small"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        sx={{
                          borderRadius: 0,
                          '&:hover': {
                            backgroundColor: '#f1f5f9',
                          },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{formatCurrency(item.subtotal)}</span>
                      <IconButton
                        size="small"
                        onClick={() => onRemoveItem(item.product.id)}
                        sx={{
                          color: '#64748b',
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                          },
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
