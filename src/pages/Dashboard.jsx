import React from "react";
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
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

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
  // Configuração do Gráfico
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas 2024",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
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

  // Componente de Card de Estatística (Interno)
  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-gray-800">{value}</h3>
          <span className="text-green-500 text-xs font-semibold flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> {change} esse mês
          </span>
        </div>
        <div className={`p-3 rounded-lg ${color} text-white`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
        <p className="text-gray-500">
          Bem-vindo de volta, aqui está o resumo da sua loja.
        </p>
      </div>

      {/* Cards de Topo */}
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
        {/* Gráfico */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Análise de Receita</h3>
          <div className="h-72">
            <Line data={data} options={options} />
          </div>
        </div>

        {/* Lista de Recentes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Últimos Pedidos</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
