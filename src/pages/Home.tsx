import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ClipboardList, 
  AlertTriangle, 
  Users, 
  Settings, 
  Shield, 
  ArrowUp 
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  
  const modules = [
    {
      id: "5s",
      title: "5S管理",
      description: "整理、整顿、清扫、清洁、素养",
      icon: <ClipboardList className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      id: "quick-response",
      title: "快速反应跟踪",
      description: "实时问题跟踪与解决",
      icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
      color: "bg-amber-100 dark:bg-amber-900/30"
    },
    {
      id: "skill-matrix",
      title: "人员技能矩阵",
      description: "员工技能水平与培训管理",
      icon: <Users className="h-8 w-8 text-green-500" />,
      color: "bg-green-100 dark:bg-green-900/30"
    },
    {
      id: "4m1e",
      title: "4M1E变动管理",
      description: "人机料法环变动控制",
      icon: <Settings className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      id: "gp12",
      title: "GP12早期生产遏制",
      description: "新产品质量控制",
      icon: <Shield className="h-8 w-8 text-red-500" />,
      color: "bg-red-100 dark:bg-red-900/30"
    },
    {
      id: "escalation",
      title: "升级处理",
      description: "问题升级与处理流程",
      icon: <ArrowUp className="h-8 w-8 text-indigo-500" />,
      color: "bg-indigo-100 dark:bg-indigo-900/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <motion.h1 
            className="text-4xl font-bold mb-3 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
             生产车间管理看板系统
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            高效管理生产流程，提升产品质量
          </motion.p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${module.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/${module.id}`} className="block">
                <div className="flex items-center mb-4">
                  {module.icon}
                  <h2 className="text-xl font-semibold ml-3 text-gray-800 dark:text-white">{module.title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{module.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {isDark ? "切换至亮色模式" : "切换至暗色模式"}
          </button>
        </div>
      </div>
    </div>
  );
}