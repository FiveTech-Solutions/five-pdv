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
          borderRadius: 3,
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
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
          <DialogTitle className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <span className="font-bold uppercase tracking-wider">Finalizar Pagamento</span>
            <IconButton onClick={handleClose} size="small" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
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
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all duration-200 ${selectedMethod === method
                        ? 'border-slate-900 bg-slate-900 text-white shadow-lg scale-105'
                        : 'border-gray-200 hover:border-slate-400 hover:shadow-md'
                      }`}
                  >
                    <Icon sx={{ fontSize: 32 }} />
                    <span className="mt-2 font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedMethod === 'CASH' && (
              <div className="space-y-4 border-t border-gray-100 pt-4">
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
                      borderRadius: '10px',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#cbd5e1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0f172a',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#0f172a',
                    },
                  }}
                />

                {change > 0 && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border border-green-200">
                    <p className="text-sm text-green-700 uppercase tracking-wider font-medium">Troco</p>
                    <p className="text-3xl font-bold font-mono text-green-900">{formatCurrency(change)}</p>
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

          <DialogActions className="p-6 border-t border-gray-100">
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderColor: '#64748b',
                color: '#475569',
                borderRadius: '10px',
                borderWidth: '2px',
                px: 3,
                py: 1.5,
                '&:hover': {
                  borderColor: '#0f172a',
                  backgroundColor: 'rgba(15, 23, 42, 0.04)',
                  borderWidth: '2px',
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
                backgroundColor: '#0f172a',
                color: 'white',
                borderRadius: '10px',
                px: 4,
                py: 1.5,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                '&:hover': {
                  backgroundColor: '#1e293b',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                },
                '&:disabled': {
                  backgroundColor: '#cbd5e1',
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
