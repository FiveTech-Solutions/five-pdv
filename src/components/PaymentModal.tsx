'use client';

import { useState, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PaymentMethod, Payment } from '@/types';

interface PaymentModalProps {
  open: boolean;
  total: number;
  onClose: () => void;
  onConfirm: (payments: Payment[], change: number) => void;
}

export default function PaymentModal({ open, total, onClose, onConfirm }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [cashReceived, setCashReceived] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const change = useMemo(() => {
    if (selectedMethod === 'CASH' && cashReceived) {
      const received = parseFloat(cashReceived.replace(',', '.')) || 0;
      return Math.max(0, received - total);
    }
    return 0;
  }, [cashReceived, selectedMethod, total]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleConfirmPayment = () => {
    if (!selectedMethod) return;

    const payment: Payment = {
      method: selectedMethod,
      amount: selectedMethod === 'CASH' ? parseFloat(cashReceived.replace(',', '.')) || total : total
    };

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onConfirm([payment], change);
      resetState();
    }, 1500);
  };

  const resetState = () => {
    setSelectedMethod(null);
    setCashReceived('');
    setChange(0);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const canConfirm = () => {
    if (!selectedMethod) return false;
    if (selectedMethod === 'CASH') {
      const received = parseFloat(cashReceived.replace(',', '.')) || 0;
      return received >= total;
    }
    return true;
  };

  const paymentMethods = [
    { method: 'PIX' as PaymentMethod, icon: PixIcon, label: 'PIX' },
    { method: 'CREDIT' as PaymentMethod, icon: CreditCardIcon, label: 'Crédito' },
    { method: 'DEBIT' as PaymentMethod, icon: PaymentsIcon, label: 'Débito' },
    { method: 'CASH' as PaymentMethod, icon: AttachMoneyIcon, label: 'Dinheiro' },
  ];

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0,
          border: '2px solid black',
        }
      }}
    >
      {showSuccess ? (
        <div className="flex flex-col items-center justify-center py-16">
          <CheckCircleIcon sx={{ fontSize: 80, color: 'black' }} />
          <h2 className="text-2xl font-bold mt-4">Pagamento Confirmado!</h2>
          {selectedMethod === 'CASH' && change > 0 && (
            <div className="mt-4 text-center">
              <p className="text-gray-600">Troco:</p>
              <p className="text-3xl font-bold font-mono">{formatCurrency(change)}</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <DialogTitle className="flex items-center justify-between border-b border-black bg-black text-white">
            <span className="font-bold uppercase tracking-wider">Finalizar Pagamento</span>
            <IconButton onClick={handleClose} size="small" sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent className="p-6">
            <div className="text-center mb-6 pt-4">
              <p className="text-sm text-gray-500 uppercase tracking-wider">Total a Pagar</p>
              <p className="text-4xl font-bold font-mono">{formatCurrency(total)}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-3 uppercase tracking-wider">Forma de Pagamento</p>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map(({ method, icon: Icon, label }) => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`flex flex-col items-center justify-center p-4 border-2 transition-all ${
                      selectedMethod === method
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    <Icon sx={{ fontSize: 32 }} />
                    <span className="mt-2 font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedMethod === 'CASH' && (
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <TextField
                  label="Valor Recebido"
                  variant="outlined"
                  fullWidth
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  placeholder="0,00"
                  inputProps={{ inputMode: 'decimal' }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'black',
                    },
                  }}
                />
                
                {change > 0 && (
                  <div className="bg-gray-100 p-4 text-center">
                    <p className="text-sm text-gray-600 uppercase tracking-wider">Troco</p>
                    <p className="text-3xl font-bold font-mono text-black">{formatCurrency(change)}</p>
                  </div>
                )}

                {cashReceived && parseFloat(cashReceived.replace(',', '.')) < total && (
                  <p className="text-red-600 text-sm text-center">
                    Valor insuficiente. Faltam {formatCurrency(total - (parseFloat(cashReceived.replace(',', '.')) || 0))}
                  </p>
                )}
              </div>
            )}
          </DialogContent>
          
          <DialogActions className="p-4 border-t border-gray-200">
            <Button 
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderColor: 'black',
                color: 'black',
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmPayment}
              variant="contained"
              disabled={!canConfirm()}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#333',
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                },
              }}
            >
              Confirmar Pagamento
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
