import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Função auxiliar para verificar se o link está ativo
  const isActive = (path) => {
    return location.pathname === path
      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
      : "text-slate-400 hover:text-white hover:bg-slate-800";
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-500">
          Nexus<span className="text-white">Admin</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs text-slate-500 uppercase mb-2 font-semibold">
          Menu Principal
        </p>

        <Link
          to="/"
          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive(
            "/"
          )}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/products"
          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive(
            "/products"
          )}`}
        >
          <ShoppingBag size={20} />
          <span>Produtos</span>
        </Link>

        <Link
          to="/customers"
          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive(
            "/customers"
          )}`}
        >
          <Users size={20} />
          <span>Clientes</span>
        </Link>

        <div className="pt-8">
          <p className="text-xs text-slate-500 uppercase mb-2 font-semibold">
            Sistema
          </p>
          <Link
            to="/settings"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive(
              "/settings"
            )}`}
          >
            <Settings size={20} />
            <span>Configurações</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => alert("Simulação de Logout realizada!")}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-slate-800/50 transition w-full p-3 rounded-lg"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
