import React, { useState } from "react";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  CheckCircle,
  Tag,
  X,
  Image as ImageIcon,
  Trash2,
  Edit,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const Products = () => {
  const { products, addNewProduct, removeProduct, updateProduct } =
    useFinance();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("Todos");

  // Estados para Edição/Criação
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Eletrônicos",
    price: "",
    stock: "",
    image: "",
  });

  // Filtros
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "Todos" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  // --- FUNÇÕES DOS BOTÕES ---

  // 1. Botão Adicionar Produto
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "Eletrônicos",
      price: "",
      stock: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  // 2. Botão Editar (Atualizar Estoque/Preço)
  const handleOpenEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const payload = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      image: formData.image,
    };

    if (editingId) {
      updateProduct({ ...payload, id: editingId }); // Atualiza
      alert("Produto atualizado com sucesso!");
    } else {
      addNewProduct(payload); // Cria novo
      alert("Produto criado com sucesso!");
    }
    setIsModalOpen(false);
  };

  // 3. Botão Remover
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      removeProduct(id);
    }
  };

  // Helpers
  const getStockStatus = (stock) => {
    if (stock === 0)
      return {
        color:
          "bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
        text: "Esgotado",
        icon: <X size={14} />,
      };
    if (stock < 5)
      return {
        color:
          "bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
        text: "Baixo Estoque",
        icon: <AlertTriangle size={14} />,
      };
    return {
      color:
        "bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
      text: "Em Estoque",
      icon: <CheckCircle size={14} />,
    };
  };

  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/400x300/1e293b/ffffff?text=Sem+Imagem";
  };

  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-500 dark:text-white transition-colors">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Catálogo de Produtos
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Gerencie estoque, preços e cadastro.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-200 dark:shadow-none whitespace-nowrap"
        >
          <Plus size={20} /> Novo Produto
        </button>
      </div>

      {/* FILTROS */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 justify-between transition-colors">
        <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 w-full md:w-96">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar produto..."
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
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                categoryFilter === cat
                  ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900 border-transparent"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const status = getStockStatus(product.stock);

          return (
            <div
              key={product.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col h-full relative"
            >
              {/* --- BOTÕES DE AÇÃO FLUTUANTES --- */}
              <div className="absolute top-3 left-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleOpenEdit(product)}
                  className="p-2 bg-white/90 dark:bg-slate-900/90 text-blue-600 rounded-lg shadow-sm hover:scale-110 transition border border-slate-200 dark:border-slate-700"
                  title="Editar / Atualizar Estoque"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 bg-white/90 dark:bg-slate-900/90 text-red-500 rounded-lg shadow-sm hover:scale-110 transition border border-slate-200 dark:border-slate-700"
                  title="Excluir Produto"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Imagem */}
              <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
                <img
                  src={
                    product.image ||
                    "https://placehold.co/400x300/1e293b/ffffff?text=Produto"
                  }
                  alt={product.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border shadow-sm backdrop-blur-md ${status.color}`}
                  >
                    {status.icon} {status.text}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 px-2 py-1 rounded-md uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1 leading-tight line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-auto pt-4 flex items-end justify-between border-t border-slate-50 dark:border-slate-700">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">
                      Preço
                    </p>
                    <p className="text-xl font-bold text-slate-800 dark:text-white">
                      R${" "}
                      {product.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">
                      Estoque
                    </p>
                    <p
                      className={`font-bold ${
                        product.stock < 5
                          ? "text-orange-500"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {product.stock}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <Package size={48} className="mx-auto mb-4 opacity-20" />
          <p>Nenhum produto encontrado.</p>
        </div>
      )}

      {/* --- MODAL (CRIAR / EDITAR) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden p-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                {editingId ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} className="text-slate-400 hover:text-red-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nome
                </label>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3">
                  <Tag size={18} className="text-slate-400" />
                  <input
                    required
                    className="bg-transparent outline-none w-full text-sm dark:text-white"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-sm dark:text-white"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Estoque
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-sm dark:text-white"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>
              </div>

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
                  <option>Eletrônicos</option>
                  <option>Notebooks</option>
                  <option>Periféricos</option>
                  <option>Móveis</option>
                  <option>Games</option>
                  <option>Áudio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                  URL da Imagem
                </label>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3">
                  <ImageIcon size={18} className="text-slate-400" />
                  <input
                    className="bg-transparent outline-none w-full text-sm dark:text-white"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg mt-2 transition-transform active:scale-95">
                {editingId ? "Salvar Alterações" : "Cadastrar Produto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
