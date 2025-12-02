import React from "react";
import { Outlet, Link } from "react-router-dom";
import { 
  ClipboardList, 
  AlertTriangle, 
  Users, 
  Settings, 
  Shield, 
  ArrowUp,
  Home,
  Moon,
  Sun,
  LogOut
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { toast } from "sonner";

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useContext(AuthContext);
  
  const handleLogout = () => {
    logout();
    toast("已成功退出登录");
  };
  
  const menuItems = [
    { name: "首页", icon: <Home className="w-5 h-5" />, path: "/" },
    { name: "5S管理", icon: <ClipboardList className="w-5 h-5" />, path: "/5s" },
    { name: "快速反应跟踪", icon: <AlertTriangle className="w-5 h-5" />, path: "/quick-response" },
    { name: "人员技能矩阵", icon: <Users className="w-5 h-5" />, path: "/skill-matrix" },
    { name: "4M1E变动管理", icon: <Settings className="w-5 h-5" />, path: "/4m1e" },
    { name: "GP12早期生产遏制", icon: <Shield className="w-5 h-5" />, path: "/gp12" },
    { name: "升级处理", icon: <ArrowUp className="w-5 h-5" />, path: "/escalation" }
  ];

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">车间管理看板系统</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={theme === 'dark' ? '切换至亮色模式' : '切换至暗色模式'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="退出登录"
              >
                <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* 侧边栏导航 */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:block">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
           © {new Date().getFullYear()} 生产车间管理看板系统 - 版权所有
        </div>
      </footer>
    </div>
  );
};

export default Layout;