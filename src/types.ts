export interface Plan {
  id: string;
  name: string;
  region: string;
  data: string;
  duration: string;
  price: number;
  icon: string;
  stock: number;
  active: boolean;
}

export interface Order {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}
