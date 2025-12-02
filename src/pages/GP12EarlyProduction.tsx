import React, { useState } from "react";
import EditableTable from "@/components/EditableTable";
import { motion } from "framer-motion";
import { GP12Data, TableColumn } from "@/types/index";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

// GP12早期生产遏制页面组件
const GP12EarlyProduction: React.FC = () => {
  // 定义表格列配置
  const columns: TableColumn[] = [
    {
      key: "partNumber",
      title: "零件编号",
      type: "text",
      required: true
    },
    {
      key: "partName",
      title: "零件名称",
      type: "text",
      required: true
    },
    {
      key: "productionDate",
      title: "生产日期",
      type: "date",
      required: true
    },
    {
      key: "batchNumber",
      title: "批次号",
      type: "text",
      required: true
    },
    {
      key: "quantity",
      title: "生产数量",
      type: "text",
      required: true
    },
    {
      key: "samplingSize",
      title: "抽样数量",
      type: "text",
      required: true
    },
    {
      key: "inspector",
      title: "检验员",
      type: "text",
      required: true
    },
    {
      key: "inspectionItems",
      title: "检验项目",
      type: "text",
      required: true
    },
    {
      key: "defectDescription",
      title: "缺陷描述",
      type: "text"
    },
    {
      key: "defectQuantity",
      title: "缺陷数量",
      type: "text"
    },
    {
      key: "disposition",
      title: "处理方式",
      type: "select",
      options: [
        { label: "合格放行", value: "pass" },
        { label: "返工", value: "rework" },
        { label: "报废", value: "scrap" },
        { label: "隔离", value: "quarantine" }
      ],
      required: true
    },
    {
      key: "comments",
      title: "备注",
      type: "text"
    }
  ];

  // 初始数据
  const initialData: GP12Data[] = [
    {
      partNumber: "FAN-001",
      partName: "散热风扇总成",
      productionDate: "2025-09-26",
      batchNumber: "B20250926001",
      quantity: "1000",
      samplingSize: "50",
      inspector: "张三",
      inspectionItems: "外观、尺寸、性能测试、噪音测试",
      defectDescription: "2台噪音超标",
      defectQuantity: "2",
      disposition: { label: "返工", value: "rework" },
      comments: "需重新调整风扇平衡"
    },
    {
      partNumber: "FAN-002",
      partName: "风扇叶片",
      productionDate: "2025-09-25",
      batchNumber: "B20250925002",
      quantity: "2000",
      samplingSize: "40",
      inspector: "李四",
      inspectionItems: "外观、尺寸、材质硬度",
      defectDescription: "无缺陷",
      defectQuantity: "0",
      disposition: { label: "合格放行", value: "pass" },
      comments: "质量稳定"
    },
    {
      partNumber: "FAN-003",
      partName: "风扇电机",
      productionDate: "2025-09-24",
      batchNumber: "B20250924003",
      quantity: "1500",
      samplingSize: "30",
      inspector: "王五",
      inspectionItems: "电气性能、绝缘测试、寿命测试",
      defectDescription: "1台绝缘测试不通过",
      defectQuantity: "1",
      disposition: { label: "报废", value: "scrap" },
      comments: "需检查原材料质量"
    }
  ];

  // 状态管理
  const [tableData, setTableData] = useState<GP12Data[]>(initialData);

  // 处理数据保存
  const handleSave = (data: GP12Data[]) => {
    setTableData(data);
  };

  // 准备图表数据
  const prepareChartData = () => {
    // 按日期统计生产和缺陷数量
    const dailyStats: { [key: string]: { production: number; defects: number } } = {};
    // 按处理方式统计
    const dispositionCount: { [key: string]: number } = {};
    
    tableData.forEach(row => {
      const date = row.productionDate || "未知日期";
      
      // 初始化日期数据
      if (!dailyStats[date]) {
        dailyStats[date] = { production: 0, defects: 0 };
      }
      
      // 累加生产数量和缺陷数量
      dailyStats[date].production += parseInt(row.quantity || "0");
      dailyStats[date].defects += parseInt(row.defectQuantity || "0");
      
      // 处理方式统计
      const dispositionLabel = row.disposition?.label || "未知处理";
      dispositionCount[dispositionLabel] = (dispositionCount[dispositionLabel] || 0) + 1;
    });
    
    // 转换为图表数据格式并按日期排序
    const lineChartData = Object.entries(dailyStats)
      .map(([date, stats]) => ({
        date,
        production: stats.production,
        defects: stats.defects,
        defectRate: stats.production > 0 ? (stats.defects / stats.production) * 100 : 0
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const barChartData = Object.entries(dispositionCount).map(([name, value]) => ({
      name,
      value
    }));
    
    return { lineChartData, barChartData };
  };
  
  const { lineChartData, barChartData } = prepareChartData();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">GP12早期生产遏制</h1>
        <p className="text-gray-600 dark:text-gray-400">
          监控新产品导入早期的质量问题，确保产品符合要求
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">总批次</h3>
          <p className="text-4xl font-bold text-blue-500">{tableData.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">生产总量</h3>
          <p className="text-4xl font-bold text-green-500">
            {tableData.reduce((sum, row) => sum + parseInt(row.quantity || "0"), 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">缺陷总数</h3>
          <p className="text-4xl font-bold text-red-500">
            {tableData.reduce((sum, row) => sum + parseInt(row.defectQuantity || "0"), 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">平均缺陷率(%)</h3>
          <p className="text-4xl font-bold text-amber-500">
            {tableData.length > 0 
              ? (tableData.reduce((sum, row) => sum + (parseInt(row.defectQuantity || "0") / parseInt(row.quantity || "1") * 100), 0) / tableData.length).toFixed(2)
              : "0.00"
            }
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">日产量与缺陷趋势</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="production" stroke="#8884d8" name="产量" />
                <Line yAxisId="left" type="monotone" dataKey="defects" stroke="#82ca9d" name="缺陷数" />
                <Line yAxisId="right" type="monotone" dataKey="defectRate" stroke="#ff7300" name="缺陷率(%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">批次处理方式分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="批次数量" />
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
          moduleName="GP12早期生产遏制"
        />
      </motion.div>
    </div>
  );
};

export default GP12EarlyProduction;