import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  TrendingDown,
  Calendar,
  FileText,
  CheckCircle,
  X,
  DollarSign,
  Edit,
  Trash2,
  PieChart,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const Expenses = () => {
  const { transactions, addExpense, updateTransaction, removeTransaction } =
    useFinance();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");

  // Estado de Edição
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    desc: "",
    amount: "",
    category: "Operacional",
    type: "Variável",
  });

  // 1. FILTRAGEM
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch = e.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "Todas" || e.details?.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 2. CÁLCULO DE ESTATÍSTICAS
  const stats = useMemo(() => {
    const total = expenses.reduce((acc, t) => acc + t.amount, 0);

    // Calcula qual categoria gastou mais
    const catMap = {};
    expenses.forEach((t) => {
      const cat = t.details?.category || "Geral";
      catMap[cat] = (catMap[cat] || 0) + t.amount;
    });

    // Ordena categorias
    const sortedCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCats[0] ? sortedCats[0][0] : "Nenhuma";
    const topCategoryValue = sortedCats[0] ? sortedCats[0][1] : 0;

    return { total, topCategory, topCategoryValue };
  }, [expenses]);

  const categories = [
    "Todas",
    "Operacional",
    "Fornecedores",
    "Marketing",
    "Salários",
    "Impostos",
    "Outros",
  ];

  // --- AÇÕES DO FORMULÁRIO ---

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      desc: "",
      amount: "",
      category: "Operacional",
      type: "Variável",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (expense) => {
    setEditingId(expense.id);
    setFormData({
      desc: expense.description,
      amount: expense.amount,
      category: expense.details?.category || "Operacional",
      type: "Variável",
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.desc || !formData.amount) return;

    const amount = parseFloat(formData.amount);

    if (editingId) {
      // ATUALIZAR
      updateTransaction({
        id: editingId,
        type: "expense",
        amount: amount,
        description: formData.desc,
        details: { category: formData.category },
      });
      alert("Despesa atualizada!");
    } else {
      // CRIAR
      addExpense(amount, formData.desc, formData.category);
      alert("Despesa registrada!");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta despesa? O valor retornará ao saldo."
      )
    ) {
      removeTransaction(id);
    }
  };

  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-500 dark:text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <TrendingDown className="text-red-500" /> Gestão de Despesas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Controle de custos fixos e pagamentos.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl hover:bg-red-600 transition font-bold shadow-lg shadow-red-200 dark:shadow-none"
        >
          <Plus size={20} /> Nova Despesa
        </button>
      </div>

      {/* CARDS DE RESUMO (NOVO) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">
              Total de Despesas
            </p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(stats.total)}
            </h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
            <PieChart size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">
              Maior Custo: {stats.topCategory}
            </p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(stats.topCategoryValue)}
            </h3>
          </div>
        </div>
        {/* Você pode adicionar mais cards aqui se quiser */}
      </div>

      {/* FILTROS */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between transition-colors">
        <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 w-full md:w-96">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar despesa..."
            className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition border ${
                categoryFilter === cat
                  ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900 border-transparent"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TABELA DE DESPESAS */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold text-sm border-b border-slate-100 dark:border-slate-700">
              <tr>
                <th className="p-5">Descrição</th>
                <th className="p-5">Categoria</th>
                <th className="p-5">Data</th>
                <th className="p-5">Valor</th>
                <th className="p-5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition group"
                  >
                    <td className="p-5 font-bold text-slate-700 dark:text-slate-200 flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
                        <FileText size={18} />
                      </div>
                      {expense.description}
                    </td>
                    <td className="p-5 text-sm text-slate-600 dark:text-slate-300">
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs font-bold uppercase">
                        {expense.details?.category || "Geral"}
                      </span>
                    </td>
                    <td className="p-5 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />{" "}
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-5 font-bold text-red-600 dark:text-red-400">
                      -{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(expense.amount)}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEdit(expense)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-400">
                    Nenhuma despesa encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL (CRIAR / EDITAR) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden p-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                {editingId ? "Editar Despesa" : "Registrar Despesa"}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} className="text-slate-400 hover:text-red-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição
                </label>
                <input
                  required
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-sm dark:text-white"
                  placeholder="Ex: Aluguel do Mês"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Valor (R$)
                </label>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3">
                  <DollarSign size={18} className="text-slate-400" />
                  <input
                    type="number"
                    required
                    className="bg-transparent outline-none w-full text-sm dark:text-white"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Categoria
                  </label>
                  <select
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-sm dark:text-white"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    {categories
                      .filter((c) => c !== "Todas")
                      .map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo
                  </label>
                  <select
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-sm dark:text-white"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option>Fixa</option>
                    <option>Variável</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg mt-2 transition-transform active:scale-95">
                {editingId ? "Salvar Alterações" : "Confirmar Pagamento"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
