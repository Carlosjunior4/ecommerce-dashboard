import React, { useState } from "react";
import {
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Star,
  User,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const Customers = () => {
  const { customers, transactions, addCustomer } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Cliente",
  });

  // Calcula o total gasto por cliente baseado nas transações
  const customersWithStats = customers
    .map((c) => {
      const totalSpent = transactions
        .filter((t) => t.type === "income" && t.details?.client === c.name)
        .reduce((acc, t) => acc + t.amount, 0);
      return { ...c, spent: totalSpent };
    })
    .sort((a, b) => b.spent - a.spent); // Ordena por quem gastou mais (VIPs no topo)

  const filteredCustomers = customersWithStats.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e) => {
    e.preventDefault();
    addCustomer({ ...newClient, status: "Ativo", joinDate: new Date() });
    setIsModalOpen(false);
    setNewClient({ name: "", email: "", phone: "", role: "Cliente" });
  };

  return (
    <div className="p-8 animate-in fade-in duration-500 dark:text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Base de Clientes
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gerencie seus {customers.length} clientes ativos.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition font-bold shadow-lg"
        >
          <UserPlus size={20} /> Novo Cliente
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
        <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
          <Search size={20} className="text-slate-400" />
          <input
            className="bg-transparent outline-none w-full ml-3 text-sm dark:text-white"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* GRID DE CLIENTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => (
          <div
            key={customer.id}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition group relative overflow-hidden"
          >
            {/* SELO VIP PARA TOP 3 */}
            {index < 3 && customer.spent > 0 && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
                <Star size={10} fill="currentColor" /> VIP
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${customer.name}&background=random`}
                className="w-14 h-14 rounded-2xl shadow-sm"
                alt={customer.name}
              />
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">
                  {customer.name}
                </h3>
                <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium">
                  {customer.role}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-slate-300" /> {customer.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-slate-300" /> {customer.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-slate-300" /> São Paulo, SP
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 dark:border-slate-700 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  Total Gasto
                </p>
                <p className="text-lg font-bold text-slate-800 dark:text-white">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(customer.spent)}
                </p>
              </div>
              <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-blue-600">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL NOVO CLIENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-4 dark:text-white">
              Cadastrar Cliente
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input
                placeholder="Nome Completo"
                required
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient({ ...newClient, name: e.target.value })
                }
              />
              <input
                placeholder="Email"
                required
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                value={newClient.email}
                onChange={(e) =>
                  setNewClient({ ...newClient, email: e.target.value })
                }
              />
              <input
                placeholder="Telefone"
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none dark:text-white"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient({ ...newClient, phone: e.target.value })
                }
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold">
                Salvar Cliente
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

export default Customers;
