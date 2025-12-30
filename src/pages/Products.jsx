import React from "react";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";

const Products = () => {
  // Dados falsos para simular o banco de dados
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Eletrônicos",
      price: "R$ 7.999",
      stock: 45,
      status: "Em Estoque",
    },
    {
      id: 2,
      name: "Macbook Air M2",
      category: "Notebooks",
      price: "R$ 8.499",
      stock: 12,
      status: "Baixo Estoque",
    },
    {
      id: 3,
      name: "Smart TV 4K",
      category: "Eletrônicos",
      price: "R$ 3.200",
      stock: 0,
      status: "Esgotado",
    },
    {
      id: 4,
      name: "Nike Air Jordan",
      category: "Calçados",
      price: "R$ 1.100",
      stock: 89,
      status: "Em Estoque",
    },
    {
      id: 5,
      name: "Cadeira Gamer",
      category: "Móveis",
      price: "R$ 1.500",
      stock: 20,
      status: "Em Estoque",
    },
  ];

  return (
    <div className="p-8">
      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
          <p className="text-gray-500">Gerencie seu catálogo de inventário</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={20} /> Novo Produto
        </button>
      </div>

      {/* Barra de Ferramentas */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4 w-1/2">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produto..."
              className="bg-transparent ml-2 outline-none text-sm w-full"
            />
          </div>
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition">
          <Filter size={18} /> Filtros
        </button>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
            <tr>
              <th className="p-4">Nome do Produto</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Preço</th>
              <th className="p-4">Estoque</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-gray-800">
                  {product.name}
                </td>
                <td className="p-4 text-gray-500">{product.category}</td>
                <td className="p-4 font-medium text-gray-800">
                  {product.price}
                </td>
                <td className="p-4 text-gray-500">{product.stock} unid.</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === "Em Estoque"
                        ? "bg-green-100 text-green-700"
                        : product.status === "Baixo Estoque"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
