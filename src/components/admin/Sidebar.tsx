import React, { useState } from 'react';
import { FiMenu, FiX, FiHome, FiFileText, FiTag, FiMessageSquare, FiSettings, FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: MdDashboard, label: 'Dashboard' },
    { id: 'posts', icon: FiFileText, label: 'Posts' },
    { id: 'categories', icon: FiTag, label: 'Categorias' },
    { id: 'comments', icon: FiMessageSquare, label: 'Comentários' },
    { id: 'settings', icon: FiSettings, label: 'Configurações' },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary-600 text-white rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-gradient-to-b from-primary-900 to-primary-700 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-primary-600">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MdDashboard /> Pipeline
          </h1>
          <p className="text-sm text-primary-200 mt-1">Painel Administrativo</p>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-primary-100 hover:bg-primary-600'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-600">
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary-100 hover:bg-red-600 transition-colors"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
