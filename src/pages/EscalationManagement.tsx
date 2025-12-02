import React, { useState } from "react";
import EditableTable from "@/components/EditableTable";
import { motion } from "framer-motion";
import { EscalationData, TableColumn } from "@/types/index";
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

// 升级处理页面组件
const EscalationManagement: React.FC = () => {
  // 定义表格列配置
  const columns: TableColumn[] = [
    {
      key: "escalationId",
      title: "升级编号",
      type: "text",
      required: true
    },
    {
      key: "relatedIssueId",
      title: "关联问题编号",
      type: "text"
    },
    {
      key: "escalationDate",
      title: "升级日期",
      type: "date",
      required: true
    },
    {
      key: "escalator",
      title: "升级人",
      type: "text",
      required: true
    },
    {
      key: "issueSummary",
      title: "问题摘要",
      type: "text",
      required: true
    },
    {
      key: "currentStatus",
      title: "当前状态",
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
      key: "priority",
      title: "优先级",
      type: "select",
      options: [
        { label: "紧急", value: "urgent" },
        { label: "高", value: "high" },
        { label: "中", value: "medium" },
        { label: "低", value: "low" }
      ],
      required: true
    },
    {
      key: "targetResolver",
      title: "负责解决人",
      type: "text",
      required: true
    },
    {
      key: "expectedResolutionDate",
      title: "期望解决日期",
      type: "date",
      required: true
    },
    {
      key: "actualResolutionDate",
      title: "实际解决日期",
      type: "date"
    },
    {
      key: "resolutionSummary",
      title: "解决摘要",
      type: "text"
    },
    {
      key: "preventiveActions",
      title: "预防措施",
      type: "text"
    }
  ];

  // 初始数据
  const initialData: EscalationData[] = [
    {
      escalationId: "ESC-20250927-001",
      relatedIssueId: "QR-20250927-002",
      escalationDate: "2025-09-27",
      escalator: "钱七",
      issueSummary: "风扇噪音超标问题未能及时解决，已影响3批次产品质量",
      currentStatus: { label: "处理中", value: "processing" },
      priority: { label: "紧急", value: "urgent" },
      targetResolver: "赵六",
      expectedResolutionDate: "2025-09-28",
      actualResolutionDate: "",
      resolutionSummary: "",
      preventiveActions: ""
    },
    {
      escalationId: "ESC-20250926-001",
      relatedIssueId: "4M1E-20250927-002",
      escalationDate: "2025-09-26",
      escalator: "孙八",
      issueSummary: "装配工序优化方案审批延迟，影响生产效率提升计划",
      currentStatus: { label: "已解决", value: "solved" },
      priority: { label: "高", value: "high" },
      targetResolver: "周九",
      expectedResolutionDate: "2025-09-27",
      actualResolutionDate: "2025-09-27",
      resolutionSummary: "方案已批准，计划于明日实施",
      preventiveActions: "优化审批流程，设定明确的审批时限"
    },
    {
      escalationId: "ESC-20250925-001",
      relatedIssueId: "",
      escalationDate: "2025-09-25",
      escalator: "吴十",
      issueSummary: "新员工培训不到位，导致操作失误增加",
      currentStatus: { label: "处理中", value: "processing" },
      priority: { label: "中", value: "medium" },
      targetResolver: "郑十一",
      expectedResolutionDate: "2025-10-05",
      actualResolutionDate: "",
      resolutionSummary: "正在制定详细的培训计划",
      preventiveActions: ""
    }
  ];

  // 状态管理
  const [tableData, setTableData] = useState<EscalationData[]>(initialData);

  // 处理数据保存
  const handleSave = (data: EscalationData[]) => {
    setTableData(data);
  };

  // 准备图表数据
  const prepareChartData = () => {
    // 按优先级统计
    const priorityCount: { [key: string]: number } = {};
    // 按状态统计
    const statusCount: { [key: string]: number } = {};
    
    tableData.forEach(row => {
      // 优先级统计
      const priorityLabel = row.priority?.label || "未知优先级";
      priorityCount[priorityLabel] = (priorityCount[priorityLabel] || 0) + 1;
      
      // 状态统计
      const statusLabel = row.currentStatus?.label || "未知状态";
      statusCount[statusLabel] = (statusCount[statusLabel] || 0) + 1;
    });
    
    // 转换为图表数据格式
    const priorityChartData = Object.entries(priorityCount).map(([name, value]) => ({
      name,
      value
    }));
    
    const statusChartData = Object.entries(statusCount).map(([name, value]) => ({
      name,
      value
    }));
    
    // 计算解决率
    const totalIssues = tableData.length;
    const resolvedIssues = tableData.filter(row => 
      row.currentStatus?.label === "已解决" || row.currentStatus?.label === "已关闭"
    ).length;
    const resolutionRate = totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0;
    
    return { priorityChartData, statusChartData, resolutionRate };
  };
  
  const { priorityChartData, statusChartData, resolutionRate } = prepareChartData();
  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">升级处理</h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理需要高层关注和协调的重要问题
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">总升级数</h3>
          <p className="text-4xl font-bold text-blue-500">{tableData.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">紧急/高优先级</h3>
          <p className="text-4xl font-bold text-red-500">
            {tableData.filter(row => 
              row.priority?.label === "紧急" || row.priority?.label === "高"
            ).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">待处理</h3>
          <p className="text-4xl font-bold text-amber-500">
            {tableData.filter(row => 
              row.currentStatus?.label === "待处理" || row.currentStatus?.label === "处理中"
            ).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">解决率(%)</h3>
          <p className="text-4xl font-bold text-green-500">{resolutionRate.toFixed(1)}</p>
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">优先级分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {priorityChartData.map((_, index) => (
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">状态分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="升级数量" />
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
          moduleName="升级处理"
        />
      </motion.div>
    </div>
  );
};

export default EscalationManagement;