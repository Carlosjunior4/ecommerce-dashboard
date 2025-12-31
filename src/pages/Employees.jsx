import React, { useState } from "react";
import {
  Search,
  Plus,
  User,
  DollarSign,
  Calendar,
  Trash2,
  Edit,
  CheckCircle,
  Briefcase,
  Users,
  Phone,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const Employees = () => {
  const {
    employees,
    addEmployee,
    removeEmployee,
    updateEmployee,
    payEmployee,
  } = useFinance();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    salary: "",
    phone: "",
    email: "",
    admission: "",
    status: "Ativo",
  });

  // Estatísticas
  const totalSalaries = employees.reduce(
    (acc, e) => acc + parseFloat(e.salary),
    0
  );

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ações
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      salary: "",
      phone: "",
      email: "",
      admission: new Date().toISOString().split("T")[0],
      status: "Ativo",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setEditingId(emp.id);
    setFormData({ ...emp });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      updateEmployee({
        ...formData,
        id: editingId,
        salary: parseFloat(formData.salary),
      });
      alert("Dados atualizados!");
    } else {
      addEmployee({ ...formData, salary: parseFloat(formData.salary) });
      alert("Funcionário cadastrado!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja remover este funcionário?")) {
      removeEmployee(id);
    }
  };

  const handlePay = (emp) => {
    if (
      window.confirm(
        `Confirmar pagamento de salário para ${emp.name} (R$ ${emp.salary})? Isso debitará do caixa.`
      )
    ) {
      payEmployee(emp.id);
      alert("Pagamento registrado nas despesas!");
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500 dark:text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="text-blue-500" /> Gestão de Funcionários
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie sua equipe e folha de pagamento.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition font-bold shadow-lg"
        >
          <Plus size={20} /> Novo Funcionário
        </button>
      </div>

      {/* CARDS DE RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Equipe Ativa</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {employees.length}
            </h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">Folha Mensal</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalSalaries)}
            </h3>
          </div>
        </div>
      </div>

      {/* FILTRO E BUSCA */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
        <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 w-full md:w-96">
          <Search size={20} className="text-slate-400" />
          <input
            className="bg-transparent outline-none w-full ml-3 text-sm dark:text-white"
            placeholder="Buscar por nome ou cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABELA DE FUNCIONÁRIOS */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold text-sm border-b border-slate-100 dark:border-slate-700">
              <tr>
                <th className="p-5">Nome / Cargo</th>
                <th className="p-5">Contato</th>
                <th className="p-5">Salário</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white text-sm">
                          {emp.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Briefcase size={10} /> {emp.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {emp.phone}
                      </span>
                      <span className="text-xs opacity-70">{emp.email}</span>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-slate-700 dark:text-slate-300">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(emp.salary)}
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${
                        emp.status === "Ativo"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handlePay(emp)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition"
                        title="Pagar Salário"
                      >
                        <DollarSign size={18} />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(emp)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-lg font-bold mb-4 dark:text-white">
              {editingId ? "Editar Funcionário" : "Novo Funcionário"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Nome"
                  required
                  className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  placeholder="Cargo"
                  required
                  className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Salário (R$)"
                  type="number"
                  required
                  className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
                <input
                  placeholder="Telefone"
                  required
                  className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <input
                placeholder="Email"
                type="email"
                required
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 ml-1">
                    Data Admissão
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                    value={formData.admission}
                    onChange={(e) =>
                      setFormData({ ...formData, admission: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 ml-1">Status</label>
                  <select
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option>Ativo</option>
                    <option>Férias</option>
                    <option>Afastado</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold mt-2">
                Salvar
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-2 py-3 text-slate-500 font-bold"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
