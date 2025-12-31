import React, { useState } from "react";
import {
  Search,
  Download,
  ArrowUpCircle,
  ArrowDownCircle,
  Filter,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const Records = () => {
  const { transactions } = useFinance();
  const [filterType, setFilterType] = useState("all"); // all, income, expense
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesSearch = t.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-8 animate-in fade-in duration-500 dark:text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Extrato Completo
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Histórico detalhado de todas as movimentações.
          </p>
        </div>
        <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          <Download size={18} /> Exportar PDF
        </button>
      </div>

      {/* BARRA DE FERRAMENTAS */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 w-full md:w-96">
          <Search size={20} className="text-slate-400" />
          <input
            className="bg-transparent outline-none w-full ml-3 text-sm dark:text-white"
            placeholder="Buscar transação..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              filterType === "all"
                ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900"
                : "bg-slate-100 dark:bg-slate-700"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterType("income")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
              filterType === "income"
                ? "bg-green-600 text-white"
                : "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
            }`}
          >
            <ArrowUpCircle size={16} /> Entradas
          </button>
          <button
            onClick={() => setFilterType("expense")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
              filterType === "expense"
                ? "bg-red-600 text-white"
                : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            <ArrowDownCircle size={16} /> Saídas
          </button>
        </div>
      </div>

      {/* TABELA */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold text-sm border-b border-slate-100 dark:border-slate-700">
            <tr>
              <th className="p-5">Data</th>
              <th className="p-5">Descrição</th>
              <th className="p-5">Detalhe</th>
              <th className="p-5 text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredTransactions.slice(0, 50).map((t) => (
              <tr
                key={t.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
              >
                <td className="p-5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {new Date(t.date).toLocaleDateString()}{" "}
                  <span className="text-xs opacity-50 ml-1">
                    {new Date(t.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </td>
                <td className="p-5 font-medium text-slate-800 dark:text-white">
                  {t.description}
                </td>
                <td className="p-5 text-sm text-slate-500">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-bold ${
                      t.type === "income"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
                    }`}
                  >
                    {t.details?.category || t.details?.method || "Geral"}
                  </span>
                </td>
                <td
                  className={`p-5 text-right font-bold ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            Nenhum registro encontrado.
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;
