/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Plane, Shield, Wifi, Smartphone, Check, 
  ArrowRight, Menu, X, Plus, Trash2, Settings, 
  CreditCard, LayoutDashboard, ShoppingCart, User
} from 'lucide-react';
import { Plan, Order } from './types';
import { dataService } from './lib/dataService';

// --- Shared Components ---

const IconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Plane: <Plane className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Wifi: <Wifi className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 px-8 py-4 flex justify-between items-center bg-white/5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
          <Wifi className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">إي-سلايد <span className="text-brand">eSlide</span></span>
      </div>
      
      <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
        <Link to="/" className="hover:text-brand transition-colors">الرئيسية</Link>
        <a href="#plans" className="hover:text-brand transition-colors">الشرائح</a>
        <Link to="/admin" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4" /> لوحة التحكم
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:block text-sm font-medium hover:text-brand transition-colors">تسجيل الدخول</button>
        <button className="btn-primary hidden md:block px-5 py-2 text-sm">ابدأ الآن</button>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass bg-black/90 p-6 flex flex-col gap-4 border-b border-white/10 md:hidden"
          >
            <Link to="/" onClick={() => setIsOpen(false)}>الرئيسية</Link>
            <Link to="/#plans" onClick={() => setIsOpen(false)}>الشرائح</Link>
            <Link to="/admin" onClick={() => setIsOpen(false)}>لوحة التحكم</Link>
            <button className="btn-primary w-full">ابدأ الآن</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const LandingPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  
  useEffect(() => {
    setPlans(dataService.getPlans().filter(p => p.active));
  }, []);

  return (
    <div className="pt-24 min-h-screen rtl text-right" dir="rtl">
      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
            اتصل بالعالم <br /> في <span className="text-brand">ثوانٍ</span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
            احصل على شريحة إلكترونية (eSIM) لأكثر من 190 دولة وبأسعار تنافسية. تفعيل فوري دون الحاجة لشريحة بلاستيكية.
          </p>
          <div className="flex gap-4">
            <button className="btn-primary flex items-center gap-3 px-8 py-4">
              تصفح الباقات <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button className="btn-secondary px-8 py-4">كيف تعمل؟</button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-square rounded-[3rem] overflow-hidden glass border-white/20 shadow-2xl group"
        >
          <img 
            src="https://picsum.photos/seed/esimtech/800/800" 
            alt="Global Connectivity"
            className="w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="glass-dark p-10 rounded-[2rem] w-full max-w-sm border-white/10 shadow-2xl">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-brand/20 rounded-2xl flex items-center justify-center text-brand border border-brand/20">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40 mb-1">الحالة</div>
                  <div className="font-bold text-xl">مفعلة وجاهزة</div>
                </div>
              </div>
              <div className="space-y-5">
                <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-brand shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-medium">البيانات المستخدمة</span>
                  <span className="font-bold font-mono text-brand">6.4 GB / 10 GB</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="px-6 py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">الباقات الأكثر طلباً</h2>
              <p className="text-white/40 text-lg">اختر الباقة التي تناسب رحلتك القادمة</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-3xl hover:border-white/30 transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {IconMap[plan.icon] || <Wifi />}
                  </div>
                  <div className="text-3xl font-bold font-mono">${plan.price}</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-white/40 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> {plan.region}
                  </p>
                  {plan.stock < 20 && (
                    <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-1 rounded-full border border-red-500/20">
                      مخزون منخفض
                    </span>
                  )}
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-green-400" /> {plan.data} بيانات عالية السرعة
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-green-400" /> صالحة لمدة {plan.duration}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-green-400" /> تفعيل فوري QR
                  </div>
                </div>
                <Link 
                  to={`/checkout/${plan.id}`}
                  className="w-full btn-primary block text-center"
                >
                  اشتر الآن
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-24 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">لماذا تختار esim.sa؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'تغطية عالمية', desc: 'أكثر من 190 دولة ومنطقة حول العالم', icon: <Globe /> },
            { title: 'أسعار محلية', desc: 'وفر حتى 90% من تكاليف التجوال', icon: <Shield /> },
            { title: 'تفعيل في ثواني', desc: 'امسح رمز الـ QR وابدأ الاتصال فوراً', icon: <Wifi /> }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white/40 max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-12 border-t border-white/10 text-center text-white/20 text-sm">
        جميع الحقوق محفوظة © 2026 esim.sa
      </footer>
    </div>
  );
};

