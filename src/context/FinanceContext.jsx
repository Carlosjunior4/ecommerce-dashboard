import React, { createContext, useState, useContext, useEffect } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // --- 1. CONFIGURAÇÕES & TEMA ---
  const [storeSettings, setStoreSettings] = useState({
    name: "Nexus Store",
    monthlyGoal: 2500000,
    ownerName: "Carlos Eduardo",
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // --- 2. DADOS INICIAIS ---

  // PRODUTOS
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "Eletrônicos",
      price: 8999.0,
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&q=80",
    },
    {
      id: 2,
      name: "Samsung S24 Ultra",
      category: "Eletrônicos",
      price: 8200.0,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1610945265078-d86f3d297dfb?w=400&q=80",
    },
    {
      id: 3,
      name: "iPad Air 5",
      category: "Tablets",
      price: 5600.0,
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    },
    {
      id: 4,
      name: "Xiaomi 13 Pro",
      category: "Eletrônicos",
      price: 6500.0,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff5b?w=400&q=80",
    },
    {
      id: 5,
      name: "MacBook Air M2",
      category: "Notebooks",
      price: 7499.0,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80",
    },
    {
      id: 6,
      name: "Dell XPS 15",
      category: "Notebooks",
      price: 11500.0,
      stock: 4,
      image:
        "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=400&q=80",
    },
    {
      id: 7,
      name: "PC Gamer RTX 4080",
      category: "Computadores",
      price: 14200.0,
      stock: 2,
      image:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80",
    },
    {
      id: 8,
      name: "Sony WH-1000XM5",
      category: "Áudio",
      price: 2200.0,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=400&q=80",
    },
    {
      id: 9,
      name: "AirPods Pro 2",
      category: "Áudio",
      price: 1800.0,
      stock: 35,
      image:
        "https://images.unsplash.com/photo-1603351154351-5cf99bc5f16d?w=400&q=80",
    },
    {
      id: 10,
      name: "JBL Boombox 3",
      category: "Áudio",
      price: 2600.0,
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1543512214-318c77a799bf?w=400&q=80",
    },
    {
      id: 11,
      name: "Monitor Dell 4K",
      category: "Periféricos",
      price: 3400.0,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1547119957-632f856dd459?w=400&q=80",
    },
    {
      id: 12,
      name: "Teclado Keychron K2",
      category: "Periféricos",
      price: 850.0,
      stock: 45,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=400&q=80",
    },
    {
      id: 13,
      name: "Mouse Logitech MX 3",
      category: "Periféricos",
      price: 650.0,
      stock: 30,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    },
    {
      id: 14,
      name: "Mousepad Extra G",
      category: "Acessórios",
      price: 89.9,
      stock: 100,
      image:
        "https://images.unsplash.com/photo-1615663245857-acda5b245195?w=400&q=80",
    },
    {
      id: 15,
      name: "PlayStation 5 Slim",
      category: "Games",
      price: 3700.0,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80",
    },
    {
      id: 16,
      name: "Xbox Series X",
      category: "Games",
      price: 4200.0,
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1621259182902-3b836c824e22?w=400&q=80",
    },
    {
      id: 17,
      name: "Nintendo Switch OLED",
      category: "Games",
      price: 2100.0,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&q=80",
    },
    {
      id: 18,
      name: "Cadeira Herman Miller",
      category: "Móveis",
      price: 8500.0,
      stock: 3,
      image:
        "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80",
    },
    {
      id: 19,
      name: "Mesa Elevatória",
      category: "Móveis",
      price: 3200.0,
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=400&q=80",
    },
    {
      id: 20,
      name: "Drone DJI Mini 3",
      category: "Drones",
      price: 4100.0,
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80",
    },
    {
      id: 21,
      name: "Câmera Canon R6",
      category: "Fotografia",
      price: 12500.0,
      stock: 2,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    },
    {
      id: 22,
      name: "Alexa Echo Dot 5",
      category: "Casa Inteligente",
      price: 350.0,
      stock: 80,
      image:
        "https://images.unsplash.com/photo-1543512214-318c77a799bf?w=400&q=80",
    },
    {
      id: 23,
      name: "Lâmpada Philips Hue",
      category: "Casa Inteligente",
      price: 250.0,
      stock: 50,
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
    },
    {
      id: 24,
      name: "Apple Watch Ultra",
      category: "Wearables",
      price: 6200.0,
      stock: 7,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
    },
    {
      id: 25,
      name: "Galaxy Watch 6",
      category: "Wearables",
      price: 1500.0,
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80",
    },
  ]);

  // FUNCIONÁRIOS (NOVO)
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Fernanda Costa",
      role: "Gerente",
      salary: 4500,
      phone: "(11) 99999-1001",
      email: "fernanda@nexus.com",
      admission: "2023-01-15",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Ricardo Alves",
      role: "Vendedor",
      salary: 2800,
      phone: "(11) 99999-1002",
      email: "ricardo@nexus.com",
      admission: "2023-06-20",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Juliana Lima",
      role: "Vendedor",
      salary: 2800,
      phone: "(11) 99999-1003",
      email: "juliana@nexus.com",
      admission: "2023-08-10",
      status: "Férias",
    },
    {
      id: 4,
      name: "Marcos Silva",
      role: "Estoquista",
      salary: 2200,
      phone: "(11) 99999-1004",
      email: "marcos@nexus.com",
      admission: "2024-02-01",
      status: "Ativo",
    },
  ]);

  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [banks, setBanks] = useState([
    { id: 1, name: "Nubank", agency: "0001", account: "12345-6" },
  ]);

  // --- 3. GERADOR DE DADOS (Simulação Inicial) ---
  useEffect(() => {
    if (transactions.length > 0) return;

    // Clientes
    const initialCustomers = [
      "Ana Silva",
      "Carlos Eduardo",
      "Beatriz Costa",
      "Daniel Rocha",
      "Fernanda Lima",
      "Gabriel Souza",
      "Helena Martins",
      "Igor Alves",
      "Julia Pereira",
      "Lucas Santos",
    ].map((name, i) => ({
      id: i + 1,
      name,
      email: `${name.split(" ")[0].toLowerCase()}@email.com`,
      phone: "(11) 99999-0000",
      role: "Cliente",
      status: "Ativo",
      spent: 0,
      joinDate: new Date(),
    }));
    setCustomers(initialCustomers);

    // Histórico
    const history = [];
    let startBalance = 45000;
    const today = new Date();

    for (let i = 0; i < 200; i++) {
      const date = new Date(today.getFullYear(), 0, 1);
      date.setDate(date.getDate() + Math.floor(Math.random() * 300));
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      const finalPrice = randomProduct.price * (0.9 + Math.random() * 0.1);

      history.push({
        id: Date.now() - i * 1000,
        type: "income",
        amount: finalPrice,
        description: `Venda: ${randomProduct.name}`,
        date: date,
        details: {
          product: randomProduct.name,
          orderId: `#${2000 + i}`,
          method: "Cartão de Crédito",
        },
      });
      startBalance += finalPrice;
    }

    const expenseTypes = [
      "Energia Elétrica",
      "Fornecedor Apple",
      "Aluguel",
      "Marketing Google",
      "Internet",
      "Limpeza",
    ];
    for (let i = 0; i < 30; i++) {
      const date = new Date(
        today.getFullYear(),
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() * 28) + 1
      );
      const amount = 800 + Math.random() * 5000;
      history.push({
        id: Date.now() - i * 50000,
        type: "expense",
        amount: amount,
        description:
          expenseTypes[Math.floor(Math.random() * expenseTypes.length)],
        date: date,
        details: { category: "Operacional" },
      });
      startBalance -= amount;
    }

    history.sort((a, b) => b.date - a.date);
    setTransactions(history);
    setBalance(startBalance);
  }, []);

  // --- 4. FUNÇÕES DO SISTEMA ---

  // Financeiro
  const addIncome = (amount, description, details = {}) => {
    let updatedProducts = [...products];
    let foundIndex = -1;
    if (details.productId)
      foundIndex = updatedProducts.findIndex(
        (p) => p.id === parseInt(details.productId)
      );
    else if (details.product)
      foundIndex = updatedProducts.findIndex((p) => p.name === details.product);

    if (foundIndex >= 0 && updatedProducts[foundIndex].stock > 0) {
      updatedProducts[foundIndex].stock -= 1;
      setProducts(updatedProducts);
    }
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "income",
        amount,
        description,
        date: new Date(),
        ...details,
      },
      ...prev,
    ]);
    return true;
  };

  const addExpense = (amount, description, category) => {
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "expense",
        amount,
        description,
        date: new Date(),
        details: { category },
      },
      ...prev,
    ]);
  };

  const removeTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) return;
    if (transaction.type === "expense")
      setBalance((prev) => prev + transaction.amount);
    else setBalance((prev) => prev - transaction.amount);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (updatedTx) => {
    const oldTx = transactions.find((t) => t.id === updatedTx.id);
    if (!oldTx) return;
    const diff = updatedTx.amount - oldTx.amount;
    if (updatedTx.type === "expense") setBalance((prev) => prev - diff);
    else setBalance((prev) => prev + diff);
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? { ...t, ...updatedTx } : t))
    );
  };

  // Produtos
  const addNewProduct = (prod) =>
    setProducts((prev) => [{ ...prod, id: Date.now() }, ...prev]);
  const removeProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));
  const updateProduct = (updatedProd) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );

  // Clientes
  const addCustomer = (newCustomer) =>
    setCustomers((prev) => [...prev, { ...newCustomer, id: Date.now() }]);

  // --- FUNCIONÁRIOS (NOVO) ---

  const addEmployee = (emp) =>
    setEmployees((prev) => [...prev, { ...emp, id: Date.now() }]);

  const removeEmployee = (id) =>
    setEmployees((prev) => prev.filter((e) => e.id !== id));

  const updateEmployee = (updatedEmp) =>
    setEmployees((prev) =>
      prev.map((e) => (e.id === updatedEmp.id ? updatedEmp : e))
    );

  // Pagar Salário (Gera Despesa)
  const payEmployee = (employeeId) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (emp) {
      addExpense(emp.salary, `Salário: ${emp.name}`, "Salários");
      return true;
    }
    return false;
  };

  // ---------------------------

  const updateSettings = (s) => setStoreSettings((prev) => ({ ...prev, ...s }));
  const toggleTheme = () => setDarkMode(!darkMode);
  const transferMoney = (amount) => {
    setBalance((prev) => prev - amount);
    return true;
  };
  const addBank = (b) => setBanks((prev) => [...prev, b]);
  const goalProgress = Math.min(
    (balance / storeSettings.monthlyGoal) * 100,
    100
  ).toFixed(1);

  return (
    <FinanceContext.Provider
      value={{
        balance,
        products,
        banks,
        transactions,
        customers,
        employees,
        storeSettings,
        darkMode,
        addIncome,
        addExpense,
        removeTransaction,
        updateTransaction,
        addNewProduct,
        removeProduct,
        updateProduct,
        addCustomer,
        addEmployee,
        removeEmployee,
        updateEmployee,
        payEmployee, // Exportando func. de RH
        transferMoney,
        addBank,
        updateSettings,
        toggleTheme,
        goalProgress,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
