import React, { useState } from "react";
import EditableTable from "@/components/EditableTable";
import { motion } from "framer-motion";
import { QRData, TableColumn } from "@/types/index";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// 快速反应跟踪页面组件
const QuickResponseTracking: React.FC = () => {
  // 定义表格列配置
  const columns: TableColumn[] = [
    {
      key: "issueId",
      title: "问题编号",
      type: "text",
      required: true
    },
    {
      key: "reportTime",
      title: "报告时间",
      type: "date",
      required: true
    },
    {
      key: "reporter",
      title: "报告人",
      type: "text",
      required: true
    },
    {
      key: "department",
      title: "所属部门",
      type: "select",
       options: [
         { label: "生产部", value: "production" },
         { label: "品保部", value: "quality" },
         { label: "研发部", value: "rd" },
         { label: "仓管部", value: "logistics" },
         { label: "生技部", value: "equipment" }
      ],
      required: true
    },
    {
      key: "issueType",
      title: "问题类型",
      type: "select",
      options: [
        { label: "质量问题", value: "quality" },
        { label: "设备故障", value: "equipment" },
        { label: "物料短缺", value: "material" },
        { label: "人员问题", value: "personnel" },
        { label: "工艺问题", value: "process" },
        { label: "其他问题", value: "other" }
      ],
      required: true
    },
    {
      key: "description",
      title: "问题描述",
      type: "text",
      required: true
    },
    {
      key: "severity",
      title: "严重程度",
      type: "select",
      options: [
        { label: "紧急", value: "urgent" },
        { label: "严重", value: "serious" },
        { label: "一般", value: "normal" },
        { label: "轻微", value: "minor" }
      ],
      required: true
    },
    {
      key: "responsible",
      title: "责任人",
      type: "text",
      required: true
    },
    {
      key: "solution",
      title: "解决方案",
      type: "text"
    },
    {
      key: "solveTime",
      title: "解决时间",
      type: "date"
    },
    {
      key: "status",
      title: "状态",
      type: "select",
      options: [
        { label: "待处理", value: "pending" },
        { label: "处理中", value: "processing" },
        { label: "已解决", value: "solved" },
        { label: "已关闭", value: "closed" }
      ],
      required: true
    },
    {
      key: "comment",
      title: "备注",
      type: "text"
    }
  ];

  // 初始数据
  const initialData: QRData[] = [
    {
      issueId: "QR-20250927-001",
      reportTime: "2025-09-27",
      reporter: "王五",
      department: { label: "生产部", value: "production" },
      issueType: { label: "设备故障", value: "equipment" },
      description: "生产线A的风扇装配机出现异响",
      severity: { label: "严重", value: "serious" },
      responsible: "赵六",
      solution: "更换轴承，调整装配参数",
      solveTime: "2025-09-27",
      status: { label: "已解决", value: "solved" },
      comment: "需加强设备日常维护"
    },
    {
      issueId: "QR-20250927-002",
      reportTime: "2025-09-27",
      reporter: "钱七",
       department: { label: "品保部", value: "quality" },
      issueType: { label: "质量问题", value: "quality" },
      description: "抽检发现5台成品风扇噪音超标",
      severity: { label: "紧急", value: "urgent" },
      responsible: "孙八",
      solution: "重新校准测试设备，排查生产工艺",
      solveTime: "",
      status: { label: "处理中", value: "processing" },
      comment: "暂停该批次出货"
    }
  ];

  // 状态管理
  const [tableData, setTableData] = useState<QRData[]>(initialData);

  // 处理数据保存
  const handleSave = (data: QRData[]) => {
    setTableData(data);
  };

  // 准备图表数据
  const prepareChartData = () => {
    // 按问题类型统计
    const typeCount: { [key: string]: number } = {};
    // 按状态统计
    const statusCount: { [key: string]: number } = {};
    
    tableData.forEach(row => {
      // 问题类型统计
      const typeLabel = row.issueType?.label || "未知类型";
      typeCount[typeLabel] = (typeCount[typeLabel] || 0) + 1;
      
      // 状态统计
      const statusLabel = row.status?.label || "未知状态";
      statusCount[statusLabel] = (statusCount[statusLabel] || 0) + 1;
    });
    
    // 转换为图表数据格式
    const typeChartData = Object.entries(typeCount).map(([name, value]) => ({
      name,
      value
    }));
    
    const statusChartData = Object.entries(statusCount).map(([name, value]) => ({
      name,
      value
    }));
    
    return { typeChartData, statusChartData };
  };
  
  const { typeChartData, statusChartData } = prepareChartData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">快速反应跟踪</h1>
        <p className="text-gray-600 dark:text-gray-400">
          实时跟踪和解决生产过程中的各种问题，确保生产顺利进行
        </p>
      </motion.div>

      {/* 数据统计卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">总问题数</h3>
          <p className="text-4xl font-bold text-blue-500">{tableData.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">待处理</h3>
          <p className="text-4xl font-bold text-amber-500">
            {tableData.filter(row => row.status?.label === "待处理").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">处理中</h3>
          <p className="text-4xl font-bold text-purple-500">
            {tableData.filter(row => row.status?.label === "处理中").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">已解决</h3>
          <p className="text-4xl font-bold text-green-500">
            {tableData.filter(row => row.status?.label === "已解决" || row.status?.label === "已关闭").length}
          </p>
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">问题类型分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {typeChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">问题状态分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="问题数量" />
              </BarChart>
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
          moduleName="快速反应跟踪"
        />
      </motion.div>
    </div>
  );
};

export default QuickResponseTracking;