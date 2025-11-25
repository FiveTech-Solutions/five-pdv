'use client';

interface TotalDisplayProps {
  total: number;
  itemCount: number;
}

export default function TotalDisplay({ total, itemCount }: TotalDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12 flex flex-col items-center justify-center min-h-[300px]">
      <div className="text-sm uppercase tracking-widest text-slate-300 mb-3">
        Total da Compra
      </div>
      <div className="text-6xl md:text-8xl font-bold font-mono tracking-tight mb-1">
        {formatCurrency(total)}
      </div>
      <div className="text-sm text-slate-400 mt-6 bg-white/10 px-4 py-2 rounded-full">
        {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
      </div>
    </div>
  );
}
