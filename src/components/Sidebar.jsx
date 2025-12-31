import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Wallet,
  ClipboardList,
  TrendingDown,
  Briefcase,
} from "lucide-react"; // Importe Briefcase
import { Link, useLocation } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

const Sidebar = () => {
  const location = useLocation();
  const financeData = useFinance();
  const storeName = financeData?.storeSettings?.name || "Nexus Store";

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white";
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 h-screen z-50 transition-all duration-300">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
          N
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-800 dark:text-white">
            {storeName}
          </h1>
          <p className="text-[10px] text-slate-400">Painel Admin</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scroll">
        <p className="text-xs text-slate-400 uppercase mb-2 font-semibold tracking-wider px-2">
          Principal
        </p>
        <Link
          to="/"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive(
            "/"
          )}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/orders"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive(
            "/orders"
          )}`}
        >
          <ClipboardList size={20} />
          <span>Pedidos</span>
        </Link>
        <Link
          to="/products"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive(
            "/products"
          )}`}
        >
          <ShoppingBag size={20} />
          <span>Produtos</span>
        </Link>
        <Link
          to="/customers"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive(
            "/customers"
          )}`}
        >
          <Users size={20} />
          <span>Clientes</span>
        </Link>

        {/* NOVO LINK FUNCIONÁRIOS */}
        <Link
          to="/employees"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive(
            "/employees"
          )}`}
        >
          <Briefcase size={20} />
          <span>Funcionários</span>
        </Link>

        <p className="text-xs text-slate-400 uppercase mt-6 mb-2 font-semibold tracking-wider px-2">
          Finanças
        </p>
        <Link
          to="/expenses"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive(
            "/expenses"
          )}`}
        >
          <TrendingDown size={20} />
          <span>Despesas</span>
        </Link>
        <Link
          to="/bank"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive(
            "/bank"
          )}`}
        >
          <Wallet size={20} />
          <span>Carteira / Banco</span>
        </Link>

        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            to="/settings"
            className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${isActive(
              "/settings"
            )}`}
          >
            <Settings size={20} />
            <span>Configurações</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => {
            localStorage.removeItem("user_token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full p-3 rounded-xl font-medium transition"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
