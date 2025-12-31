import React, { useState, useEffect } from "react";
import {
  Save,
  Store,
  User,
  Target,
  AlertTriangle,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const Settings = () => {
  const { storeSettings, updateSettings } = useFinance();

  // Estado local para o formulário
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    monthlyGoal: "",
  });

  // Carrega os dados atuais quando a página abre
  useEffect(() => {
    setFormData({
      name: storeSettings.name,
      ownerName: storeSettings.ownerName,
      monthlyGoal: storeSettings.monthlyGoal,
    });
  }, [storeSettings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    updateSettings({
      name: formData.name,
      ownerName: formData.ownerName,
      monthlyGoal: parseFloat(formData.monthlyGoal),
    });

    alert("Configurações salvas com sucesso!");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "ATENÇÃO: Isso apagará todas as vendas e despesas simuladas e recarregará a página. Tem certeza?"
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-500 dark:text-white max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <SettingsIcon className="text-slate-400" /> Configurações
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Personalize sua loja e seus objetivos financeiros.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* CARD 1: PERFIL DA EMPRESA */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
            <Store className="text-blue-500" /> Perfil da Empresa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Nome da Loja
              </label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus-within:ring-2 ring-blue-500/20 transition">
                <Store size={18} className="text-slate-400" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent outline-none w-full text-sm dark:text-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Nome do Proprietário
              </label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus-within:ring-2 ring-blue-500/20 transition">
                <User size={18} className="text-slate-400" />
                <input
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="bg-transparent outline-none w-full text-sm dark:text-white font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: METAS FINANCEIRAS */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
            <Target className="text-green-500" /> Metas Financeiras
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Meta de Faturamento Mensal (R$)
              </label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus-within:ring-2 ring-green-500/20 transition">
                <Target size={18} className="text-slate-400" />
                <input
                  type="number"
                  name="monthlyGoal"
                  value={formData.monthlyGoal}
                  onChange={handleChange}
                  className="bg-transparent outline-none w-full text-sm dark:text-white font-bold text-green-600 dark:text-green-400"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Isso ajustará a barra de progresso no Dashboard.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                Prévia da Barra:
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[65%]"></div>
              </div>
              <p className="text-xs text-slate-400 mt-1 text-center">
                65% da Meta
              </p>
            </div>
          </div>
        </div>

        {/* BOTÃO SALVAR */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none transition transform active:scale-95"
          >
            <Save size={20} /> Salvar Alterações
          </button>
        </div>
      </form>

      {/* ZONA DE PERIGO */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-red-500 font-bold flex items-center gap-2 mb-4">
          <AlertTriangle size={20} /> Zona de Perigo
        </h3>
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-red-200">
              Resetar Sistema
            </h4>
            <p className="text-sm text-slate-500 dark:text-red-300/70">
              Isso apagará todas as vendas, clientes e configurações locais.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 bg-white dark:bg-slate-800 text-red-500 border border-red-200 dark:border-red-800 px-5 py-2.5 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <RefreshCw size={18} /> Resetar Dados
          </button>
        </div>
      </div>
    </div>
  );
};

// Ícone auxiliar apenas para o título
const SettingsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default Settings;
