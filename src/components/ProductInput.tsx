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
    <div className="bg-white border border-black p-4">
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
              '& fieldset': {
                borderColor: 'black',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black',
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
              '& fieldset': {
                borderColor: 'black',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black',
            },
          }}
        />
        
        <IconButton 
          onClick={handleSearch}
          className="bg-black text-white hover:bg-gray-800 rounded"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <SearchIcon fontSize="small" />
          Digite o código e pressione Enter ou clique no botão
        </span>
      </div>
    </div>
  );
}
