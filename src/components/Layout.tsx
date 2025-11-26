import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  AlertTriangle, 
  Search, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/threat-feed', icon: Shield, label: 'Threat Feed' },
    { path: '/incident-response', icon: AlertTriangle, label: 'Incident Response' },
    { path: '/threat-hunting', icon: Search, label: 'Threat Hunting' },
    { path: '/reports', icon: FileText, label: 'Reports & Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-cyber-dark">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col bg-cyber-darker border-r border-cyber-gray transition-all duration-300`}>
        <div className="p-6 border-b border-cyber-gray">
          <div className="flex items-center justify-between">
            <h1 className={`${sidebarOpen ? 'block' : 'hidden'} text-xl font-bold text-cyber-blue`}>
              AI Threat Intel
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-cyber-blue hover:text-cyber-blue-dark"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-cyber-blue text-cyber-dark font-semibold'
                    : 'text-gray-300 hover:bg-cyber-gray hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cyber-gray">
          <div className={`${sidebarOpen ? 'block' : 'hidden'} mb-4`}>
            <div className="text-sm text-gray-400">Logged in as</div>
            <div className="font-semibold text-white">{user?.username}</div>
            <div className="text-xs text-cyber-blue">{user?.role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-cyber-gray hover:text-white transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-cyber-gray rounded-lg text-cyber-blue"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-cyber-darker">
          <div className="p-6 border-b border-cyber-gray">
            <h1 className="text-xl font-bold text-cyber-blue">AI Threat Intel</h1>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-cyber-blue text-cyber-dark font-semibold'
                      : 'text-gray-300 hover:bg-cyber-gray hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-cyber-gray">
            <div className="mb-4">
              <div className="text-sm text-gray-400">Logged in as</div>
              <div className="font-semibold text-white">{user?.username}</div>
              <div className="text-xs text-cyber-blue">{user?.role}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-cyber-gray hover:text-white"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-cyber-gray border-b border-cyber-gray-light px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-300 hover:text-cyber-blue transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-cyber-red rounded-full neon-glow-red"></span>
            </button>
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-white">{user?.username}</div>
                <div className="text-xs text-gray-400">{user?.role}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-cyber-blue flex items-center justify-center text-cyber-dark font-bold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

