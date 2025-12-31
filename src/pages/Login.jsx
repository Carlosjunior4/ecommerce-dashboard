import React, { useState } from "react";
import { Lock, Mail, User, ArrowRight, Layers } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Salva a "chave" de acesso
    localStorage.setItem("user_token", "demo_token_123");

    // 2. FORÇA a entrada no sistema (Recarrega a página)
    // Isso resolve o problema de clicar e não entrar
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        {/* Lado Esquerdo - Visual */}
        <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-2xl font-bold mb-2">
              <Layers /> NexusAdmin
            </div>
            <p className="text-blue-100">Controle total do seu negócio.</p>
          </div>
          <div className="relative z-10 mt-12">
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? "Bem-vindo!" : "Crie sua conta"}
            </h2>
            <p className="text-blue-100/90">
              {isLogin
                ? "Entre para ver seus relatórios e vendas em tempo real."
                : "Cadastre-se para começar a gerenciar seu estoque."}
            </p>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="flex gap-4 mb-8 bg-slate-100 p-1 rounded-xl w-fit mx-auto md:mx-0">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                isLogin
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Criar Conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <User size={20} className="text-slate-400" />
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none w-full ml-3"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <Mail size={20} className="text-slate-400" />
                <input
                  type="email"
                  required
                  className="bg-transparent border-none outline-none w-full ml-3"
                  placeholder="admin@teste.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Senha
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <Lock size={20} className="text-slate-400" />
                <input
                  type="password"
                  required
                  className="bg-transparent border-none outline-none w-full ml-3"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              {isLogin ? "Acessar Sistema" : "Cadastrar"}{" "}
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-400">
            Dica: Pode usar qualquer email e senha para testar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