const AdminPanel = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [formData, setFormData] = useState<Partial<Plan>>({ icon: 'Globe', active: true });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setPlans(dataService.getPlans());
  }, []);

  const handleSave = () => {
    if (!formData.name || !formData.price) return;
    const newPlan: Plan = {
      ...formData as Plan,
      id: formData.id || Math.random().toString(36).substr(2, 9),
      stock: formData.stock || 100,
    };
    
    const updatedPlans = formData.id 
      ? plans.map(p => p.id === formData.id ? newPlan : p)
      : [...plans, newPlan];
    
    setPlans(updatedPlans);
    dataService.savePlans(updatedPlans);
    setShowAdd(false);
    setFormData({ icon: 'Globe', active: true });
  };

  const deletePlan = (id: string) => {
    const updated = plans.filter(p => p.id !== id);
    setPlans(updated);
    dataService.savePlans(updated);
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto rtl text-right" dir="rtl">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">إدارة المخزون والباقات</h1>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Admin Dashboard</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> إضافة باقة جديدة
        </button>
      </div>

      <div className="grid gap-4">
        {plans.map(plan => (
          <div key={plan.id} className="glass p-6 rounded-2xl flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                {IconMap[plan.icon] || <Wifi />}
              </div>
              <div>
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <div className="text-white/40 text-sm flex gap-4">
                  <span>{plan.region}</span>
                  <span>{plan.data}</span>
                  <span className="font-mono text-white/60">${plan.price}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end mr-8">
                <span className="text-xs text-white/40 uppercase">المخزون</span>
                <span className="font-mono">{plan.stock}</span>
              </div>
              <button 
                onClick={() => { setFormData(plan); setShowAdd(true); }}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <Settings className="w-5 h-5 text-white/60" />
              </button>
              <button 
                onClick={() => deletePlan(plan.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg group"
              >
                <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-8 rounded-3xl w-full max-w-lg"
            >
              <h2 className="text-2xl font-bold mb-6">{formData.id ? 'تعديل باقة' : 'إضافة باقة جديدة'}</h2>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="اسم الباقة" 
                  className="input-glass w-full"
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="المنطقة" 
                    className="input-glass"
                    value={formData.region || ''}
                    onChange={e => setFormData({ ...formData, region: e.target.value })}
                  />
                  <input 
                    type="number" 
                    placeholder="السعر ($)" 
                    className="input-glass"
                    value={formData.price || ''}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="البيانات (مثلاً 5GB)" 
                    className="input-glass"
                    value={formData.data || ''}
                    onChange={e => setFormData({ ...formData, data: e.target.value })}
                  />
                  <input 
                    type="text" 
                    placeholder="المدة (مثلاً 30 يوم)" 
                    className="input-glass"
                    value={formData.duration || ''}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-white/40 mb-3 block font-semibold">تخصيص الأيقونة</label>
                  <div className="flex gap-4">
                    {Object.keys(IconMap).map(iconName => (
                      <button 
                        key={iconName}
                        onClick={() => setFormData({ ...formData, icon: iconName })}
                        className={`p-4 rounded-2xl border transition-all ${formData.icon === iconName ? 'bg-brand text-white border-brand shadow-lg shadow-brand/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                      >
                        {IconMap[iconName]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={handleSave} className="flex-1 btn-primary">حفظ</button>
                <button onClick={() => setShowAdd(false)} className="btn-secondary">إلغاء</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CheckoutPage = () => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const navigate = useNavigate();

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => navigate('/'), 3000);
    }, 2000);
  };

  return (
    <div className="pt-32 px-6 max-w-xl mx-auto rtl text-right" dir="rtl">
      <div className="glass p-8 rounded-3xl">
        <h1 className="text-3xl font-bold mb-8">إتمام الطلب</h1>
        
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4">تمت العملية بنجاح!</h2>
            <p className="text-white/40">سيتم إرسال كود الـ QR إلى بريدك الإلكتروني خلال دقائق.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-white/30" />
              <div className="relative">
                <input type="text" placeholder="رقم البطاقة" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 outline-none focus:border-white/30" />
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none" />
                <input type="text" placeholder="CVC" className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none" />
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6 space-y-2">
              <div className="flex justify-between text-white/60">
                <span>المجموع الفرعي</span>
                <span>$29.99</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>الإجمالي</span>
                <span>$29.99</span>
              </div>
            </div>

            <button 
              onClick={handlePay}
              disabled={status === 'processing'}
              className="w-full btn-primary py-4 text-lg mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {status === 'processing' ? 'جاري المعالجة...' : (
                <>
                  <Shield className="w-5 h-5" /> ادفع الآن بأمان
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div className="relative">
              <div className="mesh-gradient-1" />
              <div className="mesh-gradient-2" />
              <LandingPage />
            </div>
          } />
          <Route path="/admin" element={
            <div className="relative">
              <div className="mesh-gradient-1" />
              <div className="mesh-gradient-2" />
              <AdminPanel />
            </div>
          } />
          <Route path="/checkout/:id" element={
            <div className="relative min-h-screen">
              <div className="mesh-gradient-1" />
              <div className="mesh-gradient-2" />
              <CheckoutPage />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

