import React, { useState } from "react";
import EditableTable from "@/components/EditableTable";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import { FiveSData, TableColumn } from "@/types/index";

// 5S管理页面组件
const FiveSManagement: React.FC = () => {
  // 定义表格列配置
  const columns: TableColumn[] = [
    {
      key: "area",
      title: "区域",
      type: "select",
      options: [
        { label: "生产线A", value: "lineA" },
        { label: "生产线B", value: "lineB" },
        { label: "仓库", value: "warehouse" },
        { label: "质检区", value: "qcArea" },
        { label: "办公区", value: "office" }
      ],
      required: true
    },
    {
      key: "checkDate",
      title: "检查日期",
      type: "date",
      required: true
    },
    {
      key: "checker",
      title: "检查人",
      type: "text",
      required: true
    },
    {
      key: "sortScore",
      title: "整理评分",
      type: "select",
      options: [
        { label: "优秀(5分)", value: "5" },
        { label: "良好(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "较差(2分)", value: "2" },
        { label: "差(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "setScore",
      title: "整顿评分",
      type: "select",
      options: [
        { label: "优秀(5分)", value: "5" },
        { label: "良好(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "较差(2分)", value: "2" },
        { label: "差(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "sweepScore",
      title: "清扫评分",
      type: "select",
      options: [
        { label: "优秀(5分)", value: "5" },
        { label: "良好(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "较差(2分)", value: "2" },
        { label: "差(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "sanitizeScore",
      title: "清洁评分",
      type: "select",
      options: [
        { label: "优秀(5分)", value: "5" },
        { label: "良好(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "较差(2分)", value: "2" },
        { label: "差(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "sustainScore",
      title: "素养评分",
      type: "select",
      options: [
        { label: "优秀(5分)", value: "5" },
        { label: "良好(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "较差(2分)", value: "2" },
        { label: "差(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "issues",
      title: "问题点",
      type: "text"
    },
    {
      key: "improvement",
      title: "改进措施",
      type: "text"
    },
    {
      key: "completed",
      title: "已完成",
      type: "checkbox"
    }
  ];

  // 初始数据
  const initialData: FiveSData[] = [
    {
      area: { label: "生产线A", value: "lineA" },
      checkDate: "2025-09-20",
      checker: "张三",
      sortScore: { label: "优秀(5分)", value: "5" },
      setScore: { label: "良好(4分)", value: "4" },
      sweepScore: { label: "优秀(5分)", value: "5" },
      sanitizeScore: { label: "良好(4分)", value: "4" },
      sustainScore: { label: "一般(3分)", value: "3" },
      issues: "部分工具摆放不规范",
      improvement: "重新规划工具摆放位置",
      completed: true
    },
    {
      area: { label: "生产线B", value: "lineB" },
      checkDate: "2025-09-21",
      checker: "李四",
      sortScore: { label: "良好(4分)", value: "4" },
      setScore: { label: "一般(3分)", value: "3" },
      sweepScore: { label: "良好(4分)", value: "4" },
      sanitizeScore: { label: "一般(3分)", value: "3" },
      sustainScore: { label: "良好(4分)", value: "4" },
      issues: "地面有少量油污",
      improvement: "加强设备维护和地面清洁",
      completed: false
    }
  ];

  // 状态管理
  const [tableData, setTableData] = useState<FiveSData[]>(initialData);

  // 处理数据保存
  const handleSave = (data: FiveSData[]) => {
    setTableData(data);
  };

  // 准备图表数据
  const prepareChartData = () => {
    // 计算各区域的平均得分
    const areaScores: { [key: string]: { total: number; count: number } } = {};
    
    tableData.forEach(row => {
      // const areaValue = row.area?.value || "";
      const areaLabel = row.area?.label || "未知区域";
      
      if (!areaScores[areaLabel]) {
        areaScores[areaLabel] = { total: 0, count: 0 };
      }
      
      // 计算总分
      const totalScore = 
        parseInt(row.sortScore?.value || "0") +
        parseInt(row.setScore?.value || "0") +
        parseInt(row.sweepScore?.value || "0") +
        parseInt(row.sanitizeScore?.value || "0") +
        parseInt(row.sustainScore?.value || "0");
      
      areaScores[areaLabel].total += totalScore;
      areaScores[areaLabel].count += 1;
    });
    
    // 计算平均分（满分25分）
    const barChartData = Object.entries(areaScores).map(([area, scoreData]) => ({
      area,
      score: scoreData.count > 0 ? Math.round((scoreData.total / scoreData.count) / 25 * 100) : 0
    }));
    
    // 计算5S各维度的平均得分
    const dimensionScores = {
      整理: 0,
      整顿: 0,
      清扫: 0,
      清洁: 0,
      素养: 0
    };
    
    tableData.forEach(row => {
      dimensionScores.整理 += parseInt(row.sortScore?.value || "0");
      dimensionScores.整顿 += parseInt(row.setScore?.value || "0");
      dimensionScores.清扫 += parseInt(row.sweepScore?.value || "0");
      dimensionScores.清洁 += parseInt(row.sanitizeScore?.value || "0");
      dimensionScores.素养 += parseInt(row.sustainScore?.value || "0");
    });
    
    const totalRows = tableData.length || 1;
    const pieChartData = Object.entries(dimensionScores).map(([name, score]) => ({
      name,
      value: Math.round(score / totalRows)
    }));
    
    return { barChartData, pieChartData };
  };
  
  const { barChartData, pieChartData } = prepareChartData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">5S管理</h1>
        <p className="text-gray-600 dark:text-gray-400">
          整理(Seiri)、整顿(Seiton)、清扫(Seiso)、清洁(Seiketsu)、素养(Shitsuke)
        </p>
      </motion.div>

      {/* 数据统计卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">检查区域数</h3>
          <p className="text-4xl font-bold text-blue-500">{new Set(tableData.map(row => row.area?.label)).size}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">待改进项</h3>
          <p className="text-4xl font-bold text-amber-500">{tableData.filter(row => !row.completed).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">已完成改进</h3>
          <p className="text-4xl font-bold text-green-500">{tableData.filter(row => row.completed).length}</p>
        </div>
      </motion.div>

      {/* 图表区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">各区域5S评分(%)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" name="5S评分" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">5S各维度平均得分</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* 数据表格 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <EditableTable
          columns={columns}
          initialData={initialData}
          onSave={handleSave}
          moduleName="5S管理"
        />
      </motion.div>
    </div>
  );
};

export default FiveSManagement;