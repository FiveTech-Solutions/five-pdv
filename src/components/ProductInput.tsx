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

  const handleSearch = () => {
    if (!searchCode.trim()) {
      setError('Digite o código do produto');
      return;
    }

    const product = products.find(
      p => p.code.toLowerCase() === searchCode.toLowerCase()
    );

    if (product) {
      onAddProduct(product, quantity);
      setSearchCode('');
      setQuantity(1);
      setError('');
    } else {
      setError('Produto não encontrado');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-3">
        <TextField
          label="Código do Produto"
          variant="outlined"
          size="small"
          value={searchCode}
          onChange={(e) => {
            setSearchCode(e.target.value);
            setError('');
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

      <div className="mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <SearchIcon fontSize="small" />
          Digite o código e pressione Enter ou clique no botão
        </span>
      </div>
    </div>
  );
}
