'use client';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from '@/types';

interface ProductInputProps {
  onAddProduct: (product: Product, quantity: number) => void;
  products: Product[];
}

export default function ProductInput({ onAddProduct, products }: ProductInputProps) {
  const [searchCode, setSearchCode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = () => {
    if (!searchCode.trim()) {
      setError('Digite o código ou nome do produto');
      return;
    }

    const term = searchCode.toLowerCase();

    // 1. Try exact code match first
    const codeMatch = products.find(p => p.code.toLowerCase() === term);

    if (codeMatch) {
      addProduct(codeMatch);
      return;
    }

    // 2. Search by name
    const nameMatches = products.filter(p => p.name.toLowerCase().includes(term));

    if (nameMatches.length === 0) {
      setError('Produto não encontrado');
      setSearchResults([]);
    } else if (nameMatches.length === 1) {
      addProduct(nameMatches[0]);
    } else {
      // Multiple matches found
      setSearchResults(nameMatches);
      setError('');
    }
  };

  const addProduct = (product: Product) => {
    onAddProduct(product, quantity);
    setSearchCode('');
    setQuantity(1);
    setError('');
    setSearchResults([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-3">
        <TextField
          label="Código ou Nome do Produto"
          variant="outlined"
          size="small"
          value={searchCode}
          onChange={(e) => {
            const value = e.target.value;
            setSearchCode(value);
            setError('');

            if (value.trim().length > 0) {
              const term = value.toLowerCase();
              const matches = products.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.code.includes(term)
              );
              setSearchResults(matches);
            } else {
              setSearchResults([]);
            }
          }}
          onKeyDown={handleKeyPress}
          error={!!error}
          helperText={error}
          className="flex-1"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#e2e8f0',
                borderWidth: '2px',
              },
              '&:hover fieldset': {
                borderColor: '#cbd5e1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0f172a',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#64748b',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#0f172a',
            },
          }}
        />

        <TextField
          label="Qtd"
          type="number"
          variant="outlined"
          size="small"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          onKeyDown={handleKeyPress}
          inputProps={{ min: 1 }}
          className="w-20"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              '& fieldset': {
                borderColor: '#e2e8f0',
                borderWidth: '2px',
              },
              '&:hover fieldset': {
                borderColor: '#cbd5e1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0f172a',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#64748b',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#0f172a',
            },
          }}
        />

        <IconButton
          onClick={handleSearch}
          sx={{
            backgroundColor: '#0f172a',
            color: 'white',
            borderRadius: '12px',
            padding: '10px',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            '&:hover': {
              backgroundColor: '#1e293b',
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            },
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </div>

      {/* Search Results List */}
      {searchResults.length > 0 && (
        <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Selecione um produto ({searchResults.length} encontrados)
            </p>
          </div>
          <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
            {searchResults.slice(0, 5).map((product) => (
              <button
                key={product.id}
                onClick={() => addProduct(product)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-xs text-gray-500">Cód: {product.code}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full group-hover:bg-slate-200 transition-colors">
                    Adicionar
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <SearchIcon fontSize="small" />
          Digite o código ou nome e pressione Enter
        </span>
      </div>
    </div>
  );
}
