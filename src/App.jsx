import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Bank from "./pages/Bank";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Records from "./pages/Records";
import Expenses from "./pages/Expenses";
import Employees from "./pages/Employees"; // <--- NOVO IMPORT

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user_token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <FinanceProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen font-sans transition-colors duration-300">
                  <Sidebar />
                  <div className="flex-1 ml-64 flex flex-col">
                    <Header />
                    <main className="flex-1 overflow-y-auto">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/employees" element={<Employees />} />{" "}
                        {/* <--- NOVA ROTA */}
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/bank" element={<Bank />} />
                        <Route path="/records" element={<Records />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </FinanceProvider>
  );
}

export default App;
