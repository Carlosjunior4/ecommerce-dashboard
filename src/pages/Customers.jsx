import React from "react";
import { Mail, Phone, MapPin, MoreVertical } from "lucide-react";

const Customers = () => {
  const customers = [
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@email.com",
      location: "São Paulo, SP",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Carlos Eduardo",
      email: "carlos.edu@email.com",
      location: "Rio de Janeiro, RJ",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Mariana Costa",
      email: "mari.costa@email.com",
      location: "Belo Horizonte, MG",
      status: "Inativo",
    },
    {
      id: 4,
      name: "João Pedro",
      email: "jp.souza@email.com",
      location: "Curitiba, PR",
      status: "Ativo",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Clientes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                {customer.name.charAt(0)}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-gray-800">{customer.name}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {customer.status === "Ativo" ? "Cliente VIP" : "Cliente Ex-VIP"}
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" /> {customer.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />{" "}
                {customer.location}
              </div>
            </div>

            <button className="w-full mt-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
              Ver Perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
