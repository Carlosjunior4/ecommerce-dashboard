import React from "react";
import { Save, User, Bell, Lock } from "lucide-react";

const Settings = () => {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Configurações</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Menu Interno de Abas (Visual) */}
        <div className="flex border-b border-gray-100">
          <button className="px-6 py-4 text-blue-600 border-b-2 border-blue-600 font-medium bg-blue-50">
            Meu Perfil
          </button>
          <button className="px-6 py-4 text-gray-500 hover:bg-gray-50 transition">
            Notificações
          </button>
          <button className="px-6 py-4 text-gray-500 hover:bg-gray-50 transition">
            Segurança
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Seção de Perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <User size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="bg-transparent outline-none w-full text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Profissional
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <Mail size={18} className="text-gray-400 mr-2" />
                <input
                  type="email"
                  defaultValue="admin@empresa.com"
                  className="bg-transparent outline-none w-full text-gray-800"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biografia
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 outline-none h-32 resize-none"
              defaultValue="Gerente de operações focado em escalar vendas online."
            ></textarea>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
              <Bell size={18} /> Preferências
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">
                Receber relatórios semanais por email
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Alertas de estoque baixo</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <Save size={18} /> Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
