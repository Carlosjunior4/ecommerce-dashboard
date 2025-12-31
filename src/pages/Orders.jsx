import React, { useState } from "react";
// TROCAMOS 'LayoutKanban' POR 'Grid' AQUI EMBAIXO:
import {
  Search,
  Download,
  Plus,
  Grid,
  List,
  X,
  CheckCircle,
  Package,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  Clock,
  Truck,
  Calendar,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const Orders = () => {
  const { transactions, products, addIncome } = useFinance();

  const [viewMode, setViewMode] = useState("list"); // 'list' ou 'kanban'
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  // 1. FILTRAGEM
  const sales = transactions
    .filter((t) => t.type === "income")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredOrders = sales.filter((order) => {
    const clientName = order.details?.client || "Cliente Site";
    const productName = order.details?.product || order.description;
    const orderId = order.details?.orderId || `#${order.id}`;

    const matchesSearch =
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const derivedStatus =
      order.details?.status || (order.id % 2 === 0 ? "Pago" : "Pendente");
    const matchesStatus =
      statusFilter === "Todos" || derivedStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const displayedOrders = filteredOrders.slice(0, visibleCount);

  // 2. KANBAN
  const kanbanColumns = {
    Pendente: filteredOrders.filter(
      (o) =>
        (o.details?.status || (o.id % 2 !== 0 ? "Pendente" : "Pago")) ===
        "Pendente"
    ),
    Pago: filteredOrders.filter(
      (o) =>
        (o.details?.status || (o.id % 2 === 0 ? "Pago" : "Pendente")) === "Pago"
    ),
    Enviado: [],
  };

  // 3. AÇÕES
  const handleSaveOrder = (e) => {
    e.preventDefault();
    if (!newOrder.productId || !newOrder.client)
      return alert("Preencha todos os campos!");

    const selectedProduct = products.find((p) => p.id == newOrder.productId);

    if (selectedProduct.stock <= 0) {
      return alert("ERRO: Produto esgotado! Não é possível realizar a venda.");
    }

    const orderId = `#${Math.floor(Math.random() * 8999) + 1000}`;

    addIncome(selectedProduct.price, `Venda Manual: ${selectedProduct.name}`, {
      product: selectedProduct.name,
      productId: selectedProduct.id,
      orderId: orderId,
      client: newOrder.client,
      status: newOrder.status,
      method: newOrder.method,
      manual: true,
    });

    setIsModalOpen(false);
    setNewOrder({
      client: "",
      productId: "",
      status: "Pago",
      method: "Cartão de Crédito",
    });
    alert("Venda registrada e estoque atualizado!");
  };

  const handleExport = () => {
    const header = ["ID,Data,Cliente,Produto,Valor,Metodo,Status\n"];
    const rows = filteredOrders.map((o) => {
      const date = new Date(o.date).toLocaleDateString();
      const status =
        o.details?.status || (o.id % 2 === 0 ? "Pago" : "Pendente");
      return `${o.details?.orderId},${date},${o.details?.client || "Site"},${
        o.details?.product
      },${o.amount},${o.details?.method},${status}`;
    });

    const csvContent =
      "data:text/csv;charset=utf-8," + header + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_vendas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ESTADO DO FORM
  const [newOrder, setNewOrder] = useState({
    client: "",
    productId: "",
    status: "Pago",
    method: "Cartão de Crédito",
  });

  const getMethodIcon = (m) => {
    if (m === "PIX") return <Smartphone size={16} className="text-green-600" />;
    if (m?.includes("Débito"))
      return <Banknote size={16} className="text-blue-600" />;
    return <CreditCard size={16} className="text-purple-600" />;
  };

  const getStatusColor = (s) => {
    if (s === "Pago")
      return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    if (s === "Pendente")
      return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  };

  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-500 dark:text-white transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Pedidos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie o fluxo de vendas e estoque.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 flex">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition ${
                viewMode === "list"
                  ? "bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400"
                  : "text-slate-400"
              }`}
              title="Lista"
            >
              <List size={20} />
            </button>
            {/* USA GRID NO LUGAR DE LAYOUTKANBAN */}
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-2 rounded-md transition ${
                viewMode === "kanban"
                  ? "bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400"
                  : "text-slate-400"
              }`}
              title="Kanban"
            >
              <Grid size={20} />
            </button>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium"
          >
            <Download size={18} />{" "}
            <span className="hidden md:inline">Exportar</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-200 dark:shadow-none"
          >
            <Plus size={20} />{" "}
            <span className="hidden md:inline">Novo Pedido</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between transition-colors">
        <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 w-full md:w-96">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar ID, cliente ou produto..."
            className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {["Todos", "Pago", "Pendente"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                statusFilter === status
                  ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "list" && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold text-sm border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="p-5">ID</th>
                  <th className="p-5">Cliente</th>
                  <th className="p-5">Data</th>
                  <th className="p-5">Produto</th>
                  <th className="p-5">Pagamento</th>
                  <th className="p-5">Valor</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {displayedOrders.length > 0 ? (
                  displayedOrders.map((order) => {
                    const status =
                      order.details?.status ||
                      (order.id % 2 === 0 ? "Pago" : "Pendente");
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                      >
                        <td className="p-5 font-bold text-slate-700 dark:text-slate-200">
                          {order.details?.orderId ||
                            `#${order.id.toString().slice(-4)}`}
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                order.details?.manual
                                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              {(order.details?.client || "S").charAt(0)}
                            </div>
                            <span className="font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                              {order.details?.client || "Cliente Site"}
                            </span>
                          </div>
                        </td>
                        <td className="p-5 text-slate-500 dark:text-slate-400 text-sm whitespace-nowrap">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="p-5 text-slate-600 dark:text-slate-300 text-sm font-medium">
                          {order.details?.product || order.description}
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            {getMethodIcon(order.details?.method)}{" "}
                            {order.details?.method || "Outros"}
                          </div>
                        </td>
                        <td className="p-5 font-bold text-slate-800 dark:text-white">
                          R$ {order.amount.toLocaleString("pt-BR")}
                        </td>
                        <td className="p-5">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-10 text-center text-slate-500 dark:text-slate-400"
                    >
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {visibleCount < filteredOrders.length && (
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 text-center bg-slate-50 dark:bg-slate-800/50">
              <button
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Carregar mais pedidos
              </button>
            </div>
          )}
        </div>
      )}

      {viewMode === "kanban" && (
        <div className="flex gap-6 overflow-x-auto pb-6">
          {Object.entries(kanbanColumns).map(([status, items]) => (
            <div
              key={status}
              className="flex-1 min-w-[320px] bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  {status === "Pago" ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : status === "Pendente" ? (
                    <Clock size={18} className="text-yellow-500" />
                  ) : (
                    <Truck size={18} className="text-blue-500" />
                  )}
                  {status}
                </h3>
                <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm">
                  {items.length}
                </span>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scroll pr-1">
                {items.slice(0, 15).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-400">
                        {item.details?.orderId}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar size={10} />{" "}
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">
                      {item.details?.product}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <User size={12} /> {item.details?.client || "Site"}
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        R$ {item.amount.toLocaleString("pt-BR")}
                      </span>
                      {getMethodIcon(item.details?.method)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Registrar Venda Manual
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} className="text-slate-400 hover:text-red-500" />
              </button>
            </div>
            <form onSubmit={handleSaveOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Cliente
                </label>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3">
                  <User size={18} className="text-slate-400" />
                  <input
                    type="text"
                    required
                    className="bg-transparent outline-none w-full text-sm dark:text-white placeholder:text-slate-400"
                    placeholder="Nome do Cliente"
                    value={newOrder.client}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, client: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Produto
                </label>
                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />
                  <select
                    required
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl outline-none bg-slate-50 dark:bg-slate-900 text-sm appearance-none dark:text-white"
                    value={newOrder.productId}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, productId: e.target.value })
                    }
                  >
                    <option value="">Selecione um produto...</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                        {p.name} — R$ {p.price}{" "}
                        {p.stock <= 0 ? "(Esgotado)" : `(Est: ${p.stock})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Forma de Pagamento
                </label>
                <select
                  required
                  className="w-full px-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl outline-none bg-slate-50 dark:bg-slate-900 text-sm dark:text-white"
                  value={newOrder.method}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, method: e.target.value })
                  }
                >
                  <option>Cartão de Crédito</option>
                  <option>Cartão de Débito</option>
                  <option>PIX</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewOrder({ ...newOrder, status: "Pago" })}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold border transition ${
                    newOrder.status === "Pago"
                      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  Pago
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setNewOrder({ ...newOrder, status: "Pendente" })
                  }
                  className={`flex-1 py-2 rounded-xl text-sm font-bold border transition ${
                    newOrder.status === "Pendente"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  Pendente
                </button>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg mt-2 transition-transform active:scale-95">
                Confirmar Venda
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
