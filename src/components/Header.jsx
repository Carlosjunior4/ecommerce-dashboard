import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  LogOut,
  User,
  X,
  Wallet,
  ShoppingBag,
  UserPlus,
  Settings,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

const Header = () => {
  const { addIncome, addCustomer, products, storeSettings } = useFinance();
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // --- LÓGICA DE SIMULAÇÃO (AGORA BEM MAIS LENTA) ---
  useEffect(() => {
    if (!products || products.length === 0) return;

    const generateEvent = () => {
      const rand = Math.random();

      // LÓGICA: Vendas mais difíceis (40% Venda / 60% Apenas Cadastro)
      if (rand > 0.4) {
        // --- CENÁRIO: NOVO CLIENTE/MEMBRO (Mais Comum) ---
        const names = [
          "Juliana",
          "Roberto",
          "Larissa",
          "Patrícia",
          "Marcos",
          "Sofia",
          "André",
          "Camila",
        ];
        const randomName =
          names[Math.floor(Math.random() * names.length)] +
          " " +
          Math.floor(Math.random() * 1000);

        const newCustomer = {
          name: randomName,
          email: `${randomName.split(" ")[0].toLowerCase()}${Math.floor(
            Math.random() * 99
          )}@email.com`,
          phone: "(11) 98888-0000",
          role: "Membro", // Novo status
          status: "Novo",
          spent: 0,
        };

        // Adiciona ao Contexto
        addCustomer(newCustomer);

        const event = {
          title: "Novo Registro",
          desc: `${randomName} acabou de se tornar membro.`,
          type: "customer",
        };

        const newNotif = {
          id: Date.now(),
          ...event,
          read: false,
          time: "Agora",
        };
        setNotifications((prev) => [newNotif, ...prev].slice(0, 8));
        setToast(newNotif);
      } else {
        // --- CENÁRIO: VENDA (Mais Raro) ---
        const randomProduct =
          products[Math.floor(Math.random() * products.length)];

        // Se produto estiver esgotado, cancela o evento (simula desistência)
        if (!randomProduct || randomProduct.stock <= 0) return;

        let method = Math.random() > 0.7 ? "PIX" : "Cartão de Crédito"; // Pix é mais raro também
        const orderId = Math.floor(Math.random() * 8999) + 1000;

        addIncome(randomProduct.price, `Venda: ${randomProduct.name}`, {
          orderId: `#${orderId}`,
          product: randomProduct.name,
          method,
        });

        const event = {
          title: `Nova Venda #${orderId}`,
          desc: `${randomProduct.name} vendido!`,
          type: "sale",
        };

        const newNotif = {
          id: Date.now(),
          ...event,
          read: false,
          time: "Agora",
        };
        setNotifications((prev) => [newNotif, ...prev].slice(0, 8));
        setToast(newNotif);
      }

      // LIMPA O TOAST APÓS 6 SEGUNDOS
      setTimeout(() => setToast(null), 6000);

      // --- NOVO INTERVALO: BEM DEMORADO ---
      // Entre 10 minutos (600000ms) e 30 minutos (1800000ms)
      const nextTime = Math.random() * (1800000 - 600000) + 600000;

      // Agenda o próximo evento
      setTimeout(generateEvent, nextTime);
    };

    // Primeira execução demora 1 minuto para não assustar no login
    const timer = setTimeout(generateEvent, 60000);

    return () => clearTimeout(timer);
  }, [products]); // Dependência correta

  return (
    <>
      {/* TOAST FLUTUANTE */}
      {toast && (
        <div className="fixed top-6 right-1/2 translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500 pointer-events-none">
          <div className="bg-slate-900/95 dark:bg-white/95 backdrop-blur-md text-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10 w-auto max-w-md pointer-events-auto">
            <div
              className={`p-2.5 rounded-xl text-white ${
                toast.type === "customer" ? "bg-purple-500" : "bg-green-500"
              }`}
            >
              {toast.type === "customer" ? (
                <UserPlus size={18} />
              ) : (
                <ShoppingBag size={18} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{toast.title}</p>
              <p className="text-xs opacity-80">{toast.desc}</p>
            </div>
            <button onClick={() => setToast(null)}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 h-20 px-4 md:px-8 flex items-center justify-between shadow-sm transition-colors">
        {/* BUSCA */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 w-96 border border-transparent focus-within:border-blue-500 transition-all">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 dark:text-white font-medium"
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/products?q=${e.target.value}`)
            }
          />
        </div>

        {/* ÍCONES DIREITA */}
        <div className="flex items-center gap-3 md:gap-4 ml-auto">
          <Link
            to="/bank"
            className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition relative group hidden sm:block"
          >
            <Wallet size={22} />
          </Link>

          {/* NOTIFICAÇÕES */}
          <div className="relative">
            <button
              className="relative p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
            >
              <Bell size={22} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-2.5 right-3 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
              )}
            </button>
            {showNotifMenu && (
              <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                  <span className="font-bold text-slate-800 dark:text-white text-sm">
                    Notificações
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scroll">
                  {notifications.length === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-8">
                      Sem novidades
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-50 dark:border-slate-700 flex gap-3 transition-colors"
                      >
                        <div
                          className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                            n.type === "customer"
                              ? "bg-purple-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {n.desc}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PERFIL */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded-xl transition border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${storeSettings.ownerName}&background=0D8ABC&color=fff`}
                className="w-9 h-9 rounded-lg shadow-sm"
                alt="Perfil"
              />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-50 animate-in fade-in zoom-in-95">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <Settings size={16} /> Configurações
                </Link>
                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                <button
                  onClick={() => {
                    localStorage.removeItem("user_token");
                    window.location.href = "/login";
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={16} /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
