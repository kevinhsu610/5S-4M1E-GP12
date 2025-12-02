import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import FiveSManagement from "@/pages/FiveSManagement";
import QuickResponseTracking from "@/pages/QuickResponseTracking";
import SkillMatrix from "@/pages/SkillMatrix";
import FourM1EChangeManagement from "@/pages/FourM1EChangeManagement";
import GP12EarlyProduction from "@/pages/GP12EarlyProduction";
import EscalationManagement from "@/pages/EscalationManagement";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认已登录以便演示

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/5s" element={<FiveSManagement />} />
          <Route path="/quick-response" element={<QuickResponseTracking />} />
          <Route path="/skill-matrix" element={<SkillMatrix />} />
          <Route path="/4m1e" element={<FourM1EChangeManagement />} />
          <Route path="/gp12" element={<GP12EarlyProduction />} />
          <Route path="/escalation" element={<EscalationManagement />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}
