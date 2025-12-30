import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
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
          className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-900/50 transition"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/products"
          className="flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
        >
          <ShoppingBag size={20} />
          <span>Produtos</span>
        </Link>

        <Link
          to="/customers"
          className="flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
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
            className="flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <Settings size={20} />
            <span>Configurações</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300 transition w-full p-2">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
