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
} from "chart.js";
import { DollarSign, Users, ShoppingBag } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas (R$)",
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const Card = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard de Vendas
        </h1>
        <p className="text-gray-500">Visão geral do desempenho da loja</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Receita Total" value="R$ 89.000" icon={DollarSign} />
        <Card title="Novos Clientes" value="1,234" icon={Users} />
        <Card title="Pedidos" value="456" icon={ShoppingBag} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Crescimento Semestral</h2>
        <div className="h-80">
          <Line
            data={data}
            options={{ maintainAspectRatio: false, responsive: true }}
          />
        </div>
      </div>
    </div>
  );
}
