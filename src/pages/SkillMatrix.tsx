import React, { useState } from "react";
import EditableTable from "@/components/EditableTable";
import { motion } from "framer-motion";
import { SkillMatrixData, TableColumn } from "@/types/index";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

// 人员技能矩阵页面组件
const SkillMatrix: React.FC = () => {
  // 定义表格列配置
  const columns: TableColumn[] = [
    {
      key: "employeeId",
      title: "员工编号",
      type: "text",
      required: true
    },
    {
      key: "employeeName",
      title: "员工姓名",
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
      key: "position",
      title: "职位",
      type: "text",
      required: true
    },
    {
      key: "fanAssemblySkill",
      title: "风扇组装技能",
      type: "select",
      options: [
        { label: "精通(5分)", value: "5" },
        { label: "熟练(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "基础(2分)", value: "2" },
        { label: "无(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "qualityInspectionSkill",
      title: "质量检测技能",
      type: "select",
      options: [
        { label: "精通(5分)", value: "5" },
        { label: "熟练(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "基础(2分)", value: "2" },
        { label: "无(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "equipmentMaintenanceSkill",
      title: "设备维护技能",
      type: "select",
      options: [
        { label: "精通(5分)", value: "5" },
        { label: "熟练(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "基础(2分)", value: "2" },
        { label: "无(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "problemSolvingSkill",
      title: "问题解决技能",
      type: "select",
      options: [
        { label: "精通(5分)", value: "5" },
        { label: "熟练(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "基础(2分)", value: "2" },
        { label: "无(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "teamworkSkill",
      title: "团队合作技能",
      type: "select",
      options: [
        { label: "精通(5分)", value: "5" },
        { label: "熟练(4分)", value: "4" },
        { label: "一般(3分)", value: "3" },
        { label: "基础(2分)", value: "2" },
        { label: "无(1分)", value: "1" }
      ],
      required: true
    },
    {
      key: "trainingNeeds",
      title: "培训需求",
      type: "text"
    },
    {
      key: "lastEvaluationDate",
      title: "上次评估日期",
      type: "date"
    }
  ];

  // 初始数据
  const initialData: SkillMatrixData[] = [
    {
      employeeId: "EMP-001",
      employeeName: "张三",
      department: { label: "生产部", value: "production" },
      position: "生产线组长",
      yearsOfService: "5年",
      processSkill: { label: "精通(5分)", value: "5" },
      qualitySkill: { label: "熟练(4分)", value: "4" },
      equipmentMaintenanceSkill: { label: "一般(3分)", value: "3" },
      problemSolvingSkill: { label: "熟练(4分)", value: "4" },
      teamworkSkill: { label: "精通(5分)", value: "5" },
      qualityInspectionSkill: { label: "熟练(4分)", value: "4" },
      fanAssemblySkill: { label: "精通(5分)", value: "5" },
      trainingNeeds: "管理技能提升",
      lastEvaluationDate: "2025-09-10"
    },
    {
      employeeId: "EMP-002",
      employeeName: "李四",
      department: { label: "品保部", value: "quality" },
      position: "质检员",
      yearsOfService: "3年",
      processSkill: { label: "熟练(4分)", value: "4" },
      qualitySkill: { label: "精通(5分)", value: "5" },
      equipmentMaintenanceSkill: { label: "基础(2分)", value: "2" },
      problemSolvingSkill: { label: "一般(3分)", value: "3" },
      teamworkSkill: { label: "熟练(4分)", value: "4" },
      qualityInspectionSkill: { label: "精通(5分)", value: "5" },
      fanAssemblySkill: { label: "一般(3分)", value: "3" },
      trainingNeeds: "设备知识学习",
      lastEvaluationDate: "2025-09-15"
    },
    {
      employeeId: "EMP-003",
      employeeName: "王五",
      department: { label: "生技部", value: "equipment" },
      position: "技术员",
      yearsOfService: "2年",
      processSkill: { label: "一般(3分)", value: "3" },
      qualitySkill: { label: "熟练(4分)", value: "4" },
      equipmentMaintenanceSkill: { label: "精通(5分)", value: "5" },
      problemSolvingSkill: { label: "熟练(4分)", value: "4" },
      teamworkSkill: { label: "一般(3分)", value: "3" },
      qualityInspectionSkill: { label: "熟练(4分)", value: "4" },
      fanAssemblySkill: { label: "熟练(4分)", value: "4" },
      trainingNeeds: "团队协作训练",
      lastEvaluationDate: "2025-09-05"
    }
  ];

  // 状态管理
  const [tableData, setTableData] = useState<SkillMatrixData[]>(initialData);

  // 处理数据保存
  const handleSave = (data: SkillMatrixData[]) => {
    setTableData(data);
  };

  // 准备图表数据
  const prepareChartData = () => {
    // 计算各部门的平均技能得分
    const departmentScores: { [key: string]: { total: number; count: number } } = {};
    // 计算各技能维度的平均得分
    const skillDimensions = {
      "风扇组装技能": 0,
      "质量检测技能": 0,
      "设备维护技能": 0,
      "问题解决技能": 0,
      "团队合作技能": 0
    };
    
    tableData.forEach(row => {
      // 部门得分统计
      const departmentLabel = row.department?.label || "未知部门";
      if (!departmentScores[departmentLabel]) {
        departmentScores[departmentLabel] = { total: 0, count: 0 };
      }
      
      // 计算总分
      const totalScore = 
        parseInt(row.fanAssemblySkill?.value || "0") +
        parseInt(row.qualityInspectionSkill?.value || "0") +
        parseInt(row.equipmentMaintenanceSkill?.value || "0") +
        parseInt(row.problemSolvingSkill?.value || "0") +
        parseInt(row.teamworkSkill?.value || "0");
      
      departmentScores[departmentLabel].total += totalScore;
      departmentScores[departmentLabel].count += 1;
      
      // 技能维度得分统计
      skillDimensions["风扇组装技能"] += parseInt(row.fanAssemblySkill?.value || "0");
      skillDimensions["质量检测技能"] += parseInt(row.qualityInspectionSkill?.value || "0");
      skillDimensions["设备维护技能"] += parseInt(row.equipmentMaintenanceSkill?.value || "0");
      skillDimensions["问题解决技能"] += parseInt(row.problemSolvingSkill?.value || "0");
      skillDimensions["团队合作技能"] += parseInt(row.teamworkSkill?.value || "0");
    });
    
    // 计算各部门平均得分
    const barChartData = Object.entries(departmentScores).map(([department, scoreData]) => ({
      department,
      score: scoreData.count > 0 ? Math.round(scoreData.total / scoreData.count / 5) : 0
    }));
    
    // 计算各技能维度平均得分
    const totalEmployees = tableData.length || 1;
    const radarChartData = Object.entries(skillDimensions).map(([skill, score]) => ({
      skill,
      score: Math.round(score / totalEmployees)
    }));
    
    return { barChartData, radarChartData };
  };
  
  const { barChartData, radarChartData } = prepareChartData();


  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">人员技能矩阵</h1>
        <p className="text-gray-600 dark:text-gray-400">
          管理员工的技能水平、培训需求和职业发展
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">员工总数</h3>
          <p className="text-4xl font-bold text-blue-500">{tableData.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">部门数量</h3>
          <p className="text-4xl font-bold text-green-500">{new Set(tableData.map(row => row.department?.label)).size}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">培训需求数</h3>
          <p className="text-4xl font-bold text-amber-500">{tableData.filter(row => row.trainingNeeds).length}</p>
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">部门平均技能得分</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" name="平均得分" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">技能维度雷达图</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={radarChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar
                  name="平均技能得分"
                  dataKey="score"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip />
                <Legend />
              </RadarChart>
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
          moduleName="人员技能矩阵"
        />
      </motion.div>
    </div>
  );
};

export default SkillMatrix;