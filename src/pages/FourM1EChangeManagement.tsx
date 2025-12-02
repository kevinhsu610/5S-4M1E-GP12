import React, { useState } from "react";
import EditableTable from "@/components/EditableTable";
import { motion } from "framer-motion";
import { FourM1EData, TableColumn } from "@/types/index";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// 4M1E变动管理页面组件
const FourM1EChangeManagement: React.FC = () => {
  // 定义表格列配置
  const columns: TableColumn[] = [
    {
      key: "changeId",
      title: "变动编号",
      type: "text",
      required: true
    },
    {
      key: "changeType",
      title: "变动类型",
      type: "select",
      options: [
        { label: "人员变动(Man)", value: "man" },
        { label: "机器变动(Machine)", value: "machine" },
        { label: "材料变动(Material)", value: "material" },
        { label: "方法变动(Method)", value: "method" },
        { label: "环境变动(Environment)", value: "environment" }
      ],
      required: true
    },
    {
      key: "changeDate",
      title: "变动日期",
      type: "date",
      required: true
    },
    {
      key: "applicant",
      title: "申请人",
      type: "text",
      required: true
    },
    {
      key: "department",
      title: "申请部门",
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
      key: "changeDescription",
      title: "变动描述",
      type: "text",
      required: true
    },
    {
      key: "reason",
      title: "变动原因",
      type: "text",
      required: true
    },
    {
      key: "impactAnalysis",
      title: "影响分析",
      type: "text"
    },
    {
      key: "approvalStatus",
      title: "审批状态",
      type: "select",
      options: [
        { label: "待审批", value: "pending" },
        { label: "已批准", value: "approved" },
        { label: "已拒绝", value: "rejected" }
      ],
      required: true
    },
    {
      key: "approver",
      title: "审批人",
      type: "text"
    },
    {
      key: "implementationDate",
      title: "实施日期",
      type: "date"
    },
    {
      key: "effectiveness",
      title: "效果评估",
      type: "select",
      options: [
        { label: "优秀", value: "excellent" },
        { label: "良好", value: "good" },
        { label: "一般", value: "normal" },
        { label: "较差", value: "poor" }
      ]
    }
  ];

  // 初始数据
  const initialData: FourM1EData[] = [
    {
      changeId: "4M1E-20250927-001",
      changeType: { label: "机器变动(Machine)", value: "machine" },
      changeDate: "2025-09-25",
      applicant: "赵六",
       department: { label: "生技部", value: "equipment" },
      changeDescription: "更换生产线A的风扇电机测试设备",
      reason: "原设备老化，测试精度下降",
      impactAnalysis: "可能影响前2小时的生产效率，需要重新校准参数",
      approvalStatus: { label: "已批准", value: "approved" },
      approver: "钱七",
      implementationDate: "2025-09-26",
      effectiveness: { label: "良好", value: "good" }
    },
    {
      changeId: "4M1E-20250927-002",
      changeType: { label: "方法变动(Method)", value: "method" },
      changeDate: "2025-09-26",
      applicant: "孙八",
      department: { label: "生产部", value: "production" },
      changeDescription: "优化风扇叶片装配工序",
      reason: "减少装配时间，提高生产效率",
      impactAnalysis: "需对相关员工进行培训，预计1周内达到预期效率",
      approvalStatus: { label: "待审批", value: "pending" },
      approver: "",
      implementationDate: "",
      effectiveness: null
    },
    {
      changeId: "4M1E-20250927-003",
      changeType: { label: "材料变动(Material)", value: "material" },
      changeDate: "2025-09-24",
      applicant: "周九",
      department: { label: "研发部", value: "rd" },
      changeDescription: "更换风扇轴承供应商",
      reason: "提高产品使用寿命和降低噪音",
      impactAnalysis: "需重新验证产品性能，可能影响首批产品的交付时间",
      approvalStatus: { label: "已批准", value: "approved" },
      approver: "吴十",
      implementationDate: "2025-09-28",
      effectiveness: null
    }
  ];

  // 状态管理
  const [tableData, setTableData] = useState<FourM1EData[]>(initialData);

  // 处理数据保存
  const handleSave = (data: FourM1EData[]) => {
    setTableData(data);
  };

  // 准备图表数据
  const prepareChartData = () => {
    // 按变动类型统计
    const typeCount: { [key: string]: number } = {};
    // 按审批状态统计
    const statusCount: { [key: string]: number } = {};
    
    tableData.forEach(row => {
      // 变动类型统计
      const typeLabel = row.changeType?.label || "未知类型";
      typeCount[typeLabel] = (typeCount[typeLabel] || 0) + 1;
      
      // 审批状态统计
      const statusLabel = row.approvalStatus?.label || "未知状态";
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
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">4M1E变动管理</h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理人(Man)、机(Machine)、料(Material)、法(Method)、环(Environment)的变动
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">总变动数</h3>
          <p className="text-4xl font-bold text-blue-500">{tableData.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">待审批</h3>
          <p className="text-4xl font-bold text-amber-500">
            {tableData.filter(row => row.approvalStatus?.label === "待审批").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">已批准</h3>
          <p className="text-4xl font-bold text-green-500">
            {tableData.filter(row => row.approvalStatus?.label === "已批准").length}
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">4M1E变动类型分布</h3>
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">审批状态分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="变动数量" />
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
          moduleName="4M1E变动管理"
        />
      </motion.div>
    </div>
  );
};

export default FourM1EChangeManagement;