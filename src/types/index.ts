export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  unit: string;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export type PaymentMethod = 'PIX' | 'CREDIT' | 'DEBIT' | 'CASH';

export interface Payment {
  method: PaymentMethod;
  amount: number;
}

export interface Sale {
  id?: string;
  items: CartItem[];
  total: number;
  payments: Payment[];
  change: number;
  created_at?: string;
}
