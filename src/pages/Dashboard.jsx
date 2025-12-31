import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
  Target,
  Plus,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { transactions, balance, storeSettings, addExpense, goalProgress } =
    useFinance();
  const [period, setPeriod] = useState("anual");
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // --- CÁLCULOS FINANCEIROS ---
  const stats = useMemo(() => {
    const now = new Date();
    let periodStart = new Date();
    if (period === "semanal") periodStart.setDate(now.getDate() - 7);
    else periodStart.setMonth(0, 1);

    const relevantDocs = transactions.filter(
      (t) => new Date(t.date) >= periodStart
    );

    const revenue = relevantDocs
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = relevantDocs
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    const profit = revenue - expenses;
    const salesCount = relevantDocs.filter((t) => t.type === "income").length;

    // Gráfico
    let chartLabels = [],
      chartValues = [];
    if (period === "anual") {
      chartLabels = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      chartValues = new Array(12).fill(0);
      relevantDocs
        .filter((t) => t.type === "income")
        .forEach((t) => {
          const d = new Date(t.date);
          if (d.getFullYear() === now.getFullYear())
            chartValues[d.getMonth()] += t.amount;
        });
    } else {
      const daysMap = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        chartLabels.push(daysMap[d.getDay()]);
        const dayTotal = relevantDocs
          .filter(
            (t) =>
              t.type === "income" && new Date(t.date).getDate() === d.getDate()
          )
          .reduce((acc, t) => acc + t.amount, 0);
        chartValues.push(dayTotal);
      }
    }
    return { revenue, expenses, profit, salesCount, chartLabels, chartValues };
  }, [transactions, period]);

  // Configuração do Gráfico
  const chartData = {
    labels: stats.chartLabels,
    datasets: [
      {
        label: "Faturamento",
        data: stats.chartValues,
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  // Transações Recentes (Vendas e Despesas misturadas)
  const recentTransactions = transactions.slice(0, 7);

  // Modal de Despesa
  const handleAddExpense = (e) => {
    e.preventDefault();
    addExpense(
      parseFloat(e.target.amount.value),
      e.target.desc.value,
      e.target.category.value
    );
    setIsExpenseModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto dark:text-white">
      {/* 1. HEADER REFORMULADO: Resumo Executivo */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Bloco Principal: Saldo e Meta */}
        <div className="flex-1 bg-slate-900 dark:bg-blue-950 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-1">
                  Saldo em Caixa
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(balance)}
                </h1>
                <p className="text-sm text-slate-400">
                  Atualizado em tempo real
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <Activity size={24} className="text-blue-400" />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-blue-100 flex items-center gap-2">
                  <Target size={16} /> Meta Mensal:{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    notation: "compact",
                  }).format(storeSettings.monthlyGoal)}
                </span>
                <span className="text-2xl font-bold">{goalProgress}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${goalProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco Secundário: Cards de KPI */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Receita */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl group-hover:bg-green-100 transition">
                <ArrowUpRight size={24} />
              </div>
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500 dark:text-slate-300">
                Entradas
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">
                Receita do Período
              </p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(stats.revenue)}
              </h3>
            </div>
          </div>

          {/* Despesas */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between group hover:border-red-200 transition-colors">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl group-hover:bg-red-100 transition">
                <ArrowDownRight size={24} />
              </div>
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500 dark:text-slate-300">
                Saídas
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">
                Despesas
              </p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(stats.expenses)}
              </h3>
            </div>
          </div>

          {/* Lucro */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-colors sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl group-hover:bg-blue-100 transition">
                <DollarSign size={24} />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPeriod("semanal")}
                  className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                    period === "semanal"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                  }`}
                >
                  7 Dias
                </button>
                <button
                  onClick={() => setPeriod("anual")}
                  className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                    period === "anual"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                  }`}
                >
                  Ano
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-end gap-4">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">
                  Lucro Líquido
                </p>
                <h3
                  className={`text-3xl font-bold ${
                    stats.profit >= 0
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-red-500"
                  }`}
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(stats.profit)}
                </h3>
              </div>
              {/* Mini Gráfico Integrado */}
              <div className="h-16 w-full sm:w-48">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ÁREA PRINCIPAL: Tabela Ao Vivo + Ações Rápidas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* COLUNA ESQUERDA: Tabela Ao Vivo (Ocupa 2/3) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Movimentações Recentes
            </h2>
            <Link
              to="/records"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Ver Histórico Completo
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">
                      Transação
                    </th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">
                      Categoria/Cliente
                    </th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">
                      Data
                    </th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase text-right">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {recentTransactions.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              t.type === "income"
                                ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                                : "bg-red-100 text-red-600 dark:bg-red-900/30"
                            }`}
                          >
                            {t.type === "income" ? (
                              <ShoppingBag size={18} />
                            ) : (
                              <TrendingDown size={18} />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                              {t.description}
                            </p>
                            <p className="text-xs text-slate-400">
                              {t.type === "income" ? "Venda" : "Despesa"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                        {t.type === "income"
                          ? t.details?.client || "Cliente Balcão"
                          : t.details?.category || "Geral"}
                      </td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                        {new Date(t.date).toLocaleDateString()}{" "}
                        <span className="text-xs opacity-50">
                          {new Date(t.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td
                        className={`p-4 text-sm font-bold text-right ${
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
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Ações Rápidas (Ocupa 1/3) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Acesso Rápido
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
            <Link
              to="/orders"
              className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition group cursor-pointer border border-blue-100 dark:border-blue-800/50"
            >
              <div className="bg-blue-500 text-white p-3 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Nova Venda
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Registrar saída de produto
                </p>
              </div>
            </Link>

            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition group cursor-pointer border border-red-100 dark:border-red-800/50"
            >
              <div className="bg-red-500 text-white p-3 rounded-xl shadow-lg shadow-red-200 dark:shadow-none group-hover:scale-110 transition-transform">
                <TrendingDown size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Nova Despesa
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Registrar conta ou pagamento
                </p>
              </div>
            </button>

            <Link
              to="/products"
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition group cursor-pointer border border-slate-100 dark:border-slate-700"
            >
              <div className="bg-slate-800 dark:bg-slate-600 text-white p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Search size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Consultar Estoque
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Verificar produtos disponíveis
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL RÁPIDO DE DESPESA */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 dark:text-white">
              Registrar Despesa Rápida
            </h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <input
                name="desc"
                placeholder="Descrição (Ex: Luz)"
                required
                className="w-full p-3 border rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700 outline-none"
              />
              <input
                name="amount"
                type="number"
                placeholder="Valor (R$)"
                required
                className="w-full p-3 border rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700 outline-none"
              />
              <select
                name="category"
                className="w-full p-3 border rounded-xl dark:bg-slate-900 dark:text-white dark:border-slate-700 outline-none"
              >
                <option>Operacional</option>
                <option>Fornecedores</option>
                <option>Marketing</option>
                <option>Outros</option>
              </select>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-bold dark:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
