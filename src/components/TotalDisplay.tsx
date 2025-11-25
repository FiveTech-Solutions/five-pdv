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
    <div className="bg-black text-white p-8 flex flex-col items-center justify-center">
      <div className="text-sm uppercase tracking-widest text-gray-400 mb-2">
        Total da Compra
      </div>
      <div className="text-6xl md:text-8xl font-bold font-mono tracking-tight">
        {formatCurrency(total)}
      </div>
      <div className="text-sm text-gray-400 mt-4">
        {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
      </div>
    </div>
  );
}
