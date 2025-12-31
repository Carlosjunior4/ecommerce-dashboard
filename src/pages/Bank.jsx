import React from "react";
import {
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Plus,
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const Bank = () => {
  const { balance, banks } = useFinance();

  return (
    <div className="p-8 animate-in fade-in duration-500 dark:text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Minha Carteira
        </h1>
        <button className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:scale-105 transition">
          <Plus size={20} /> Nova Conta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CARTÃO VIRTUAL (VISUAL NUBANK) */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden aspect-[1.58/1] flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition duration-1000"></div>

            <div className="flex justify-between items-start z-10">
              <CreditCard size={32} className="opacity-80" />
              <span className="font-mono opacity-80">NUBANK</span>
            </div>

            <div className="z-10">
              <p className="opacity-70 text-sm mb-1">Saldo Atual</p>
              <h2 className="text-3xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(balance)}
              </h2>
            </div>

            <div className="flex justify-between items-end z-10">
              <div>
                <p className="text-xs opacity-60 uppercase tracking-widest mb-1">
                  Titular
                </p>
                <p className="font-medium tracking-wide">CARLOS EDUARDO</p>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-white/20 -ml-4"></div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-blue-500 transition group text-left">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg w-fit mb-3 group-hover:scale-110 transition">
                <ArrowUpRight size={20} />
              </div>
              <p className="font-bold text-slate-700 dark:text-white">
                Transferir
              </p>
            </button>
            <button className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-purple-500 transition group text-left">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-lg w-fit mb-3 group-hover:scale-110 transition">
                <CreditCard size={20} />
              </div>
              <p className="font-bold text-slate-700 dark:text-white">
                Pagar Fatura
              </p>
            </button>
          </div>
        </div>

        {/* LISTA DE CONTAS */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-bold text-xl text-slate-800 dark:text-white">
            Contas Bancárias
          </h3>

          {banks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <Wallet className="text-slate-500 dark:text-slate-300" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-lg">
                    {bank.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Ag: {bank.agency} • CC: {bank.account}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-slate-800 dark:text-white">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(balance)}
                </p>
                <p className="text-xs text-green-500 font-bold flex items-center justify-end gap-1">
                  <ArrowUpRight size={12} /> Ativo
                </p>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <MoreVertical size={20} />
              </button>
            </div>
          ))}

          {/* Histórico Recente Simples */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Conecte mais contas via Open Finance
            </p>
            <button className="mt-2 text-blue-600 font-bold text-sm hover:underline">
              Conectar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
