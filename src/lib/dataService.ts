import { Plan, Order } from '../types';

const INITIAL_PLANS: Plan[] = [
  {
    id: '1',
    name: 'الشرق الأوسط - بريميوم',
    region: 'Middle East',
    data: '10GB',
    duration: '30 Days',
    price: 29.99,
    icon: 'Globe',
    stock: 100,
    active: true
  },
  {
    id: '2',
    name: 'أوروبا - سياحي',
    region: 'Europe',
    data: '5GB',
    duration: '15 Days',
    price: 15.00,
    icon: 'Plane',
    stock: 50,
    active: true
  },
  {
    id: '3',
    name: 'عالمي - بلاتينيوم',
    region: 'Global',
    data: 'Unlimited',
    duration: '30 Days',
    price: 99.00,
    icon: 'Shield',
    stock: 200,
    active: true
  }
];

export const dataService = {
  getPlans: (): Plan[] => {
    const saved = localStorage.getItem('esim_plans');
    if (!saved) {
      localStorage.setItem('esim_plans', JSON.stringify(INITIAL_PLANS));
      return INITIAL_PLANS;
    }
    return JSON.parse(saved);
  },
  
  savePlans: (plans: Plan[]) => {
    localStorage.setItem('esim_plans', JSON.stringify(plans));
  },

  addOrder: (order: Order) => {
    const orders = JSON.parse(localStorage.getItem('esim_orders') || '[]');
    orders.push(order);
    localStorage.setItem('esim_orders', JSON.stringify(orders));
  },

  getOrders: (): Order[] => {
    return JSON.parse(localStorage.getItem('esim_orders') || '[]');
  }
};
