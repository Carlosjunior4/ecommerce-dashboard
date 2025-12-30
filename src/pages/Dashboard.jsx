import React, { useState } from "react";
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
  ShoppingBag,
  Users,
  TrendingUp,
  Calendar,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  // Estado para controlar o filtro do gráfico (Mensal ou Semanal)
  const [period, setPeriod] = useState("mensal");
  const [loading, setLoading] = useState(false);

  // Dados simulados para cada período
  const chartDataConfig = {
    mensal: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      data: [12000, 19000, 15000, 25000, 22000, 30000],
    },
    semanal: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      data: [1500, 2300, 3200, 4100, 1800, 5600, 6200],
    },
  };

  // Função para simular refresh de dados
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Simula 1 segundo de carregamento
  };

  const data = {
    labels: chartDataConfig[period].labels,
    datasets: [
      {
        label: period === "mensal" ? "Vendas (Mensal)" : "Vendas (Semanal)",
        data: chartDataConfig[period].data,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { borderDash: [5, 5] } },
      x: { grid: { display: false } },
    },
  };

  // Componente Card Interno
  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition hover:-translate-y-1 duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-gray-800">
            {loading ? "..." : value}
          </h3>
          <span className="text-green-500 text-xs font-semibold flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> {change} esse mês
          </span>
        </div>
        <div
          className={`p-3 rounded-lg ${color} text-white shadow-lg shadow-${color.replace(
            "bg-",
            ""
          )}/30`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Cabeçalho com Ações */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
          <p className="text-gray-500">Resumo financeiro da sua loja.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition ${
              loading ? "animate-spin" : ""
            }`}
            title="Atualizar dados"
          >
            <RefreshCcw size={20} />
          </button>

          <div className="bg-white p-1 border border-gray-200 rounded-lg flex">
            <button
              onClick={() => setPeriod("semanal")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                period === "semanal"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => setPeriod("mensal")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                period === "mensal"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Mensal
            </button>
          </div>
        </div>
      </div>

      {/* Cards de KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Receita Total"
          value="R$ 128.450"
          change="+12%"
          icon={DollarSign}
          color="bg-blue-500"
        />
        <StatCard
          title="Novos Pedidos"
          value="1,245"
          change="+5%"
          icon={ShoppingBag}
          color="bg-purple-500"
        />
        <StatCard
          title="Clientes Ativos"
          value="892"
          change="+18%"
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico Dinâmico */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">
              Análise de Receita ({period})
            </h3>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar size={14} /> Atualizado agora
            </span>
          </div>
          <div className="h-72">
            <Line data={data} options={options} />
          </div>
        </div>

        {/* Lista de Recentes com Link */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4">Últimos Pedidos</h3>
          <div className="space-y-4 flex-1">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">João D.</p>
                    <p className="text-xs text-gray-500">iPhone 15 Pro</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                  Pago
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-sm text-blue-600 font-medium border border-blue-100 rounded-lg hover:bg-blue-50 transition"
          >
            Ver Todos os Pedidos <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
