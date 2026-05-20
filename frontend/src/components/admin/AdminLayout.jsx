// frontend/src/components/admin/AdminLayout.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';
import toast from 'react-hot-toast';

const NAV = [
  { to: '/admin',          label: 'Dashboard', Icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products',  Icon: Package },
  { to: '/admin/orders',   label: 'Orders',    Icon: ShoppingCart },
  { to: '/admin/users',    label: 'Users',     Icon: Users },
];

export default function AdminLayout({ children }) {
  const { user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-rose-100 flex flex-col shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-5 border-b border-rose-100">
            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Admin Panel</p>
            <p className="font-semibold text-sm text-rose-900 truncate">{user?.name}</p>
            <p className="text-xs text-rose-400 truncate">{user?.email}</p>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(({ to, label, Icon, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive ? 'bg-rose-100 text-rose-700' : 'text-rose-400 hover:bg-rose-50 hover:text-rose-600'
                  }`
                }
              >
                <Icon size={16} /> {label}
              </NavLink>
            ))}
          </nav>

          <div className="p-3 border-t border-rose-100 space-y-1">
            <NavLink to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <Home size={16} /> Back to Store
            </NavLink>
            <button onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 bg-rose-50/40 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
