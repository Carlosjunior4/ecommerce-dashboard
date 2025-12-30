import React from "react";
import { Search, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Barra de Busca */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Buscar pedidos, clientes..."
          className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700"
        />
      </div>

      {/* Perfil e Notificações */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-blue-600 transition">
          <Bell size={24} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Gerente</p>
          </div>
          <img
            src="https://ui-avatars.com/api/?name=Carlos+Eduardo&background=0D8ABC&color=fff"
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
